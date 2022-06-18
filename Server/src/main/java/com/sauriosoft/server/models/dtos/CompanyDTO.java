package com.sauriosoft.server.models.dtos;

import com.sauriosoft.server.models.entities.BranchOfficeEntity;
import com.sauriosoft.server.models.entities.CompanyEntity;
import lombok.*;

import javax.persistence.Column;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyDTO implements Serializable {

    private Long id;

    private String name;

    private String city;

    private String latitude;

    private String longitude;

    private String phone;

    private Set<BranchOfficeEntity> branchOfficeEntitySet;

    public static CompanyDTO from (CompanyEntity company){
        return CompanyDTO.builder()
                .id(company.getId())
                .city(company.getCity())
                .longitude(company.getLongitude())
                .latitude(company.getLatitude())
                .name(company.getName())
                .phone(company.getPhone())
                .branchOfficeEntitySet(company.getBranchOfficeEntitySet())
                .build();
    }

}
