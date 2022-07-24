import { Button, Input } from "native-base";
import React from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import VerificationForm from "../components/forms/VerificationForm";
import Logo from "../components/logo";

const Alarm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}></View>
      <View style={styles.mainBody}>
        <Logo />
        <View style={styles.mainForm}>
          <VerificationForm />
        </View>
      </View>
    </View>
  );
};

export default Alarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainHeader: {
    backgroundColor: "#f75151",
    width: "100%",
    height: "40%",
  },
  mainBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  mainForm: {
    alignItems: "center",
    justifyContent: "center",
  },
  
});
