package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.Alarm;
import com.sauriosoft.server.models.exceptions.AlarmException;
import com.sauriosoft.server.models.repositories.AlarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlarmServiceImpl implements AlarmService {

    @Autowired
    AlarmRepository alarmRepository;

    @Override
    public List<Alarm> getAll() {
        return alarmRepository.findAll();
    }

    @Override
    public Alarm getById(Long id) {
        return alarmRepository.findById(id)
                .orElseThrow(() -> new AlarmException("Not found alarm with id: ".concat(id.toString())));
    }

    @Override
    public Alarm create(Alarm alarm) {
        return alarmRepository.save(alarm);
    }
}
