package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.ContactEntity;
import com.sauriosoft.server.models.exceptions.ContactException;
import com.sauriosoft.server.models.repositories.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactServiceImpl implements IContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public List<ContactEntity> getAll() {
        return contactRepository.findAll();
    }

    @Override
    public ContactEntity getById(Long contactId) {
        return contactRepository.findById(contactId).orElseThrow(() ->
                new ContactException("No existe el contacto con el id: ".concat(contactId.toString()))
        );
    }

    @Override
    public ContactEntity addContact(ContactEntity contact) {
        return contactRepository.saveAndFlush(contact);
    }

    @Override
    public ContactEntity updateContact(Long contactId, ContactEntity contact) {
        ContactEntity contactToUpdate = getById(contactId);
        contactToUpdate.setName(contact.getName());
        contactToUpdate.setSurname(contact.getSurname());
        contactToUpdate.setCi(contact.getCi());
        contactToUpdate.setPhone(contact.getPhone());
        return contactRepository.save(contactToUpdate);
    }

    @Override
    public void deleteContact(Long contactID) {
        ContactEntity contactToDelete = getById(contactID);
        contactRepository.delete(contactToDelete);
    }
}
