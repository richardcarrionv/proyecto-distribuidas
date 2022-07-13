package com.sauriosoft.server.models.dtos.alarm;

import com.sauriosoft.server.models.dtos.igniter.IgniterBranchDetailDTO;
import com.sauriosoft.server.models.entities.Alarm;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DetailedAlarmDTO {

    private Long id;

    private IgniterBranchDetailDTO igniter;

    private Date date;

    public static DetailedAlarmDTO from(Alarm alarm) {
        return DetailedAlarmDTO.builder()
                .id(alarm.getId())
                .igniter(IgniterBranchDetailDTO.from(alarm.getIgniter()))
                .date(alarm.getDate())
                .build();
    }
}
