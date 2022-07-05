package com.sauriosoft.server.models.entities;

import com.sauriosoft.server.models.dtos.ContactDTO;
import com.sauriosoft.server.models.dtos.ContactNoBranchDTO;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "contacts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contact_id", length = 11)
    private Long id;

    @Column(name = "contact_name", length = 50, nullable = false)
    private String name;

    @Column(name = "contact_surname", length = 50, nullable = false)
    private String surname;

    @Column(name = "contact_ci", length = 10, nullable = false, unique = true)
    private String ci;

    @Column(name = "contact_phone", length = 10, nullable = false)
    private String phone;

    @ManyToOne(fetch = FetchType.LAZY)
    private BranchOfficeEntity branchOffice;

    public static ContactEntity from(ContactDTO contactDTO) {
        return ContactEntity.builder()
                .name(contactDTO.getName())
                .surname(contactDTO.getSurname())
                .phone(contactDTO.getPhone())
                .ci(contactDTO.getCi())
                .branchOffice(BranchOfficeEntity.fromWithId(contactDTO.getBranchOfficeNoContactDTO()))
                .build();
    }

    public static ContactEntity from(ContactNoBranchDTO contactNoBranchDTO) {
        return ContactEntity.builder()
                .name(contactNoBranchDTO.getName())
                .surname(contactNoBranchDTO.getSurname())
                .phone(contactNoBranchDTO.getPhone())
                .ci(contactNoBranchDTO.getCi())
                .build();
    }

}
