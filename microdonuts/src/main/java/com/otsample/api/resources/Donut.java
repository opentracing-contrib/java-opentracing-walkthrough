package com.otsample.api.resources;

import com.google.gson.annotations.SerializedName;

public final class Donut
{
    @SerializedName("order_id")
    String orderId;
    Status status;

    public Donut()
    {
    }

    public Donut(String orderId)
    {
        this.orderId = orderId;
        status = Status.NEW_ORDER;
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

