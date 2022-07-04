package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.UserEntity;


import java.util.List;

public interface IUserService {

    List<UserEntity> getAll();

    UserEntity getById(Long idUser);

    UserEntity addUser(UserEntity userEntity);

    UserEntity updateUser(UserEntity userEntity, Long idUser);

    void deleteUser(Long idUser);
}
