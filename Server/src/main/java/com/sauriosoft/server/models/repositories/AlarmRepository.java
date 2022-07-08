package com.sauriosoft.server.models.repositories;

import com.sauriosoft.server.models.entities.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
}
