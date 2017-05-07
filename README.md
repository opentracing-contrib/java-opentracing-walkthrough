# MicroDonuts: An OpenTracing Walkthrough

Welcome to MicroDonuts! This is a sample application and OpenTracing
walkthrough, written in Java.

OpenTracing is a vendor-neutral, open standard for distributed tracing. To
learn more, check out [opentracing.io](http://opentracing.io), and try the
walkthrough below!

In addition to doing the walkthrough yourself, the results of each step are
saved in their own git branch.
- `git checkout step-1` to see MicroDonuts with turnkey/network tracing.
- `git checkout step-2` to see an example of application-level client tracing.

## Step 0: Setup MicroDonuts
### Getting it
Clone this repository and build the jar file (for this, Maven must be
installed):

```
git clone git@github.com:opentracing-contrib/java-opentracing-walkthrough.git
cd java-opentracing-walkthrough/microdonuts
mvn package
```

### Running
MicroDonuts has two server components, `API` and `Kitchen`, which
communicate each other over HTTP - they are, however, part of
the same process:

```
./scripts/run_kitchen.sh config_example.properties
```

In your web broswer, navigate to http://127.0.0.1:10001 and get yourself
some donuts.

### Pick a Tracer

Several OpenTracing-compatible Tracer implementations are supported
out-of-the-box for convenience. Others can be added easily with a local change
to `App.java`.

#### LightStep
If you're using LightStep, you will need your access token.

```properties
tracer=lightstep
lightstep.collector_host=collector.lightstep.com
lightstep.collector_port=443
lightstep.access_token=1234567890abcdef  // TODO: replace with your token
```

## Step 1: TurnKey Tracing
When you go to add tracing to a system, the best place to start is installing
OpenTracing plugins for the OSS components you are using. Instrumenting your
networking libraries, web frameworks, and service clients quickly gives you a
lot of information about your distributed system, without requiring you to
change a lot of code.

To do this, let's change the startup of the application to include tracing.

### Start the GlobalTracer
In OpenTracing, there is a concept of a global tracer for everyone to access,
As a convenience, we already have a function `configureGlobalTracer` that
works with the MicroDonuts configuration file. In the `main` of 
`microdonuts/src/main/java/com/otsample/api/App.java`, right after the configuration
file was loaded, do:

```java
        Properties config = loadConfig(args);
        if (!configureGlobalTracer(config, "MicroDonuts"))
            throw new Exception("Could not configure the global tracer");
```

After this, the tracer will be available globally through
`io.opentracing.GlobalTracer.get()`.

### Instrument the outgoing HTTP requests

Our `api` component communicates with the `kitchen` one over HTTP using
the `OkHttp` library, so we will instrument those requests using a middleware.
In `microdonuts/src/main/java/com/otsample/api/KitchenConsumer.java`, inside the
the `KitchenConsumer` constructor:

```java
    TracingInterceptor tracingInterceptor = new TracingInterceptor(
             GlobalTracer.get(),
             Arrays.asList(SpanDecorator.STANDARD_TAGS));
    client = new OkHttpClient.Builder()
            .addInterceptor(tracingInterceptor)
            .addNetworkInterceptor(tracingInterceptor)
            .build();
```

### Instrument the inbound HTTP kitchen server

Similarly, we will use a middleware to trace the incoming HTTP
requests for the `kitchen` component. In
`microdonuts/src/main/java/com/otsample/api/KitchenContextHandler.java`,
inside the constructor do:

```java
    TracingFilter tracingFilter = new TracingFilter(GlobalTracer.get());
    addFilter(new FilterHolder(tracingFilter), "/*", EnumSet.allOf(DispatcherType.class));
```

After this, the incoming requests to `kitchen` will be traced too.

### Check it out in your Tracer

Now that we're all hooked up, try buying some donuts in the browser. You should
see the traces appear in your tracer.

Search for traces starting belonging to the `MicroDonuts` component to see the
patterns of requests that occur when you click the order button.

## Step 2: Enhance

Now that the components in our system are linked up at the networking level, we
can start adding application level tracing by tying multiple network calls
together into a single trace.

In MicroDonuts, we'd like to know the time and resources involved with buying a
donut, from the moment it is ordered to when it is delivered. Let's add
OpenTracing's context to the requests from the `api` component to the `kitchen`
one. In `microdonuts/src/main/java/com/otsample/api/ApiContextHandler.java` in
`OrderServlet` do:

```java
        @Override
        public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
        {
            Span orderSpan = GlobalTracer.get().buildSpan("order_span").start();
            request.setAttribute("span", orderSpan);
```

And then, at the end of this same method:

```java
            Utils.writeJSON(response, statusRes);
            orderSpan.finish();
        }
```

Here we are creating a top level span that will be the parent of all the traced
operations happening when ordering a set of donuts, and after that we store it
in our `HttpServletRequest` object, so we can retrive this information next. In
`microdonuts/src/main/java/com/otsample/api/KitchenConsumer.java` inside
`addDonut` add a `TagWrapper` instance with the parent span:

```java
    Span parentSpan = (Span) request.getAttribute("span");
    Request req = new Request.Builder()
        .url("http://127.0.0.1:10001/kitchen/add_donut")
        .post(body)
        .tag(new TagWrapper(parentSpan.context())) 
        .build();

```

This way, we are marking these requests as children of our main Span, and they
will appear in the tracer properly organized, as belonging to the same
operation.

And we're done! Buy some donuts, check out the spans under the `MicroDonuts`
component and notice how the order and polling requests are now grouped under a
single span, with timing information for the entire operation.

### Step 3: Have fun

If you still have time, try to trace other things! For example, maybe we would
like to do have a main span when calling the `status` operation (the one
polling the status of the order) at the `StatusServlet` and the
`KitchenConsumer.getDonuts` call, like we did in the previous step with
`OrderServlet` and `KitchenConsumer.addDonut`, respectively.

## Thanks for playing, and welcome to OpenTracing!

Thanks for joining us in this walkthrough! Hope you enjoyed it. If you did, let
us know, and consider spreading the love! 

A great way to get the feel for OpenTracing is to try your hand at
instrumenting the OSS servers, frameworks, and client libraries that we all
share. If you make one, consider adding it to the growing ecosystem at
http://github.com/opentracing-contrib. If you maintain a library yourself,
plase consider adding built-in OT support.

We also need walkthroughs for languages other than Golang. Feel free to reuse
the client, protobufs, and other assets from here if you'd like to make one.

For a more detailed explanation of OSS Instrumentation, check out the TurnKey
Tracing proposal at http://bit.ly/turnkey-tracing.

_Aloha!_
