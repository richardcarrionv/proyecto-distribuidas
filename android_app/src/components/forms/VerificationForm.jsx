import { Box, Button, HStack, Input, useToast, WarningIcon } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Image, Keyboard } from "react-native";
import { UserContext } from "../../../App";
import api from "../../api/api";
import Dialog from "../Dialog";

const VerificationForm = () => {
  const [display, setDisplay] = useState(false);
  const [branch, setBranch] = useState(null);
  const [code, setCode] = useState();
  const toast = useToast()
  const random = () => { 
    return Math.floor(1000 + Math.random() * 9000)
  }
  const [randomCode, setRandomCode] = useState(random());
  const user = useContext(UserContext);

  useEffect(() => { 
    setRandomCode(random());
  }, [display])

  const handleAlarm = () => {
    console.log(code);
  };

  const handleCodeChange = (code) => setCode(code);

  const handleVerify = () => {
    if (code == randomCode) {
      api
        .get(`/igniters/${user.id}`)
        .then((res) => {
          console.log(res);
          setBranch(res.data.branch);
          setDisplay(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }else{ 
      showToast("red.200", "No coinciden los codigos")
    }
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
    <>
      <Text style={styles.title}>Ingrese el siguiente codigo: </Text>
      <Text style={styles.code}>{randomCode}</Text>
      <Input
        onChangeText={handleCodeChange}
        style={styles.input}
        placeholder="Ej: 123456"
        keyboardType="numeric"
        size="2xl"
        variant="rounded"
        mx="3"
        w="75%"
      />
      <Button style={styles.button} onPress={handleVerify}>
        Verificar
      </Button>
      <Dialog
        branch={branch}
        display={display}
        onClose={() => setDisplay(false)}
      />
    </>
  );
};

export default VerificationForm;

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontSize: 20,
  },
  code: {
    fontSize: 40,
    margin: 5,
  },
  input: {
    width: 300,
    backgroundColor: "white",
  },
  inputText: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 20,
    width: 290,
    borderColor: "#b3b3b3",
  },

  button: {
    fontSize: 22,
    borderRadius: 50,
    backgroundColor: "#f75151",
    marginTop: 20,
    width: 300,
    height: 50,
  },
});
