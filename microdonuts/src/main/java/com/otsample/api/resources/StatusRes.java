package com.otsample.api.resources;

import com.google.gson.annotations.SerializedName;

public final class StatusRes
{
    @SerializedName("order_id")
    String orderId;
    @SerializedName("estimated_delivery_time")
    int estimatedDeliveryTime;
    @SerializedName("state")
    Status state;

    public StatusRes()
    {
    }

    public StatusRes(String orderId, int estimatedDeliveryTime, Status state)
    {
        this.orderId = orderId;
        this.estimatedDeliveryTime = estimatedDeliveryTime;
        this.state = state;
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String value) { orderId = value; }

    public int getEstimatedDeliveryTime() { return estimatedDeliveryTime; }
    public void setEstimatedDeliveryTime(int value) { estimatedDeliveryTime = value; }

    public Status getStatus() { return state; }
    public void setStatus(Status value) { state = value; }
}

