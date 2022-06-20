package com.sauriosoft.server.controllers;

import com.sauriosoft.server.models.dtos.BranchOfficeDTO;
import com.sauriosoft.server.models.entities.BranchOfficeEntity;
import com.sauriosoft.server.models.exceptions.BranchOfficeException;
import com.sauriosoft.server.models.services.IBranchOfficeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/branchOffices/")
public class BranchOfficeController {
    @Autowired
    private IBranchOfficeService branchOfficeService;

    @Operation(summary = "Get all Branch Offices", responses = {
            @ApiResponse(description = "Succesful Operation", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Is empty", responseCode = "404")
    })
    @GetMapping
    public ResponseEntity<?> getAll() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<BranchOfficeEntity> listOfBranchOffices = branchOfficeService.getAll();
            if (listOfBranchOffices.isEmpty()) {
                response.put("message", "No hay Sucursales para mostrar");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            List<BranchOfficeDTO> listOfBranchOfficeDTOS = listOfBranchOffices
                    .stream()
                    .map(BranchOfficeDTO::from)
                    .collect(Collectors.toList());
            response.put("response", listOfBranchOfficeDTOS);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception ex) {
            response.put("error", "Ha ocurrido un error en el servidor");
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
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
            BranchOfficeEntity branchOffice = branchOfficeService.getById(idBranchOffice);
            response.put("response", BranchOfficeDTO.from(branchOffice));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (BranchOfficeException ex) {
            response.put("error", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            response.put("error", "Ha ocurrido un error en el servidor");
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Operation(summary = "Save one new Branch Office", responses = {
            @ApiResponse(description = "Succesful Operation", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "The data already exist or the body has an ID", responseCode = "500"),
            @ApiResponse(description = "Server error", responseCode = "503")
    })
    @PostMapping
    public ResponseEntity<?> addBranchOffice(@RequestBody final BranchOfficeDTO branchOfficeDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (Objects.isNull(branchOfficeDTO.getId()) || Objects.isNull(branchOfficeService.getById(branchOfficeDTO.getId()))) {
                BranchOfficeEntity branchOfficeToSave = BranchOfficeEntity.from(branchOfficeDTO);
                response.put("response", BranchOfficeDTO.from(branchOfficeService.addBranchOffice(branchOfficeToSave)));
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            }
            response.put("error", "Ya existe la Sucursal");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);

        } catch (BranchOfficeException ex) {
            response.put("error", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            response.put("error", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Operation(summary = "Update one Branch Office by Id and new Body", responses = {
            @ApiResponse(description = "Succesful Operation", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "The Branch Office to Update doesn't exist", responseCode = "500"),
            @ApiResponse(description = "Server error", responseCode = "503")
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBranchOfficeById(@PathVariable(name = "id") final Long idBranchOffice,
                                                    @RequestBody final BranchOfficeDTO branchOfficeDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            BranchOfficeEntity branchOfficeToUpdate = BranchOfficeEntity.from(branchOfficeDTO);
            branchOfficeToUpdate = branchOfficeService.updateBranchOffice(branchOfficeToUpdate, idBranchOffice);
            response.put("response", BranchOfficeDTO.from(branchOfficeToUpdate));
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (BranchOfficeException ex) {
            response.put("error", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            response.put("error", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
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
            branchOfficeService.deleteBranchOffice(idBranchOffice);
            response.put("response", "Sucursal eliminada éxitosamente.");
            return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
        } catch (BranchOfficeException ex) {
            response.put("error", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            response.put("error", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }


}
