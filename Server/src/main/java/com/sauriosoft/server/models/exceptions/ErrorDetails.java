package com.sauriosoft.server.models.exceptions;

import java.util.Date;

public class ErrorDetails {
    private Date timestamp;
    private String error_message;
    private String details;

    public ErrorDetails(Date timestamp, String error_message, String details) {
        super();
        this.timestamp = timestamp;
        this.error_message = error_message;
        this.details = details;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getError_message() {
        return error_message;
    }

    public void setError_message(String error_message) {
        this.error_message = error_message;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}