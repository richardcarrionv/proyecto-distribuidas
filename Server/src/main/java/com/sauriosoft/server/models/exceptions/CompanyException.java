package com.sauriosoft.server.models.exceptions;

import java.text.MessageFormat;

public class CompanyException extends RuntimeException{
    public CompanyException(String message) {
        super(MessageFormat.format("Error: ", message));
    }
}
