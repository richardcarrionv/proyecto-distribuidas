package com.sauriosoft.server.models.entities;

import com.sauriosoft.server.models.dtos.igniter.IgniterDTO;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "igniters")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Igniter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 11)
    private Long id;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "surname", length = 50, nullable = false)
    private String surname;


    @Column(name = "password", length = 15, nullable = false)
    private String password;

    @Column(name = "ci", length = 10, nullable = false, unique = true)
    private String ci;

    @Column(name = "phone", length = 10, nullable = false)
    private String phone;
    @ManyToOne(fetch = FetchType.LAZY)
    private Branch branch;

    public static Igniter from(IgniterDTO igniterDTO, Branch branch) {
        return Igniter.builder()
                .name(igniterDTO.getName())
                .surname(igniterDTO.getSurname())
                .phone(igniterDTO.getPhone())
                .password(igniterDTO.getPassword())
                .ci(igniterDTO.getCi())
                .branch(branch)
                .build();
    }

}
