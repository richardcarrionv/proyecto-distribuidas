package com.sauriosoft.server.controllers;

import com.sauriosoft.server.models.dtos.alarm.AlarmDTO;
import com.sauriosoft.server.models.dtos.alarm.DetailedAlarmDTO;
import com.sauriosoft.server.models.entities.Alarm;
import com.sauriosoft.server.models.entities.Igniter;
import com.sauriosoft.server.models.exceptions.AlarmException;
import com.sauriosoft.server.models.services.AlarmService;
import com.sauriosoft.server.models.services.IgniterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/alarms")
public class AlarmController {

    @Autowired
    AlarmService alarmService;

    @Autowired
    IgniterService igniterService;

    @GetMapping
    public ResponseEntity<List<DetailedAlarmDTO>> getAll() {

        List<Alarm> alarms = alarmService.getAll();

        if (alarms.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<DetailedAlarmDTO> detailedAlarmDTOS = alarms
                .stream()
                .map(DetailedAlarmDTO::from)
                .collect(Collectors.toList());

        return ResponseEntity.ok(detailedAlarmDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetailedAlarmDTO> getById(@PathVariable(name = "id") final Long id) {
        Alarm alarm = alarmService.getById(id);
        return ResponseEntity.ok(DetailedAlarmDTO.from(alarm));
    }

    @PostMapping
    public ResponseEntity<AlarmDTO> create(@RequestBody final AlarmDTO alarmDTO) {
        if (!Objects.isNull(alarmDTO.getId())) {
            throw new AlarmException("Ya existe una alarma con la id: ".concat(alarmDTO.getId().toString()));
        }
        Igniter igniter = igniterService.getById(alarmDTO.getIgniterId());
        Alarm alarm = Alarm.from(alarmDTO, igniter);
        alarm = alarmService.create(alarm);
        return ResponseEntity.ok(AlarmDTO.from(alarm));
    }

}
