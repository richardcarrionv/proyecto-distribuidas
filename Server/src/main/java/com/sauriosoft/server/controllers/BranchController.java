package com.sauriosoft.server.controllers;

import com.sauriosoft.server.models.dtos.BranchDTO;
import com.sauriosoft.server.models.entities.Branch;
import com.sauriosoft.server.models.exceptions.BranchException;
import com.sauriosoft.server.models.services.BranchService;
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


    @Operation(summary = "Get all Branch Offices", responses = {
            @ApiResponse(description = "Succesful Operation", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server Error", responseCode = "503"),
            @ApiResponse(description = "Empty", responseCode = "204")
    })
    @GetMapping
    public ResponseEntity<?> getAll() {
        Map<String, Object> response = new HashMap<>();
        try {

            List<Branch> listOfBranchOffices = branchService.getAll();

            if (listOfBranchOffices.isEmpty()) {
                response.put("message", "No hay Sucursales para mostrar");
                return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
            }

            List<BranchDTO> listOfBranchDTOS = listOfBranchOffices
                    .stream()
                    .map(BranchDTO::from)
                    .collect(Collectors.toList());

            response.put("response", listOfBranchDTOS);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception ex) {
            return serviceUnavailableMessage(response, ex);
        }
    }

    @Operation(summary = "Get one Branch Office by Id", responses = {
            @ApiResponse(description = "Succesful Operation", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "The Branch Office doesn't exist with this Id", responseCode = "500"),
            @ApiResponse(description = "Server error", responseCode = "503")
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable(name = "id") final Long idBranchOffice) {
        Map<String, Object> response = new HashMap<>();
        try {
            Branch branchOffice = branchService.getById(idBranchOffice);
            response.put("response", BranchDTO.from(branchOffice));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (BranchException ex) {
            return internalServerErrorMessage(response, ex.getMessage());
        } catch (Exception ex) {
            return serviceUnavailableMessage(response, ex);
        }
    }

    @Operation(summary = "Save one new Branch Office", responses = {
            @ApiResponse(description = "Succesful Operation", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "The data already exist or the body has an ID", responseCode = "500"),
            @ApiResponse(description = "Server error", responseCode = "503")
    })
    @PostMapping
    public ResponseEntity<?> addBranchOffice(@RequestBody final BranchDTO branchDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (Objects.isNull(branchDTO.getId())) {
                Branch branchOfficeToSave = Branch.from(branchDTO);
                response.put("response", BranchDTO.from(branchService.create(branchOfficeToSave)));
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            }
            return internalServerErrorMessage(response, "La sucursal posee identificador");
        } catch (Exception ex) {
            return serviceUnavailableMessage(response, ex);
        }
    }

    @Operation(summary = "Update one Branch Office by Id and new Body", responses = {
            @ApiResponse(description = "Succesful Operation", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "The Branch Office to Update doesn't exist", responseCode = "500"),
            @ApiResponse(description = "Server error", responseCode = "503")
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBranchOfficeById(@PathVariable(name = "id") final Long idBranchOffice,
                                                    @RequestBody final BranchDTO branchDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            Branch branchOfficeToUpdate = Branch.from(branchDTO);
            branchOfficeToUpdate = branchService.update(branchOfficeToUpdate, idBranchOffice);
            response.put("response", BranchDTO.from(branchOfficeToUpdate));
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (BranchException ex) {
            return internalServerErrorMessage(response, ex.getMessage());
        } catch (Exception ex) {
            return serviceUnavailableMessage(response, ex);
        }
    }

    @Operation(summary = "Delete one Branch Office by Id", responses = {
            @ApiResponse(description = "Succesful Operation", responseCode = "202", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "The Branch Office to Delete doesn't exist", responseCode = "500"),
            @ApiResponse(description = "Server error", responseCode = "503")
    })
    @DeleteMapping("/id")
    public ResponseEntity<?> deleteBranchOfficeById(@PathVariable(name = "id") final Long idBranchOffice) {
        Map<String, Object> response = new HashMap<>();
        try {
            branchService.delete(idBranchOffice);
            response.put("response", "Sucursal eliminada éxitosamente.");
            return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
        } catch (BranchException ex) {
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
