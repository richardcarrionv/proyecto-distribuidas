package com.sauriosoft.server.controllers;

import com.sauriosoft.server.models.dtos.igniter.IgniterBranchDetailDTO;
import com.sauriosoft.server.models.dtos.igniter.IgniterDTO;
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
        List<Igniter> igniters = igniterService.getAll();
        if (igniters.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
        List<IgniterBranchDetailDTO> igniterDTOS = igniters.stream()
                .map(IgniterBranchDetailDTO::from)
                .collect(Collectors.toList());

        response.put("data", igniterDTOS);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @Operation(summary = "Get one Contact by Id", responses = {
            @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server Error", responseCode = "503"),
            @ApiResponse(description = "Contact not found", responseCode = "500")
    })
    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable(name = "id") final Long igniterId) {
        Map<String, Object> response = new HashMap<>();
        Igniter igniter = igniterService.getById(igniterId);
        IgniterBranchDetailDTO igniterBranchDetailDTO = IgniterBranchDetailDTO.from(igniter);
        response.put("data", igniterBranchDetailDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @Operation(summary = "Save one Contact with Branch Office associated", responses = {
            @ApiResponse(description = "Successfully created", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server error", responseCode = "503"),
            @ApiResponse(description = "Body with Id", responseCode = "500")
    })
    @PostMapping
    public ResponseEntity<?> create(@RequestBody final IgniterDTO igniterDTO) {
        Map<String, Object> response = new HashMap<>();
        if (Objects.isNull(igniterDTO.getId())) {

            Long branchId = igniterDTO.getBranchId();
            Branch branch = branchService.getById(branchId);
            Igniter igniter = Igniter.from(igniterDTO, branch);

            igniter.setBranch(branch);
            igniter = igniterService.create(igniter);


            IgniterDTO igniterDTOFromSave = IgniterDTO.from(igniter);
            response.put("data", igniterDTOFromSave);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        throw new IgniterException("Ya existe un igniter con el id: ".concat(igniterDTO.getId().toString()));
    }

    @Operation(summary = "Update one Contact", responses = {
            @ApiResponse(description = "Successfully updated", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server error", responseCode = "503"),
            @ApiResponse(description = "Contact not found", responseCode = "500")
    })
    @PutMapping("{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") final Long igniterId, @RequestBody final IgniterDTO igniterDTO) {
        Map<String, Object> response = new HashMap<>();
        Long branchId = igniterDTO.getBranchId();
        Branch branch = branchService.getById(branchId);
        Igniter igniter = Igniter.from(igniterDTO, branch);
        IgniterDTO igniterDTOFromUpdate = IgniterDTO.from(igniterService.update(igniterId, igniter));
        response.put("data", igniterDTOFromUpdate);
        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    @Operation(summary = "Delete one Contact", responses = {
            @ApiResponse(description = "Successfully delete", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server error", responseCode = "503"),
            @ApiResponse(description = "Contact not found", responseCode = "500")
    })
    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") final Long igniterId) {
        Map<String, Object> response = new HashMap<>();
        igniterService.delete(igniterId);
        response.put("success_message", "Contacto eliminado con exito");
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

}
