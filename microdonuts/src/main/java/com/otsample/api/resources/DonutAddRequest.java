package com.otsample.api.resources;

import com.google.gson.annotations.SerializedName;

public class DonutAddRequest
{
    @SerializedName("order_id")
    String orderId;

    public DonutAddRequest(String orderId)
    {
        this.orderId = orderId;
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String value) { orderId = value; }
}

