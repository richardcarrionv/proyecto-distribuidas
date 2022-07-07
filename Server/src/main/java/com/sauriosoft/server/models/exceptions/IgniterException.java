package com.sauriosoft.server.models.exceptions;

import java.text.MessageFormat;

public class IgniterException extends RuntimeException {
    public IgniterException(String message) {
        super(MessageFormat.format("Error: {o}", message));
    }
}
