package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.Branch;

import java.util.List;

public interface BranchService {

    List<Branch> getAll();

    Branch getById(Long idBranchOffice);

    Branch create(Branch branchOffice);

    Branch update(Branch branchOffice, Long idBranchOffice);

    void delete(Long idBranchOffice);

    Branch exists(String username, String password);
}
