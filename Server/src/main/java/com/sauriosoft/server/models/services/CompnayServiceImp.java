package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.BranchOfficeEntity;
import com.sauriosoft.server.models.entities.CompanyEntity;
import com.sauriosoft.server.models.exceptions.CompanyException;
import com.sauriosoft.server.models.repositories.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CompnayServiceImp implements ICompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private IBrancheOfficeService branchOfficeService;


    @Override
    public List<CompanyEntity> getAll() {
        return companyRepository.findAll();
    }

    @Override
    public CompanyEntity getById(Long idCompany) {
        return companyRepository.findById(idCompany).orElseThrow(()->
                new CompanyException("Not found Company with id: ".concat(idCompany.toString()))
        );
    }

    @Override
    public CompanyEntity addBranchOffice(Long idCompany, Long idBranchOffice) {
        CompanyEntity company = getById(idCompany);
        BranchOfficeEntity branchOffice = branchOfficeService.getById(idBranchOffice);
        company.addBranchOffice(branchOffice);
        return company;
    }

    @Override
    @Transactional
    public List<BranchOfficeEntity> getBranchOfficesFromCompanyId(Long idCompany) {
        CompanyEntity company = getById(idCompany);
        return branchOfficeService.getAllByIdCompany(company);
    }
}
