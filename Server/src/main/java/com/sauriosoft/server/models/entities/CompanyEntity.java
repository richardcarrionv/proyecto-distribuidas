package com.sauriosoft.server.models.entities;

import com.sauriosoft.server.models.dtos.CompanyDTO;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "companies")
public class CompanyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "company_id", length = 11)
    private Long id;

    @Column(name = "company_name", length = 50, nullable = false, unique = true)
    private String name;

    @Column(name = "company_city", length = 50, nullable = false)
    private String city;

    @Column(name = "company_latitude", length = 100, nullable = false)
    private String latitude;

    @Column(name = "company_longitude", length = 100, nullable = false)
    private String longitude;

    @Column(name = "company_phone", length = 10, nullable = false)
    private String phone;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "company_id" )
    private Set<BranchOfficeEntity> branchOfficeEntitySet;

    public static CompanyEntity from (CompanyDTO companyDTO){
        return CompanyEntity.builder()
                .name(companyDTO.getName())
                .city(companyDTO.getCity())
                .latitude(companyDTO.getLatitude())
                .longitude(companyDTO.getLongitude())
                .phone(companyDTO.getPhone()).build();
    }

}
