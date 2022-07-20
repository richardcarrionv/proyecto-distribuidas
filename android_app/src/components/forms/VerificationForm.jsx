import { Button, Input } from "native-base";
import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import {UserContext} from "../../../App";
import Dialog from "../Dialog";


const VerificationForm = () => {
  const [display, setDisplay] = useState(false);
  const [code, setCode] = useState();
  const user = useContext(UserContext)

  const handleAlarm = () => {
    console.log(code);
  };

  const handleCodeChange = (code) => setCode(code);

  const handleVerify = () => { 
    setDisplay(true)
    console.log(user)
  }

  return (
    <>
      <Text style={styles.title}>Código de Sucursal</Text>
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
      <Dialog code={code} display={display} onClose={() => setDisplay(false)} />
    </>
  );
};

export default VerificationForm;

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 20,
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
