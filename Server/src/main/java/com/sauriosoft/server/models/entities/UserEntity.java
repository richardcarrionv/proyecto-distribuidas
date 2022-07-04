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
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id", length = 11)
    private Long id;

    @Column(name = "user_username", length = 15, nullable = false, unique = true)
    private String username;

    @Column(name = "user_password", length = 15, nullable = false)
    private String password;

    @Column(name = "user_role", columnDefinition = "VARCHAR(10)", nullable = false)
    private Role role;

    public static UserEntity from(UserDTO userDTO) {
        return UserEntity.builder().username(userDTO.getUsername())
                .role(userDTO.getRole())
                .password(userDTO.getPassword()).build();
    }

}
