package com.sauriosoft.server.models.dtos;

import com.sauriosoft.server.models.entities.Branch;
import lombok.*;

import java.io.Serializable;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BranchDTO implements Serializable {

    private Long id;

    private String name;

    private String province;

    private String city;

    private String address;

    private String latitude;

    private String longitude;

    private String phone;

    private String verificationCode;

    public static BranchDTO from(Branch branch) {
        return BranchDTO.builder()
                .id(branch.getId())
                .name(branch.getName())
                .city(branch.getCity())
                .address(branch.getAddress())
                .latitude(branch.getLatitude())
                .longitude(branch.getLongitude())
                .phone(branch.getPhone())
                .province(branch.getProvince())
                .verificationCode(branch.getVerificationCode())
                .build();
    }

}
