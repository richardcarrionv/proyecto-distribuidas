package com.sauriosoft.server.models.repositories;

import com.sauriosoft.server.models.entities.BranchOfficeEntity;
import com.sauriosoft.server.models.entities.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<CompanyEntity, Long> {

}
