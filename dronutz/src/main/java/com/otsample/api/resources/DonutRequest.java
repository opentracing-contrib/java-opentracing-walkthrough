package com.otsample.api.resources;

public final class DonutRequest
{
    String flavor;
    int quantity;

    public DonutRequest()
    {
    }

    public DonutRequest(String flavor, int quantity)
    {
        this.flavor = flavor;
        this.quantity = quantity;
    }

    public String getFlavor() { return flavor; }
    public void setFlavor(String value) { flavor = value; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int value) { quantity = value; }
}

