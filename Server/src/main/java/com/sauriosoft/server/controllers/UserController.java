package com.sauriosoft.server.controllers;

import com.sauriosoft.server.models.dtos.UserDTO;
import com.sauriosoft.server.models.entities.User;
import com.sauriosoft.server.models.exceptions.UserException;
import com.sauriosoft.server.models.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/users/")
public class UserController {

    @Autowired
    private UserService userService;

    @Operation(summary = "Get all users", responses = {
            @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Empty", responseCode = "204"),
            @ApiResponse(description = "Server error", responseCode = "503")
    })
    @GetMapping()
    public ResponseEntity<?> getAll() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<User> userList = userService.getAll();
            if (userList.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            } else {
                List<UserDTO> userDTOS = userList.stream().map(UserDTO::from).collect(Collectors.toList());
                response.put("response", userDTOS);
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } catch (Exception ex) {
            response.put("error", "Error en el servidor");
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Operation(summary = "Get one User by Id", responses = {
            @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server Error", responseCode = "503"),
            @ApiResponse(description = "User not found", responseCode = "500")
    })
    @GetMapping("{id}")
    public ResponseEntity<?> getById(@PathVariable(name = "id") final Long idUser) {
        Map<String, Object> response = new HashMap<>();
        try {
            User user = userService.getById(idUser);
            response.put("response", UserDTO.from(user));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (UserException ex) {
            response.put("error", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            response.put("error", "Error en el servidor");
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Operation(summary = "Save one User", responses = {
            @ApiResponse(description = "Successfully created", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server error", responseCode = "503"),
            @ApiResponse(description = "Body with Id", responseCode = "500")
    })
    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody final UserDTO userDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            if (Objects.isNull(userDTO.getId())) {
                User user = User.from(userDTO);
                user = userService.create(user);
                response.put("response", UserDTO.from(user));
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            }
            response.put("error", "Contacto con ID");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);

        } catch (Exception ex) {
            response.put("error", "Error en el servidor");
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }

    }

    @Operation(summary = "Update one User", responses = {
            @ApiResponse(description = "Successfully updated", responseCode = "201", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server error", responseCode = "503"),
            @ApiResponse(description = "User not found", responseCode = "500")
    })
    @PutMapping("{id}")
    public ResponseEntity<?> updateUser(@PathVariable(name = "id") final Long idUser,
                                        @RequestBody final UserDTO userDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            User userToUpdate = User.from(userDTO);
            UserDTO userDTOFromUpdate = UserDTO.from(userService.update(userToUpdate, idUser));
            response.put("response", userDTOFromUpdate);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (UserException ex) {
            response.put("error", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            response.put("error", "Error en el servidor");
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Operation(summary = "Delete one Contact", responses = {
            @ApiResponse(description = "Successfully delete", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Server error", responseCode = "503"),
            @ApiResponse(description = "User not found", responseCode = "500")
    })
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(name = "id") final Long idUser) {
        Map<String, Object> response = new HashMap<>();
        try {
            userService.delete(idUser);
            response.put("response", "Usuario eliminado");
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (UserException ex) {
            response.put("error", ex.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            response.put("error", "Error en el servidor");
            return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }


}
