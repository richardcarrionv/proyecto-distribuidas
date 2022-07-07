package com.sauriosoft.server.models.dtos;

import com.sauriosoft.server.models.entities.User;
import com.sauriosoft.server.models.util.Role;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;

    private String username;

    private String password;

    private Role role;

    public static UserDTO from(User user) {
        return UserDTO.builder().id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .role(user.getRole())
                .build();
    }

}
