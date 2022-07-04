package com.sauriosoft.server.models.dtos;

import com.sauriosoft.server.models.entities.UserEntity;
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

    public static UserDTO from(UserEntity userEntity) {
        return UserDTO.builder().id(userEntity.getId())
                .username(userEntity.getUsername())
                .password(userEntity.getPassword())
                .build();
    }

}
