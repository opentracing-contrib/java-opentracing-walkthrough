package com.otsample.api;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.*;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import okhttp3.Connection;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import io.opentracing.Span;
import io.opentracing.contrib.okhttp3.TagWrapper;
import io.opentracing.contrib.okhttp3.TracingInterceptor;
import io.opentracing.contrib.okhttp3.OkHttpClientSpanDecorator;
import io.opentracing.util.GlobalTracer;

import com.otsample.api.resources.*;

public class KitchenConsumer
{
    OkHttpClient client;
    MediaType jsonType;

    public KitchenConsumer()
    {
        // A decorator that overrides the operation name with the URL path
        OkHttpClientSpanDecorator opNameDecorator = new OkHttpClientSpanDecorator() {
                @Override
                public void onRequest(Request request, Span span) {
                    // The important part:
                    span.setOperationName(request.url().encodedPath());
                }
                @Override
                public void onError(Throwable throwable, Span span) {}
                @Override
                public void onResponse(Connection connection, Response response, Span span) {}
            };
        TracingInterceptor tracingInterceptor = new TracingInterceptor(
                GlobalTracer.get(),
                Arrays.asList(OkHttpClientSpanDecorator.STANDARD_TAGS, opNameDecorator));
        client = new OkHttpClient.Builder()
                .addInterceptor(tracingInterceptor)
                .addNetworkInterceptor(tracingInterceptor)
                .build();

        jsonType = MediaType.parse("application/json");
    }

    public boolean addDonut(HttpServletRequest request, String orderId)
    {
        DonutAddRequest donutReq = new DonutAddRequest(orderId);
        RequestBody body = RequestBody.create(jsonType, Utils.toJSON(donutReq));

        Span parentSpan = (Span) request.getAttribute("span");
        Request req = new Request.Builder()
            .url("http://127.0.0.1:10001/kitchen/add_donut")
            .post(body)
            .tag(new TagWrapper(parentSpan.context()))
            .build();


        Response res = null;
        try {
            res = client.newCall(req).execute();
        } catch (IOException exc) {
            return false;
        } finally {
        }

        return res.code() >= 200 && res.code() < 300;
    }

    public Collection<Donut> getDonuts(HttpServletRequest request)
    {
        Request req = new Request.Builder()
            .url("http://127.0.0.1:10001/kitchen/check_donuts")
            .build();

        String body = null;
        try {
            Response res = client.newCall(req).execute();
            if (res.code() < 200 || res.code() >= 300)
                return null;

            body = res.body().string();
        } catch (IOException exc) {
            return null;
        }

        Gson gson = new Gson();
        Type collType = new TypeToken<Collection<Donut>>(){}.getType();
        return gson.fromJson(body, collType);
    }

    public StatusRes checkStatus(HttpServletRequest request, String orderId)
    {
        Collection<Donut> donuts = getDonuts(request);
        if (donuts == null)
            return null;

        ArrayList<Donut> filtered = new ArrayList<Donut>();

        for (Donut donut: donuts)
            if (donut.getOrderId().equals(orderId))
                filtered.add(donut);

        Status status = Status.READY;
        int estimatedTime = 0;

        for (Donut donut: filtered) {
            switch (donut.getStatus()) {
                case NEW_ORDER:
                    estimatedTime += 3;
                    status = Status.NEW_ORDER;
                    break;
                case RECEIVED:
                    estimatedTime += 2;
                    status = Status.RECEIVED;
                    break;
                case COOKING:
                    estimatedTime += 1;
                    status = Status.COOKING;
                    break;
                default:
                    continue;
            }
        }

        return new StatusRes(orderId, estimatedTime, status);
    }
}