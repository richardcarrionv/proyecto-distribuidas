package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.UserEntity;
import com.sauriosoft.server.models.exceptions.UserException;
import com.sauriosoft.server.models.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }

    @Override
    public UserEntity getById(Long idUser) {
        return userRepository.findById(idUser).orElseThrow(() ->
                new UserException("User not found by id: ".concat(idUser.toString()))
        );
    }

    @Override
    public UserEntity addUser(UserEntity userEntity) {
        return userRepository.save(userEntity);
    }

    @Override
    public UserEntity updateUser(UserEntity userEntity, Long idUser) {
        UserEntity userToUpdate = getById(idUser);
        userToUpdate.setUsername(userEntity.getUsername());
        userToUpdate.setPassword(userEntity.getPassword());
        return userRepository.save(userToUpdate);
    }

    @Override
    public void deleteUser(Long idUser) {
        UserEntity userToDelete = getById(idUser);
        userRepository.delete(userToDelete);
    }
}
