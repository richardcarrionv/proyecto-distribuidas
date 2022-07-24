import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  CheckCircleIcon,
  HStack,
  Input,
  Modal,
  useToast,
  WarningIcon,
} from "native-base";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import api from "../api/api";
import { UserContext } from "../../App";

const Dialog = ({ branch, display, onClose, code = 123456 }) => {
  const toast = useToast();
  const user = useContext(UserContext);

  const handleAlarmSend = () => {
    api
      .post("/alarms", {
        igniterId: user.id,
        date: Date.now(),
      })
      .then((res) => {
        if (res.status === 200) {
          var color = "emerald.200";
          var message = "¡Se ha enviado tu alarma satisfactoriamente!";
          showToast(color, message, <CheckCircleIcon />);
        }
      })
      .catch((error) => {
        var color = "red.200";
        var message = "No se pudo enviar tu alarma";
        showToast(color, message, <WarningIcon />);
      });

    onClose();
  };

  const showToast = (color, message, icon) => {
    toast.show({
      render: () => {
        return (
          <Box
            bg={color}
            px="2"
            py="2"
            rounded="sm"
            mb={5}
            style={styles.toast}
          >
            <HStack space={2} flexShrink={1} alignItems="center">
              {icon}
              <Text>{message}</Text>
            </HStack>
          </Box>
        );
      },
    });
  };

  if (branch) {
    return (
      <Modal isOpen={display} onClose={onClose}>
        <Modal.Content>
          <Modal.CloseButton></Modal.CloseButton>
          <Modal.Header>Alarma</Modal.Header>
          <Modal.Body>
            <Text>¡Pulse el boton para enviar una alarma!</Text>
            <Text>Sucursal: </Text>
            <Text>{branch.name}</Text>
            <Text>{branch.province}</Text>
            <Text>{branch.city}</Text>
            <Text>{branch.address}</Text>
            <Button onPress={handleAlarmSend}>Enviar</Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    );
  }

  return (
    <Modal isOpen={display} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton></Modal.CloseButton>
        <Modal.Header>Alarma</Modal.Header>
        <Modal.Body>
          <Text>Ocurrio un error</Text>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  toast: {
    display: "flex",
  },
});
