package com.otsample.api;

import java.util.ArrayList;
import java.util.Collection;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.otsample.api.resources.*;

public class KitchenService
{
    ConcurrentLinkedQueue<Donut> allDonuts;
    ConcurrentLinkedQueue<Donut> fryer;
    Thread fryerThread;

    public void start()
    {
        if (allDonuts != null)
            return;

        allDonuts = new ConcurrentLinkedQueue<Donut>();
        fryer = new ConcurrentLinkedQueue<Donut>();

        fryerThread = new Thread(new FryerRunnable(allDonuts, fryer));
        fryerThread.setDaemon(true);
        fryerThread.start();
    }

    public void addDonutAddRequest(DonutAddRequest req)
    {
        fryer.add(new Donut(req.getOrderId()));
    }

    public Collection<Donut> getDonuts()
        throws InterruptedException
    {
        ArrayList<Donut> donuts = new ArrayList<Donut>();
        for (Donut donut: allDonuts)
            donuts.add(donut.clone()); // Get a snapshot

        return donuts;
    }

    static final class FryerRunnable implements Runnable
    {
        ConcurrentLinkedQueue<Donut> allDonuts;
        ConcurrentLinkedQueue<Donut> fryer;

        public FryerRunnable(ConcurrentLinkedQueue<Donut> allDonuts, ConcurrentLinkedQueue<Donut> fryer)
        {
            this.allDonuts = allDonuts;
            this.fryer = fryer;
        }

        public void run()
        {
            try {
                runImpl();
            } catch (InterruptedException exc) {
            }
        }

        void runImpl() throws InterruptedException
        {
            while (true) {
                Object donut = fryer.poll();
                if (donut == null) {
                    Thread.sleep(10);
                    continue;
                }

                Donut donutReq = (Donut) donut;
                switch (donutReq.getStatus()) {
                    case NEW_ORDER:
                        donutReq.setStatus(Status.RECEIVED);
                        allDonuts.add(donutReq);
                        fryer.add(donutReq);
                        break;
                    case RECEIVED:
                        Thread.sleep(400);
                        donutReq.setStatus(Status.COOKING);
                        fryer.add(donutReq);
                        break;
                    case COOKING:
                        Thread.sleep(1000);
                        donutReq.setStatus(Status.READY);
                        break;
                }
            }
        }
    }
}

