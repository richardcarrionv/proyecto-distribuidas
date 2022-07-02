import React, { useState } from "react";
import {
  Box,
  Button,
  CheckCircleIcon,
  HStack,
  Input,
  Modal,
  useToast,
} from "native-base";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";

const Dialog = ({ display, onClose, code = 123456 }) => {
  const toast = useToast();

  const handleAlarmSend = () => {
    console.log("POST code, ubication, cellphone");
    var color = "emerald.200";
    var message = "¡Se ha enviado tu alarma satisfactoriamente!";
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
              <CheckCircleIcon size="5" color="black" />
              <Text>
              {message}
              </Text>
            </HStack>
          </Box>
        );
      },
    });
    onClose();
  };

  return (
    <Modal isOpen={display} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton></Modal.CloseButton>
        <Modal.Header>Alarma</Modal.Header>
        <Modal.Body>
          <Text>¡Pulse el boton para enviar una alarma!</Text>
          <Text>{code}</Text>
          <Button onPress={handleAlarmSend}>Enviar</Button>
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
