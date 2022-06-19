package com.sauriosoft.server.models.repositories;

import com.sauriosoft.server.models.entities.BranchOfficeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BranchOfficeRepository extends JpaRepository<BranchOfficeEntity, Long> {

}
