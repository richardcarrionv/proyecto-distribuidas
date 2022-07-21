package com.sauriosoft.server.models.dtos.igniter;

import com.sauriosoft.server.models.dtos.branch.BranchDTO;
import com.sauriosoft.server.models.entities.Igniter;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IgniterBranchDetailDTO {

    private Long id;

    private String name;

    private String surname;

    private String phone;

    private String password;
    private String ci;

    private BranchDTO branch;

    public static IgniterBranchDetailDTO from(Igniter igniter) {
        return IgniterBranchDetailDTO.builder()
                .id(igniter.getId())
                .name(igniter.getName())
                .surname(igniter.getSurname())
                .phone(igniter.getPhone())
                .ci(igniter.getCi())
                .password(igniter.getPassword())
                .branch(BranchDTO.from(igniter.getBranch()))
                .build();
    }
}
