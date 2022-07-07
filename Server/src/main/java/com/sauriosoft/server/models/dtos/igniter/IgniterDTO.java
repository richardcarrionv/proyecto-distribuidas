package com.sauriosoft.server.models.dtos.igniter;

import com.sauriosoft.server.models.entities.Igniter;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IgniterDTO {

    private Long id;

    private String name;

    private String surname;

    private String phone;

    private String password;
    private String ci;

    private Long branchId;

    public static IgniterDTO from(Igniter igniter) {
        return IgniterDTO.builder()
                .id(igniter.getId())
                .name(igniter.getName())
                .surname(igniter.getSurname())
                .phone(igniter.getPhone())
                .ci(igniter.getCi())
                .password(igniter.getPassword())
                .branchId(igniter.getBranch().getId())
                .build();
    }
}
