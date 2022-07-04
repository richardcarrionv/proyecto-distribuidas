package com.sauriosoft.server.models.exceptions;

import java.text.MessageFormat;

public class UserException extends RuntimeException {

    public UserException(String message) {
        super(MessageFormat.format("Error: {0}", message));
    }
}
