package com.sauriosoft.server.models.entities;

import com.sauriosoft.server.models.dtos.UserDTO;
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
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_username", nullable = false, unique = true)
    private String username;

    @Column(name = "user_password", nullable = false)
    private String password;

    public static UserEntity from(UserDTO userDTO) {
        return UserEntity.builder().username(userDTO.getUsername())
                .password(userDTO.getPassword()).build();
    }

}
