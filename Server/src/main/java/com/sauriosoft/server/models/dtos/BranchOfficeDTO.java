package com.sauriosoft.server.models.dtos;

import com.sauriosoft.server.models.entities.BranchOfficeEntity;
import com.sauriosoft.server.models.entities.ContactEntity;
import lombok.*;

import java.io.Serializable;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BranchOfficeDTO implements Serializable {

    private Long id;

    private String name;

    private String city;

    private String latitude;

    private String longitude;

    private String phone;

    private String verificationCode;

    private String province;

    private Set<ContactNoBranchDTO> contactList;

    public static BranchOfficeDTO from(BranchOfficeEntity branchOffice) {
        return BranchOfficeDTO.builder()
                .id(branchOffice.getId())
                .name(branchOffice.getName())
                .city(branchOffice.getCity())
                .latitude(branchOffice.getLatitude())
                .longitude(branchOffice.getLongitude())
                .phone(branchOffice.getPhone())
                .province(branchOffice.getProvince())
                .verificationCode(branchOffice.getVerificationCode())
                .contactList(branchOffice.getContactEntityList().stream()
                        .map(ContactNoBranchDTO::from).collect(Collectors.toSet())
                )
                .build();
    }

}
