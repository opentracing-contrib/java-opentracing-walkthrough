package com.otsample.api;

import java.io.IOException;
import java.io.FileInputStream;
import java.net.MalformedURLException;
import java.util.*;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.handler.ResourceHandler;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.ContextHandlerCollection;

public class App
{
    public static void main( String[] args )
        throws Exception
    {
        Properties config = loadConfig(args);

        ResourceHandler filesHandler = new ResourceHandler();
        filesHandler.setWelcomeFiles(new String[]{ "./index.html" });
        filesHandler.setResourceBase(config.getProperty("public_directory"));

        ContextHandler fileCtxHandler = new ContextHandler();
        fileCtxHandler.setHandler(filesHandler);

        ContextHandlerCollection handlers = new ContextHandlerCollection();
        handlers.setHandlers(new Handler[] {
            fileCtxHandler,
            new ApiContextHandler(config),
            new KitchenContextHandler(config),
        });
        Server server = new Server(10001);
        server.setHandler(handlers);

        server.start();
        server.dumpStdErr ();
        server.join();
    }

    static Properties loadConfig(String [] args)
        throws IOException
    {
        String file = "tracer_config.properties";
        if (args.length > 0)
            file = args[0];

        FileInputStream fs = new FileInputStream(file);
        Properties config = new Properties();
        config.load(fs);
        return config;
    }
}
