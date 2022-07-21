package com.sauriosoft.server.controllers;

import com.sauriosoft.server.models.dtos.branch.BranchDTO;
import com.sauriosoft.server.models.dtos.igniter.IgniterDTO;
import com.sauriosoft.server.models.entities.Branch;
import com.sauriosoft.server.models.entities.Igniter;
import com.sauriosoft.server.models.exceptions.BranchException;
import com.sauriosoft.server.models.services.BranchService;
import com.sauriosoft.server.models.services.IgniterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/branches")
public class BranchController {
    @Autowired
    private BranchService branchService;

    @Autowired
    private IgniterService igniterService;


    @GetMapping
    public ResponseEntity<List<BranchDTO>> getAll() {

        List<Branch> branches = branchService.getAll();
        if (branches.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<BranchDTO> branchesDTOS = branches
                .stream()
                .map(BranchDTO::from)
                .collect(Collectors.toList());

        return ResponseEntity.ok(branchesDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BranchDTO> getById(@PathVariable(name = "id") final Long id) {
        Branch branch = branchService.getById(id);
        return ResponseEntity.ok(BranchDTO.from(branch));
    }

    @GetMapping("/{username}/{pwd}")
    public ResponseEntity<BranchDTO> exists(@PathVariable(name = "username") final String username,
                                            @PathVariable(name = "pwd") final String password) {
        Branch branch = branchService.exists(username, password);
        return ResponseEntity.ok(BranchDTO.from(branch));
    }

    @GetMapping("/{id}/igniters")
    public ResponseEntity<List<IgniterDTO>> getIgniters(@PathVariable(name = "id") final Long id) {
        List<Igniter> igniters = igniterService.getAllByBranchId(id);
        if (igniters.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<IgniterDTO> igniterDTOS = igniters.stream()
                .map(IgniterDTO::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(igniterDTOS);
    }

    @PostMapping
    public ResponseEntity<BranchDTO> create(@RequestBody final BranchDTO branchDTO) {
        if (!Objects.isNull(branchDTO.getId())) {
            throw new BranchException("Ya existe una sucursal con la id: ".concat(branchDTO.getId().toString()));
        }
        Branch branch = Branch.from(branchDTO);
        return ResponseEntity.ok(BranchDTO.from(branchService.create(branch)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BranchDTO> update(@PathVariable(name = "id") final Long id,
                                            @RequestBody final BranchDTO branchDTO) {
        Branch branch = Branch.from(branchDTO);
        branch = branchService.update(branch, id);
        return ResponseEntity.ok(BranchDTO.from(branch));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable(name = "id") final Long id) {
        Map<String, Object> response = new HashMap<>();
        branchService.delete(id);
        return ResponseEntity.ok("Registro eliminado correctamente");
    }
}
