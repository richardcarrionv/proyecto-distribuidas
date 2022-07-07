package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.Igniter;

import java.util.List;


public interface IgniterService {

    List<Igniter> getAll();

    Igniter getById(Long contactId);

    Igniter create(Igniter contact);

    Igniter update(Long contactId, Igniter contact);

    void delete(Long contactID);

}
