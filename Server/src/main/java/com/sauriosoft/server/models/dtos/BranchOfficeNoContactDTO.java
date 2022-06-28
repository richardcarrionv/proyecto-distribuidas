package com.sauriosoft.server.models.dtos;

import com.sauriosoft.server.models.entities.BranchOfficeEntity;
import lombok.*;

import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BranchOfficeNoContactDTO {

    private Long id;

    private String name;

    private String city;

    private String latitude;

    private String longitude;

    private String phone;

    private String verificationCode;

    public static BranchOfficeNoContactDTO from(BranchOfficeEntity branchOffice) {
        return BranchOfficeNoContactDTO.builder()
                .id(branchOffice.getId())
                .name(branchOffice.getName())
                .city(branchOffice.getCity())
                .latitude(branchOffice.getLatitude())
                .longitude(branchOffice.getLongitude())
                .phone(branchOffice.getPhone())
                .verificationCode(branchOffice.getVerificationCode())
                .build();
    }
}
