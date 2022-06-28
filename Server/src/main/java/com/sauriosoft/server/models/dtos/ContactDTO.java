package com.sauriosoft.server.models.dtos;

import com.sauriosoft.server.models.entities.BranchOfficeEntity;
import com.sauriosoft.server.models.entities.ContactEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactDTO {

    private Long id;

    private String name;

    private String surname;

    private String phone;

    private String ci;

    private BranchOfficeNoContactDTO branchOfficeNoContactDTO;

    public static ContactDTO from(ContactEntity contact) {
        return ContactDTO.builder()
                .id(contact.getId())
                .name(contact.getName())
                .surname(contact.getSurname())
                .phone(contact.getPhone())
                .ci(contact.getCi())
                .branchOfficeNoContactDTO(BranchOfficeNoContactDTO.from(contact.getBranchOffice()))
                .build();
    }
}
