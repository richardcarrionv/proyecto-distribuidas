package com.sauriosoft.server.controllers;

import com.sauriosoft.server.models.dtos.IgniterDTO;
import com.sauriosoft.server.models.entities.Branch;
import com.sauriosoft.server.models.entities.Igniter;
import com.sauriosoft.server.models.exceptions.IgniterException;
import com.sauriosoft.server.models.services.BranchService;
import com.sauriosoft.server.models.services.IgniterService;
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
@RequestMapping(value = "/igniters/")
public class IgniterController {

    @Autowired
    private IgniterService igniterService;

    @Autowired
    private BranchService branchService;


    @Operation(summary = "Get all Contacts", responses = {
            @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server Error", responseCode = "503"),
            @ApiResponse(description = "Empty", responseCode = "204")
    })
    @GetMapping
    public ResponseEntity<?> getAll() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Igniter> igniters = igniterService.getAll();
            if (igniters.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            List<IgniterDTO> igniterDTOS = igniters.stream()
                    .map(IgniterDTO::from)
                    .collect(Collectors.toList());

            response.put("response", igniterDTOS);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception ex) {
            return serviceUnavailableMessage(response, ex);
        }
    }

    @Operation(summary = "Get one Contact by Id", responses = {
            @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server Error", responseCode = "503"),
            @ApiResponse(description = "Contact not found", responseCode = "500")
    })
    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable(name = "id") final Long igniterId) {
        Map<String, Object> response = new HashMap<>();
        try {
            Igniter igniter = igniterService.getById(igniterId);
            IgniterDTO igniterDTO = IgniterDTO.from(igniter);
            response.put("response", igniterDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IgniterException ex) {
            return internalServerErrorMessage(response, ex.getMessage());
        } catch (Exception ex) {
            return serviceUnavailableMessage(response, ex);
        }
    }


    @Operation(summary = "Save one Contact with Branch Office associated", responses = {
            @ApiResponse(description = "Successfully created", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server error", responseCode = "503"),
            @ApiResponse(description = "Body with Id", responseCode = "500")
    })
    @PostMapping("/{idBranch}")
    public ResponseEntity<?> create(@RequestBody final IgniterDTO igniterDTO, @PathVariable(name = "idBranch") final Long idBranch) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (Objects.isNull(igniterDTO.getId())) {

                Igniter igniter = Igniter.from(igniterDTO);
                Branch branchOffice = branchService.getById(idBranch);

                igniter.setBranch(branchOffice);
                igniter = igniterService.create(igniter);


                IgniterDTO igniterDTOFromSave = IgniterDTO.from(igniter);
                response.put("response", igniterDTOFromSave);
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            }
            return internalServerErrorMessage(response, "Contacto con ID");
        } catch (Exception ex) {
            return serviceUnavailableMessage(response, ex);
        }
    }

    @Operation(summary = "Update one Contact", responses = {
            @ApiResponse(description = "Successfully updated", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server error", responseCode = "503"),
            @ApiResponse(description = "Contact not found", responseCode = "500")
    })
    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") final Long igniterId, @RequestBody final IgniterDTO igniterDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            Igniter igniterToUpdate = Igniter.from(igniterDTO);
            IgniterDTO igniterDTOFromUpdate = IgniterDTO.from(igniterService.update(igniterId, igniterToUpdate));
            response.put("response", igniterDTOFromUpdate);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (IgniterException ex) {
            return internalServerErrorMessage(response, ex.getMessage());
        } catch (Exception ex) {
            return serviceUnavailableMessage(response, ex);
        }
    }

    @Operation(summary = "Delete one Contact", responses = {
            @ApiResponse(description = "Successfully delete", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server error", responseCode = "503"),
            @ApiResponse(description = "Contact not found", responseCode = "500")
    })
    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") final Long igniterId) {
        Map<String, Object> response = new HashMap<>();
        try {
            igniterService.delete(igniterId);
            response.put("response", "Contacto eliminado con exito");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IgniterException ex) {
            return internalServerErrorMessage(response, ex.getMessage());
        } catch (Exception ex) {
            return serviceUnavailableMessage(response, ex);
        }
    }

    private ResponseEntity<?> internalServerErrorMessage(Map<String, Object> response, String message){
        response.put("error", message);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    private ResponseEntity<?> serviceUnavailableMessage(Map<String, Object> response, Exception ex){
        response.put("error", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
    }
}
