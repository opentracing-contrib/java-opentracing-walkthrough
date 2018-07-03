package com.otsample.api;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Properties;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.otsample.api.KitchenConsumer;
import com.otsample.api.Utils;
import com.otsample.api.resources.DonutRequest;
import com.otsample.api.resources.StatusReq;
import com.otsample.api.resources.StatusRes;

import io.opentracing.Scope;
import io.opentracing.util.GlobalTracer;

public class ApiContextHandler extends ServletContextHandler
{
    Properties config;
    KitchenConsumer kitchenConsumer;

    public ApiContextHandler(Properties config)
    {
        this.config = config;
        registerServlets();
    }

    void registerServlets()
    {
        kitchenConsumer = new KitchenConsumer();
        addServlet(new ServletHolder(new OrderServlet(kitchenConsumer)), "/order");
        addServlet(new ServletHolder(new StatusServlet(kitchenConsumer)), "/status");
        addServlet(new ServletHolder(new ConfigServlet(config)), "/config.js");
    }

    static final class OrderServlet extends HttpServlet
    {
        KitchenConsumer kitchenConsumer;

        public OrderServlet(KitchenConsumer kitchenConsumer)
        {
            this.kitchenConsumer = kitchenConsumer;
        }

        @Override
        public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
        {
            try (Scope orderSpanScope = GlobalTracer.get().buildSpan("order_span").startActive(true)) {
                request.setAttribute("span", orderSpanScope.span());

                DonutRequest[] donutsInfo = parseDonutsInfo(request);
                if (donutsInfo == null) {
                    Utils.writeErrorResponse(response);
                    return;
                }

                String orderId = UUID.randomUUID().toString();

                for (DonutRequest donutReq : donutsInfo)
                    for (int i = 0; i < donutReq.getQuantity(); i++)
                        if (!kitchenConsumer.addDonut(request, orderId)) {
                            Utils.writeErrorResponse(response);
                            return;
                        }

                StatusRes statusRes = kitchenConsumer.checkStatus(request, orderId);
                if (statusRes == null) {
                    Utils.writeErrorResponse(response);
                    return;
                }

                Utils.writeJSON(response, statusRes);
            } catch (Throwable t) {
                t.printStackTrace();
            }
        }

        static DonutRequest[] parseDonutsInfo(HttpServletRequest request)
            throws IOException
        {
            JsonObject jsonObj = Utils.readJSONObject(request);
            JsonArray donuts = jsonObj.getAsJsonArray("donuts");
            if (donuts == null || donuts.size() == 0)
                return null;

            Gson gson = new Gson();
            DonutRequest[] donutsInfo = new DonutRequest[donuts.size()];

            for (int i = 0; i < donuts.size(); i++) {
                JsonObject donut = (JsonObject) donuts.get(i);
                String flavor = gson.fromJson(donut.get("flavor"), String.class);
                int quantity = gson.fromJson(donut.get("quantity"), int.class);

                donutsInfo[i] = new DonutRequest(flavor, quantity);
            }

            return donutsInfo;
        }
    }

    static final class StatusServlet extends HttpServlet
    {
        KitchenConsumer kitchenConsumer;

        public StatusServlet(KitchenConsumer kitchenConsumer)
        {
            this.kitchenConsumer = kitchenConsumer;
        }

        @Override
        public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
        {
            StatusReq statusReq = (StatusReq) Utils.readJSON(request, StatusReq.class);
            if (statusReq == null) {
                Utils.writeErrorResponse(response);
                return;
            }

            StatusRes statusRes = kitchenConsumer.checkStatus(request, statusReq.getOrderId());
            Utils.writeJSON(response, statusRes);
        }
    }

    static final class ConfigServlet extends HttpServlet
    {
        Properties config;

        public ConfigServlet(Properties config)
        {
            this.config = config;
        }

        @Override
        public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
        {
            PrintWriter writer = response.getWriter();
            writer.println(createConfigBody());
            writer.close();
        }

        String createConfigBody ()
        {
            String body = ""
                + "var Config = {"
                + "    tracer: \"%s\","
                + "    tracer_host: \"%s\","
                + "    tracer_port: %s,"
                + "    tracer_access_token: \"%s\","
                + "}";

            return String.format(body,
                    config.getProperty("tracer"),
                    config.getProperty("tracer_host"),
                    config.getProperty("tracer_port"),
                    config.getProperty("tracer_access_token"));
        }
    }
}
