package com.otsample.api.resources;

import com.google.gson.annotations.SerializedName;

public final class StatusReq
{
    @SerializedName("order_id")
    String orderId;

    public String getOrderId() { return orderId; }
    public void setOrderId(String value) { orderId = value; }
}

