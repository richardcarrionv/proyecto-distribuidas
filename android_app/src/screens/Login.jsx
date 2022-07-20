import { Button, Icon, Input, Stack } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Dialog from "../components/Dialog";
import { MaterialIcons } from "@expo/vector-icons";
import { UserContext } from "../../App";
import api from "../api/api";

const Login = () => {
  const [show, setShow] = useState(false);
  const [ci, setCi] = useState(null)
  const [password, setPassword] = useState(null)

  const user = useContext(UserContext);

  const handleLogin = () => {
    const url = `/igniters/${ci}/${password}`
    console.log(url)
    api.get(url).then(res => console.log(res))
    console.log(ci)
    console.log(password)
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
