import { Box, Button, CheckCircleIcon, HStack, Icon, Input, Stack, useToast, WarningIcon } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Keyboard, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Dialog from "../components/Dialog";
import { MaterialIcons } from "@expo/vector-icons";
import { UserContext } from "../../App";
import api from "../api/api";

const Login = () => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [ci, setCi] = useState(null);
  const [password, setPassword] = useState(null);

  const user = useContext(UserContext);

  const handleLogin = () => {
    const url = `/igniters/${ci}/${password}`;
    console.log(url);
    api
      .get(url)
      .then((res) => { 
        user.setId(res.data.id);
        showToast("green.200", "Inicio de sesion exitoso");
      })
      .catch((err) => {
        showToast("red.200", "Cedula o contraseña incorrectas");
      });
    console.log(ci);
    console.log(password);
    Keyboard.dismiss();
  };

  const showToast = (color, message) => {
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
              <WarningIcon size="5" color="black" />
              <Text>{message}</Text>
            </HStack>
          </Box>
        );
      },
    });
  };

  return (
    <SafeAreaView>
      <Text style={styles.title}>Inicie Sesión</Text>
      <Stack space={4} w="100%" alignItems="center">
        <Input
          onChangeText={(ci) => setCi(ci)}
          keyboardType="numeric"
          w={{ base: "75%", md: "25%" }}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="person" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Cedula"
        />
        <Input
          w={{ base: "75%", md: "25%" }}
          onChangeText={(password) => setPassword(password)}
          type={show ? "text" : "password"}
          InputRightElement={
            <Icon
              as={
                <MaterialIcons name={show ? "visibility" : "visibility-off"} />
              }
              size={5}
              mr="2"
              color="muted.400"
              onPress={() => setShow(!show)}
            />
          }
          placeholder="Contraseña"
        />
      </Stack>
      <Button onPress={handleLogin} style={styles.buttonLogin}>
        Iniciar Sesión
      </Button>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 20,
  },
  buttonLogin: {
    marginTop: 30,
  },
});
