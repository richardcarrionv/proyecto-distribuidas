package com.sauriosoft.server.models.entities;

import com.sauriosoft.server.models.dtos.UserDTO;
import com.sauriosoft.server.models.util.Role;
import lombok.*;


import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 11)
    private Long id;

    @Column(name = "username", length = 15, nullable = false, unique = true)
    private String username;

    @Column(name = "password", length = 15, nullable = false)
    private String password;

    @Column(name = "role", columnDefinition = "VARCHAR(10)", nullable = false)
    private Role role;

    public static User from(UserDTO userDTO) {
        return User.builder().username(userDTO.getUsername())
                .role(userDTO.getRole())
                .password(userDTO.getPassword()).build();
    }

}
