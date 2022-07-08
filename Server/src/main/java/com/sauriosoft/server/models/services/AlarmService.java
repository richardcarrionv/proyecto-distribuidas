package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.Alarm;

import java.util.List;

public interface AlarmService {

    List<Alarm> getAll();

    Alarm getById(Long idAlarmOffice);

    Alarm create(Alarm branchOffice);

}
