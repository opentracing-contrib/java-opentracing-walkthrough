package com.otsample.api.resources;

public final class StatusRes
{
    String order_id;
    int estimated_delivery_time;
    Status state;

    public StatusRes()
    {
    }

    public StatusRes(String order_id, int estimated_delivery_time, Status state)
    {
        this.order_id = order_id;
        this.estimated_delivery_time = estimated_delivery_time;
        this.state = state;
    }

    public String getOrderId() { return order_id; }
    public void setOrderId(String value) { order_id = value; }

    public int getEstimatedDeliveryTime() { return estimated_delivery_time; }
    public void setEstimatedDeliveryTime(int value) { estimated_delivery_time = value; }

    public Status getStatus() { return state; }
    public void setStatus(Status value) { state = value; }
}

