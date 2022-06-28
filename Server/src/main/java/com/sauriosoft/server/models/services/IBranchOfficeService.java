package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.BranchOfficeEntity;
import com.sauriosoft.server.models.entities.ContactEntity;

import java.util.List;

public interface IBranchOfficeService {

    List<BranchOfficeEntity> getAll();

    BranchOfficeEntity getById(Long idBranchOffice);

    BranchOfficeEntity addBranchOffice(BranchOfficeEntity branchOffice);

    BranchOfficeEntity updateBranchOffice(BranchOfficeEntity branchOffice, Long idBranchOffice);

    void deleteBranchOffice(Long idBranchOffice);

    BranchOfficeEntity saveContact(Long idBranchOffice, ContactEntity contact);

}
