package com.sauriosoft.server.controllers;

import com.sauriosoft.server.models.dtos.UserDTO;
import com.sauriosoft.server.models.entities.User;
import com.sauriosoft.server.models.exceptions.UserException;
import com.sauriosoft.server.models.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping()
    public ResponseEntity<List<UserDTO>> getAll() {
        List<User> userList = userService.getAll();
        if (userList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<UserDTO> userDTOS = userList
                .stream()
                .map(UserDTO::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDTOS);

    }

    @GetMapping("/{username}/{pwd}")
    public ResponseEntity<UserDTO> exists(@PathVariable(name = "username") final String username,
                                          @PathVariable(name = "pwd") final String password ){
        User user = userService.exists(username, password);
        UserDTO userDTO = UserDTO.from(user);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable(name = "id") final Long idUser) {
        User user = userService.getById(idUser);
        return ResponseEntity.ok(UserDTO.from(user));
    }

    @PostMapping
    public ResponseEntity<UserDTO> addUser(@RequestBody final UserDTO userDTO) {
        if (!Objects.isNull(userDTO.getId())) {
            throw new UserException("Ya existe un usuario con el id: ".concat(userDTO.getId().toString()));
        }
        User user = User.from(userDTO);
        user = userService.create(user);
        return ResponseEntity.ok(UserDTO.from(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable(name = "id") final Long idUser,
                                              @RequestBody final UserDTO userDTO) {
        User userToUpdate = User.from(userDTO);
        UserDTO userDTOFromUpdate = UserDTO.from(userService.update(userToUpdate, idUser));
        return ResponseEntity.ok(userDTOFromUpdate);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable(name = "id") final Long idUser) {
        userService.delete(idUser);
        return ResponseEntity.ok("Registro eliminado correctamente");
    }
}
