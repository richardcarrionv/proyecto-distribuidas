import { Button, Input } from "native-base";
import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import VerificationForm from "../components/forms/VerificationForm";
import Logo from "../components/logo";
import Alarm from "./Alarm";
import * as Keychain from "react-native-keychain";
import Login from "./Login";
import { UserContext } from "../../App";

const Main = () => {
  const user = useContext(UserContext);
  if (user.id) {
    return (
      <SafeAreaView style={styles.container}>
        <Alarm />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Login />
    </SafeAreaView>
  );
};

export default Main;

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
