package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.BranchOfficeEntity;
import com.sauriosoft.server.models.entities.CompanyEntity;

import java.util.List;

public interface ICompanyService {

    List<CompanyEntity> getAll();

    CompanyEntity getById(Long idCompany);

    CompanyEntity addBranchOffice(Long idCompany, Long idBranchOffice );

    List<BranchOfficeEntity> getBranchOfficesFromCompanyId(Long idCompany);

}
