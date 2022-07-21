package com.sauriosoft.server.models.entities;

import com.sauriosoft.server.models.dtos.branch.BranchDTO;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "branches")
public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 11)
    private Long id;
    @Column(name = "name", length = 50, nullable = false, unique = true)
    private String name;

    @Column(name = "username", length = 50, nullable = false, unique = true)
    private String username;

    @Column(name = "password", length = 50, nullable = false)
    private String password;

    @Column(name = "province", length = 20, nullable = false)
    private String province;

    @Column(name = "city", length = 50, nullable = false)
    private String city;

    @Column(name = "address", length = 20, nullable = false)
    private String address;

    @Column(name = "latitude", length = 100, nullable = false)
    private String latitude;

    @Column(name = "longitude", length = 100, nullable = false)
    private String longitude;

    @Column(name = "phone", length = 10, nullable = false)
    private String phone;

    @Column(name = "verification_code", length = 6, nullable = false)
    private String verificationCode;

    @OneToMany(
            mappedBy = "branch",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Igniter> igniters = new HashSet<>();

    public static Branch from(BranchDTO branchDTO) {
        return Branch.builder()
                .name(branchDTO.getName())
                .username(branchDTO.getUsername())
                .password(branchDTO.getPassword())
                .province(branchDTO.getProvince())
                .city(branchDTO.getCity())
                .address(branchDTO.getAddress())
                .latitude(branchDTO.getLatitude())
                .longitude(branchDTO.getLongitude())
                .phone(branchDTO.getPhone())
                .verificationCode(branchDTO.getVerificationCode())
                .build();
    }

}
