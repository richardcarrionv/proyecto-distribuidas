package com.sauriosoft.server.models.entities;

import com.sauriosoft.server.models.dtos.BranchOfficeDTO;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "branch_offices")
public class BranchOfficeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "branch_id", length = 11)
    private Long id;

    @Column(name = "branch_name", length = 50, nullable = false, unique = true)
    private String name;

    @Column(name = "branch_city", length = 50, nullable = false)
    private String city;

    @Column(name = "branch_latitude", length = 100, nullable = false)
    private String latitude;

    @Column(name = "branch_longitude", length = 100, nullable = false)
    private String longitude;

    @Column(name = "branch_phone", length = 10, nullable = false)
    private String phone;

    @ManyToOne
    private CompanyEntity company;

    public static BranchOfficeEntity from (BranchOfficeDTO branchOfficeDTO){
        return BranchOfficeEntity.builder()
                .name(branchOfficeDTO.getName())
                .city(branchOfficeDTO.getCity())
                .latitude(branchOfficeDTO.getLatitude())
                .longitude(branchOfficeDTO.getLongitude())
                .phone(branchOfficeDTO.getPhone()).build();
    }
}
