package com.sauriosoft.server.models.exceptions;

import java.text.MessageFormat;

public class BranchException extends RuntimeException {

    public BranchException(String message) {
        super(MessageFormat.format("Error: {0}", message));
    }
}
