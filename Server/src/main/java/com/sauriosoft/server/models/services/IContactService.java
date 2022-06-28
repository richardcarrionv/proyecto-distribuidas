package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.ContactEntity;
import org.springframework.stereotype.Service;

import java.util.List;


public interface IContactService {

    List<ContactEntity> getAll();

    ContactEntity getById(Long contactId);

    ContactEntity addContact(ContactEntity contact);

    ContactEntity updateContact(Long contactId, ContactEntity contact);

    void deleteContact(Long contactID);

}
