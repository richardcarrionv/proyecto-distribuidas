package com.sauriosoft.server.models.repositories;

import com.sauriosoft.server.models.entities.Igniter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IgniterRepository extends JpaRepository<Igniter, Long> {

    Igniter findByCiAndPassword(String ci, String password);
}
