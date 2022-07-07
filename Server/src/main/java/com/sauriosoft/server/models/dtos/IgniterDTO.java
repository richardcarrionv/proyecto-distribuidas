package com.sauriosoft.server.models.dtos;

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

    private String ci;

    private BranchDTO branch;

    public static IgniterDTO from(Igniter igniter) {
        return IgniterDTO.builder()
                .id(igniter.getId())
                .name(igniter.getName())
                .surname(igniter.getSurname())
                .phone(igniter.getPhone())
                .ci(igniter.getCi())
                .branch(BranchDTO.from(igniter.getBranch()))
                .build();
    }
}
