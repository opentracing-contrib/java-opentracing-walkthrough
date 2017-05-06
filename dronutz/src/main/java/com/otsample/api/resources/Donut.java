package com.otsample.api.resources;

public final class Donut
{
    String orderId;
    Status status;

    public Donut()
    {
    }

    public Donut(String orderId)
    {
        this.orderId = orderId;
        status = Status.new_order;
    }

    public Donut clone()
    {
        Donut copy = new Donut();
        copy.orderId = orderId;
        copy.status = status;

        return copy;
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String value) { orderId = value; }

    public Status getStatus() { return status; }
    public void setStatus(Status value) { status = value; }

}

