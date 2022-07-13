package com.sauriosoft.server.models.dtos.alarm;

import com.sauriosoft.server.models.entities.Alarm;
import lombok.*;

import java.util.Date;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlarmDTO {
    private Long id;

    private Long igniterId;

    private Date date;

    public static AlarmDTO from(Alarm alarm) {
        return AlarmDTO.builder()
                .id(alarm.getId())
                .igniterId(alarm.getIgniter().getId())
                .date(alarm.getDate())
                .build();
    }
}

