package com.sauriosoft.server.controllers;

import com.sauriosoft.server.models.dtos.igniter.IgniterBranchDetailDTO;
import com.sauriosoft.server.models.dtos.igniter.IgniterDTO;
import com.sauriosoft.server.models.entities.Branch;
import com.sauriosoft.server.models.entities.Igniter;
import com.sauriosoft.server.models.exceptions.IgniterException;
import com.sauriosoft.server.models.services.BranchService;
import com.sauriosoft.server.models.services.IgniterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/igniters")
public class IgniterController {

    @Autowired
    private IgniterService igniterService;

    @Autowired
    private BranchService branchService;


    @GetMapping
    public ResponseEntity<List<IgniterBranchDetailDTO>> getAll() {
        List<Igniter> igniters = igniterService.getAll();
        if (igniters.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<IgniterBranchDetailDTO> igniterDTOS = igniters.stream()
                .map(IgniterBranchDetailDTO::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(igniterDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<IgniterBranchDetailDTO> getById(@PathVariable(name = "id") final Long igniterId) {
        Igniter igniter = igniterService.getById(igniterId);
        IgniterBranchDetailDTO igniterBranchDetailDTO = IgniterBranchDetailDTO.from(igniter);
        return ResponseEntity.ok(igniterBranchDetailDTO);
    }

    @PostMapping
    public ResponseEntity<IgniterDTO> create(@RequestBody final IgniterDTO igniterDTO) {
        if (!Objects.isNull(igniterDTO.getId())) {
            throw new IgniterException("Ya existe un igniter con el id: ".concat(igniterDTO.getId().toString()));
        }
        Branch branch = branchService.getById(igniterDTO.getBranchId());
        Igniter igniter = Igniter.from(igniterDTO, branch);

        igniter.setBranch(branch);
        igniter = igniterService.create(igniter);

        IgniterDTO igniterDTOFromSave = IgniterDTO.from(igniter);
        return ResponseEntity.ok(igniterDTOFromSave);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IgniterDTO> update(@PathVariable(name = "id") final Long id, @RequestBody final IgniterDTO igniterDTO) {
        Branch branch = branchService.getById(igniterDTO.getBranchId());
        Igniter igniter = Igniter.from(igniterDTO, branch);
        IgniterDTO igniterDTOFromUpdate = IgniterDTO.from(igniterService.update(id, igniter));
        return ResponseEntity.ok(igniterDTOFromUpdate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable(name = "id") final Long igniterId) {
        igniterService.delete(igniterId);
        return ResponseEntity.ok("Registro eliminado correctamente");
    }

}
