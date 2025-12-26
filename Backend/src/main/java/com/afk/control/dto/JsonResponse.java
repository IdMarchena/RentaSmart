package com.afk.control.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class JsonResponse<T> {

    private boolean success;
    private String message;
    private T data;
    private int status;
    private String timestamp;

    public JsonResponse(boolean success, String message, T data, int status) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.status = status;
        this.timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }

    public int getStatus() {
        return status;
    }

    public String getTimestamp() {
        return timestamp;
    }
}
