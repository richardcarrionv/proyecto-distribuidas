package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.Igniter;
import com.sauriosoft.server.models.exceptions.IgniterException;
import com.sauriosoft.server.models.repositories.IgniterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IgniterServiceImpl implements IgniterService {

    @Autowired
    private IgniterRepository igniterRepository;

    @Override
    public List<Igniter> getAll() {
        return igniterRepository.findAll();
    }

    @Override
    public Igniter getById(Long contactId) {
        return igniterRepository.findById(contactId).orElseThrow(() ->
                new IgniterException("No existe el contacto con el id: ".concat(contactId.toString()))
        );
    }

    @Override
    public Igniter create(Igniter contact) {
        return igniterRepository.save(contact);
    }

    @Override
    public Igniter update(Long contactId, Igniter contact) {
        Igniter contactToUpdate = getById(contactId);
        contactToUpdate.setName(contact.getName());
        contactToUpdate.setSurname(contact.getSurname());
        contactToUpdate.setCi(contact.getCi());
        contactToUpdate.setPhone(contact.getPhone());
        return igniterRepository.save(contactToUpdate);
    }

    @Override
    public void delete(Long contactID) {
        Igniter contactToDelete = getById(contactID);
        igniterRepository.delete(contactToDelete);
    }
}
