package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.User;
import com.sauriosoft.server.models.exceptions.UserException;
import com.sauriosoft.server.models.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User getById(Long idUser) {
        return userRepository.findById(idUser).orElseThrow(() ->
                new UserException("User not found by id: ".concat(idUser.toString()))
        );
    }

    @Override
    public User create(User user) {
        return userRepository.save(user);
    }

    @Override
    public User update(User user, Long idUser) {
        User userToUpdate = getById(idUser);
        userToUpdate.setUsername(user.getUsername());
        userToUpdate.setPassword(user.getPassword());
        return userRepository.save(userToUpdate);
    }

    @Override
    public void delete(Long idUser) {
        User userToDelete = getById(idUser);
        userRepository.delete(userToDelete);
    }

    @Override
    public User exists(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }
}
