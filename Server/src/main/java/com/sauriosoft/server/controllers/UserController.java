package com.sauriosoft.server.controllers;

import com.sauriosoft.server.models.dtos.UserDTO;
import com.sauriosoft.server.models.entities.UserEntity;
import com.sauriosoft.server.models.exceptions.UserException;
import com.sauriosoft.server.models.services.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/users/")
public class UserController {

    @Autowired
    private IUserService userService;

    @Operation(summary = "Get all users", responses = {
            @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(mediaType = "application/json"), useReturnTypeSchema = true),
            @ApiResponse(description = "Empty", responseCode = "204"),
            @ApiResponse(description = "Server error", responseCode = "503")
    })
    @GetMapping()
    public ResponseEntity<?> getAll() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<UserEntity> userEntityList = userService.getAll();
            if (userEntityList.isEmpty()) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            } else {
                List<UserDTO> userDTOS = userEntityList.stream().map(UserDTO::from).collect(Collectors.toList());
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
            UserEntity userEntity = userService.getById(idUser);
            response.put("response", UserDTO.from(userEntity));
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
