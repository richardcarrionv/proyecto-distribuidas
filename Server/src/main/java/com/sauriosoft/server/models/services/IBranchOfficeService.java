package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.BranchOfficeEntity;

import java.util.List;

public interface IBranchOfficeService {

    List<BranchOfficeEntity> getAll();

    BranchOfficeEntity getById(Long idBranchOffice);

    BranchOfficeEntity addBranchOffice(BranchOfficeEntity branchOffice);

    BranchOfficeEntity updateBranchOffice(BranchOfficeEntity branchOffice, Long idBranchOffice);

    void deleteBranchOffice(Long idBranchOffice);

}
