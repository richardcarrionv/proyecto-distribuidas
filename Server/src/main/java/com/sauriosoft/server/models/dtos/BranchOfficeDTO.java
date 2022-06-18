package com.sauriosoft.server.models.dtos;

import com.sauriosoft.server.models.entities.BranchOfficeEntity;
import lombok.*;

import javax.persistence.Column;
import java.io.Serializable;

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

    public static BranchOfficeDTO from (BranchOfficeEntity branchOffice){
        return BranchOfficeDTO.builder()
                .id(branchOffice.getId())
                .name(branchOffice.getName())
                .city(branchOffice.getCity())
                .latitude(branchOffice.getLatitude())
                .longitude(branchOffice.getLongitude())
                .phone(branchOffice.getPhone())
                .build();
    }

}
