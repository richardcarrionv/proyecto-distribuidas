package com.sauriosoft.server.controllers;

import com.sauriosoft.server.models.dtos.BranchDTO;
import com.sauriosoft.server.models.dtos.igniter.IgniterDTO;
import com.sauriosoft.server.models.entities.Branch;
import com.sauriosoft.server.models.entities.Igniter;
import com.sauriosoft.server.models.exceptions.BranchException;
import com.sauriosoft.server.models.services.BranchService;
import com.sauriosoft.server.models.services.IgniterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/branches/")
public class BranchController {
    @Autowired
    private BranchService branchService;

    @Autowired
    private IgniterService igniterService;


    @Operation(summary = "Get all Branch Offices", responses = {
            @ApiResponse(description = "Succesful Operation", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server Error", responseCode = "503"),
            @ApiResponse(description = "Empty", responseCode = "204")
    })
    @GetMapping
    public ResponseEntity<?> getAll() {
        Map<String, Object> response = new HashMap<>();

        List<Branch> listOfBranchOffices = branchService.getAll();

        if (listOfBranchOffices.isEmpty()) {
            response.put("message", "No hay Sucursales para mostrar");
            return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
        }

        List<BranchDTO> listOfBranchDTOS = listOfBranchOffices
                .stream()
                .map(BranchDTO::from)
                .collect(Collectors.toList());

        response.put("data", listOfBranchDTOS);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "Get one Branch Office by Id", responses = {
            @ApiResponse(description = "Succesful Operation", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "The Branch Office doesn't exist with this Id", responseCode = "500"),
            @ApiResponse(description = "Server error", responseCode = "503")
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable(name = "id") final Long idBranchOffice) {
        Map<String, Object> response = new HashMap<>();
        Branch branchOffice = branchService.getById(idBranchOffice);
        response.put("data", BranchDTO.from(branchOffice));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{id}/igniters")
    public ResponseEntity<?> getIgniters(@PathVariable(name = "id") final Long idBranchOffice) {
        Map<String, Object> response = new HashMap<>();
        List<Igniter> igniters = igniterService.getAllByBranchId(idBranchOffice);
        List<IgniterDTO> igniterDTOS = igniters.stream()
                .map(IgniterDTO::from)
                .collect(Collectors.toList());
        response.put("data", igniterDTOS);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "Save one new Branch Office", responses = {
            @ApiResponse(description = "Succesful Operation", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "The data already exist or the body has an ID", responseCode = "500"),
            @ApiResponse(description = "Server error", responseCode = "503")
    })
    @PostMapping
    public ResponseEntity<?> create(@RequestBody final BranchDTO branchDTO) {
        Map<String, Object> response = new HashMap<>();
        if (Objects.isNull(branchDTO.getId())) {
            Branch branchOfficeToSave = Branch.from(branchDTO);
            response.put("data", BranchDTO.from(branchService.create(branchOfficeToSave)));
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        throw new BranchException("Ya existe una sucursal con la id: ".concat(branchDTO.getId().toString()));
    }

    @Operation(summary = "Update one Branch Office by Id and new Body", responses = {
            @ApiResponse(description = "Succesful Operation", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "The Branch Office to Update doesn't exist", responseCode = "500"),
            @ApiResponse(description = "Server error", responseCode = "503")
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") final Long idBranchOffice,
                                    @RequestBody final BranchDTO branchDTO) {
        Map<String, Object> response = new HashMap<>();
        Branch branch = Branch.from(branchDTO);
        branch = branchService.update(branch, idBranchOffice);
        response.put("data", BranchDTO.from(branch));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "Delete one Branch Office by Id", responses = {
            @ApiResponse(description = "Succesful Operation", responseCode = "202", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "The Branch Office to Delete doesn't exist", responseCode = "500"),
            @ApiResponse(description = "Server error", responseCode = "503")
    })
    @DeleteMapping("/id")
    public ResponseEntity<?> delete(@PathVariable(name = "id") final Long idBranchOffice) {
        Map<String, Object> response = new HashMap<>();
        branchService.delete(idBranchOffice);
        response.put("success_message", "Sucursal eliminada éxitosamente.");
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);

    }

}
