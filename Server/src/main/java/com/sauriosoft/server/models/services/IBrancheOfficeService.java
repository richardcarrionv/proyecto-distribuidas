package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.BranchOfficeEntity;
import com.sauriosoft.server.models.entities.CompanyEntity;

import java.util.List;

public interface IBrancheOfficeService {

    List<BranchOfficeEntity> getAll();

    BranchOfficeEntity getById(Long idBranchOffice);

    BranchOfficeEntity addBranchOffice (BranchOfficeEntity branchOffice);

    BranchOfficeEntity updateBranchOffice (BranchOfficeEntity branchOffice, Long idBranchOffice);

    void deleteBranchOffice(Long idBranchOffice);

    List<BranchOfficeEntity> getAllByIdCompany(CompanyEntity company);
}
