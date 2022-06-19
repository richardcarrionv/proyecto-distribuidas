package com.sauriosoft.server.models.exceptions;

import java.text.MessageFormat;

public class BranchOfficeException extends RuntimeException {

    public BranchOfficeException(String message) {
        super(MessageFormat.format("Error: {0}", message));
    }
}
