package com.sauriosoft.server.models.dtos;

import com.sauriosoft.server.models.entities.ContactEntity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactNoBranchDTO {

    private Long id;

    private String name;

    private String surname;

    private String phone;

    private String ci;


    public static ContactNoBranchDTO from(ContactEntity contact) {
        return ContactNoBranchDTO.builder()
                .id(contact.getId())
                .name(contact.getName())
                .surname(contact.getSurname())
                .phone(contact.getPhone())
                .ci(contact.getCi())
                .build();
    }
}
