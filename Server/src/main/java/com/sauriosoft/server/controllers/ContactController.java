package com.sauriosoft.server.controllers;

import com.sauriosoft.server.models.dtos.ContactDTO;
import com.sauriosoft.server.models.dtos.ContactNoBranchDTO;
import com.sauriosoft.server.models.entities.BranchOfficeEntity;
import com.sauriosoft.server.models.entities.ContactEntity;
import com.sauriosoft.server.models.exceptions.ContactException;
import com.sauriosoft.server.models.services.IBranchOfficeService;
import com.sauriosoft.server.models.services.IContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/contacts/")
public class ContactController {

    @Autowired
    private IContactService contactService;

    @Autowired
    private IBranchOfficeService branchOfficeService;


    @Operation(summary = "Get all Contacts", responses = {
            @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server Error", responseCode = "503"),
            @ApiResponse(description = "Empty", responseCode = "204")
    })
    @GetMapping
    public ResponseEntity<?> getAll() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<ContactEntity> contactList = contactService.getAll();
            if (contactList.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            } else {
                List<ContactDTO> contactDTOList = contactList.stream()
                        .map(ContactDTO::from)
                        .collect(Collectors.toList());
                response.put("response", contactDTOList);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } catch (Exception ex) {
            response.put("error", "Error en el servidor");
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Operation(summary = "Get one Contact by Id", responses = {
            @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server Error", responseCode = "503"),
            @ApiResponse(description = "Contact not found", responseCode = "500")
    })
    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable(name = "id") final Long contactId) {
        Map<String, Object> response = new HashMap<>();
        try {
            ContactEntity contact = contactService.getById(contactId);
            ContactDTO contactDTO = ContactDTO.from(contact);
            response.put("response", contactDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (ContactException ex) {
            response.put("error", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            response.put("error", "Error en el servidor");
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }


    @Operation(summary = "Save one Contact with Branch Office associated", responses = {
            @ApiResponse(description = "Successfully created", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server error", responseCode = "503"),
            @ApiResponse(description = "Body with Id", responseCode = "500")
    })
    @PostMapping("/{idBranch}")
    public ResponseEntity<?> addContact(@RequestBody final ContactNoBranchDTO contactDTO, @PathVariable(name = "idBranch") final Long idBranch) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (Objects.isNull(contactDTO.getId())) {
                ContactEntity contactToSave = ContactEntity.from(contactDTO);
                BranchOfficeEntity branchOffice = branchOfficeService.getById(idBranch);
                contactToSave.setBranchOffice(branchOffice);
                contactToSave = contactService.addContact(contactToSave);
                branchOfficeService.saveContact(branchOffice.getId(), contactToSave);
                ContactNoBranchDTO contactDTOFromSave = ContactNoBranchDTO.from(contactToSave);
                response.put("response", contactDTOFromSave);
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            }
            response.put("error", "Contacto con ID");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            response.put("error", ex.getCause().getMessage());
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Operation(summary = "Update one Contact", responses = {
            @ApiResponse(description = "Successfully updated", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server error", responseCode = "503"),
            @ApiResponse(description = "Contact not found", responseCode = "500")
    })
    @PutMapping("{id}")
    public ResponseEntity<?> updateContact(@PathVariable(name = "id") final Long contactId, @RequestBody final ContactNoBranchDTO contactDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            ContactEntity contactToUpdate = ContactEntity.from(contactDTO);
            ContactNoBranchDTO contactDTOFromUpdate = ContactNoBranchDTO.from(contactService.updateContact(contactId, contactToUpdate));
            response.put("response", contactDTOFromUpdate);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (ContactException ex) {
            response.put("error", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            response.put("error", "Error en el servidor");
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Operation(summary = "Delete one Contact", responses = {
            @ApiResponse(description = "Successfully delete", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server error", responseCode = "503"),
            @ApiResponse(description = "Contact not found", responseCode = "500")
    })
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteContact(@PathVariable(name = "id") final Long contactId) {
        Map<String, Object> response = new HashMap<>();
        try {
            contactService.deleteContact(contactId);
            response.put("response", "Contacto eliminado con exito");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (ContactException ex) {
            response.put("error", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            response.put("error", "Error en el servidor");
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}
