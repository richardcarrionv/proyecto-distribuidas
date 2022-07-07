package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.Branch;
import com.sauriosoft.server.models.exceptions.BranchException;
import com.sauriosoft.server.models.repositories.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class BranchServiceImpl implements BranchService {

    @Autowired
    private BranchRepository branchRepository;

    @Override
    public List<Branch> getAll() {
        return branchRepository.findAll();
    }

    @Override
    public Branch getById(Long idBranchOffice) {
        return branchRepository.findById(idBranchOffice)
                .orElseThrow(() -> new BranchException("Not found Branch_Office with id: "
                        .concat(idBranchOffice.toString())));
    }

    @Override
    public Branch create(Branch branchOffice) {
        return branchRepository.save(branchOffice);
    }

    @Override
    public Branch update(Branch branchOffice, Long idBranchOffice) {
        Branch branchOfficeToUpdate = getById(idBranchOffice);
        branchOfficeToUpdate.setCity(branchOffice.getCity());
        branchOfficeToUpdate.setName(branchOffice.getName());
        branchOfficeToUpdate.setLatitude(branchOffice.getLatitude());
        branchOfficeToUpdate.setLongitude(branchOffice.getLongitude());
        branchOfficeToUpdate.setPhone(branchOffice.getPhone());
        return branchRepository.save(branchOfficeToUpdate);
    }

    @Override
    public void delete(Long idBranchOffice) {
        branchRepository.deleteById(idBranchOffice);
    }

}
