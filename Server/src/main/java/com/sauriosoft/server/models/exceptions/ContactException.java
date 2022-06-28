package com.sauriosoft.server.models.exceptions;

import java.text.MessageFormat;

public class ContactException extends RuntimeException {
    public ContactException(String message) {
        super(MessageFormat.format("Error: {o}", message));
    }
}
