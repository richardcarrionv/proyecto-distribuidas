package com.sauriosoft.server.models.entities;

import com.sauriosoft.server.models.dtos.alarm.AlarmDTO;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "alarms")
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 11)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Igniter igniter;

    @Column(name = "date", length = 15, nullable = false)
    private Date date;

    public static Alarm from(AlarmDTO alarmDTO, Igniter igniter) {
        return Alarm.builder()
                .id(alarmDTO.getId())
                .igniter(igniter)
                .date(alarmDTO.getDate()).build();
    }

}
