package com.sauriosoft.server.models.entities;

import com.sauriosoft.server.models.dtos.BranchOfficeDTO;
import com.sauriosoft.server.models.dtos.BranchOfficeNoContactDTO;
import com.sauriosoft.server.models.dtos.ContactNoBranchDTO;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


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

    @Column(name = "verification_code", length = 6, nullable = false)
    private String verificationCode;

    @Column(name = "branch_province", length = 20, nullable = false)
    private String province;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JoinColumn(name = "branch_id")
    private Set<ContactEntity> contactEntityList;

    public static BranchOfficeEntity from(BranchOfficeDTO branchOfficeDTO) {
        return BranchOfficeEntity.builder()
                .name(branchOfficeDTO.getName())
                .city(branchOfficeDTO.getCity())
                .latitude(branchOfficeDTO.getLatitude())
                .longitude(branchOfficeDTO.getLongitude())
                .phone(branchOfficeDTO.getPhone())
                .verificationCode(branchOfficeDTO.getVerificationCode())
                .province(branchOfficeDTO.getProvince())
                .contactEntityList(branchOfficeDTO.getContactList().stream()
                        .map(ContactEntity::from).collect(Collectors.toSet()))
                .build();
    }

    public static BranchOfficeEntity fromWithId(BranchOfficeNoContactDTO branchOfficeNoContactDTO) {
        return BranchOfficeEntity.builder()
                .id(branchOfficeNoContactDTO.getId())
                .name(branchOfficeNoContactDTO.getName())
                .city(branchOfficeNoContactDTO.getCity())
                .latitude(branchOfficeNoContactDTO.getLatitude())
                .longitude(branchOfficeNoContactDTO.getLongitude())
                .province(branchOfficeNoContactDTO.getProvince())
                .phone(branchOfficeNoContactDTO.getPhone())
                .verificationCode(branchOfficeNoContactDTO.getVerificationCode())
                .build();
    }

    public void saveContact(ContactEntity contact) {
        contactEntityList.add(contact);
    }

    public void deleteContact(ContactEntity contact) {
        contactEntityList.remove(contact);
    }
}
