import { Button, Input } from "native-base";
import React from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";

const Logo = () => {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/emergency-share.png")}
          style={styles.image}
        ></Image>
        <Text>One Alarm</Text>
      </View>
    </>
  );
};

 export default Logo;

const styles = StyleSheet.create({
  image: {
    height: 70,
    width: 70,
  },
  imageContainer: {
    width: 140,
    height: 140,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -340,
    padding: 20,
    backgroundColor: "white",
    borderStyle: "solid",
    borderRadius: 100,
    borderStyle: "solid",
    borderColor: "#dfdfdf",
    borderWidth: 3,
    position: "relative",
  },
});
