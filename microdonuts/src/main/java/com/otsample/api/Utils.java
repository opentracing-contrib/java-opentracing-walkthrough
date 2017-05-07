package com.otsample.api;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.*;
import org.apache.commons.io.IOUtils;

public final class Utils
{
    public static JsonObject readJSONObject(HttpServletRequest req)
        throws IOException
    {
        String content = IOUtils.toString(req.getReader());
        JsonParser parser = new JsonParser();
        return parser.parse(content).getAsJsonObject();
    }

    public static Object readJSON(HttpServletRequest req, Class klass)
        throws IOException
    {
        String content = IOUtils.toString(req.getReader());
        Gson gson = new Gson();
        return gson.fromJson(content, klass);
    }

    public static void writeJSON(HttpServletResponse res, Object o)
        throws IOException
    {
        Gson gson = new Gson();
        PrintWriter writer = res.getWriter();
        writer.println(gson.toJson(o));
        writer.close();
    }

    public static void writeErrorResponse(HttpServletResponse res)
        throws IOException
    {
        PrintWriter writer = res.getWriter();
        writer.println("Error processing request");
        writer.close();

        res.setStatus(500);
    }

    public static String toJSON(Object o)
    {
        Gson gson = new Gson();
        return gson.toJson(o);
    }
}

