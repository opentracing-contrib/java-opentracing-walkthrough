package com.otsample.api.resources;

public class DonutAddRequest
{
    String orderId;

    public DonutAddRequest(String orderId)
    {
        this.orderId = orderId;
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String value) { orderId = value; }
}

