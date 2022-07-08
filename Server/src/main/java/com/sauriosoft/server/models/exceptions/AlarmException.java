package com.sauriosoft.server.models.exceptions;

import java.text.MessageFormat;

public class AlarmException extends RuntimeException {

    public AlarmException(String message) {
        super(MessageFormat.format("Error: {0}", message));
    }
}
