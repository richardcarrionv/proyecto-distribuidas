package com.sauriosoft.server.models.services;

import com.sauriosoft.server.models.entities.User;


import java.util.List;

public interface UserService {

    List<User> getAll();

    User getById(Long idUser);

    User create(User user);

    User update(User user, Long idUser);

    void delete(Long idUser);

    User exists(String username, String password);
}
