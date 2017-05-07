package com.otsample.api.resources;

import com.google.gson.annotations.SerializedName;

public enum Status
{
    @SerializedName("order")
    NEW_ORDER,
    @SerializedName("received")
    RECEIVED,
    @SerializedName("cooking")
    COOKING,
    @SerializedName("ready")
    READY
}

