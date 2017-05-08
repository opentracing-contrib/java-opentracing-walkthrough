package com.otsample.api;

import io.opentracing.Span;
import io.opentracing.contrib.web.servlet.filter.ServletFilterSpanDecorator;
import java.io.IOException;
import java.util.*;

import javax.servlet.DispatcherType;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

import io.opentracing.util.GlobalTracer;
import io.opentracing.contrib.web.servlet.filter.TracingFilter;

import com.otsample.api.resources.*;

public class KitchenContextHandler extends ServletContextHandler
{
    KitchenService service;

    public KitchenContextHandler(Properties config)
    {
        // The decorator here is boilerplate aside from the setOperationName() call.
        ServletFilterSpanDecorator renameSpanDecorator =
            new ServletFilterSpanDecorator() {
                @Override
                public void onRequest(HttpServletRequest httpServletRequest, Span span) {
                    // The important part:
                    span.setOperationName(httpServletRequest.getRequestURI());
                }

                @Override
                public void onResponse(HttpServletRequest httpServletRequest,
                    HttpServletResponse httpServletResponse, Span span) { }

                @Override
                public void onError(HttpServletRequest httpServletRequest,
                    HttpServletResponse httpServletResponse, Throwable throwable, Span span) { }

                @Override
                public void onTimeout(HttpServletRequest httpServletRequest,
                    HttpServletResponse httpServletResponse, long l, Span span) { }
            };
        TracingFilter tracingFilter = new TracingFilter(
            GlobalTracer.get(), Arrays.asList(renameSpanDecorator), null);
        addFilter(new FilterHolder(tracingFilter), "/*", EnumSet.allOf(DispatcherType.class));
        setContextPath("/kitchen");
        registerServlets();
    }

    void registerServlets()
    {
        service = new KitchenService();
        service.start();
        addServlet(new ServletHolder(new AddDonutServlet(service)), "/add_donut");
        addServlet(new ServletHolder(new CheckDonutsServlet(service)), "/check_donuts");
    }

    static final class AddDonutServlet extends HttpServlet
    {
        KitchenService kitchenService;

        public AddDonutServlet(KitchenService kitchenService)
        {
            this.kitchenService = kitchenService;
        }

        @Override
        public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
        {
            DonutAddRequest addDonut = (DonutAddRequest) Utils.readJSON(request, DonutAddRequest.class);
            if (addDonut == null || addDonut.getOrderId() == null) {
                Utils.writeErrorResponse(response);
                return;
            }

            kitchenService.addDonutAddRequest(addDonut);

            response.setStatus(200);
        }
    }

    static final class CheckDonutsServlet extends HttpServlet
    {
        KitchenService kitchenService;

        public CheckDonutsServlet(KitchenService kitchenService)
        {
            this.kitchenService = kitchenService;
        }

        @Override
        public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
        {
            try {
                Utils.writeJSON(response, kitchenService.getDonuts());
            } catch (InterruptedException exc) {
            }
        }

    }
}

