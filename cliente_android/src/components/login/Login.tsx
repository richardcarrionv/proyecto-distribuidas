import React from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import { Icon, Input } from "@rneui/themed";
import { Button } from "@rneui/base";

const Login = () => {
	return (
		<View style={styles.container}>
			<View style={styles.loginHeader}></View>
			<View style={styles.loginBody}>
				<View style={styles.imageContainer}>
					<Image
						source={require("../../../assets/logo.png")}
						style={styles.image}
					></Image>
				</View>
				<View style={styles.loginForm}>
					<Text style={styles.title}>Código de Sucursal</Text>
					<Input
						placeholder="Ingrese un código"
						leftIcon={{ type: "font-awesome", name: "building" }}
						containerStyle={styles.input}
						inputContainerStyle={styles.inputText}
					/>
					<Button buttonStyle={styles.button}>Iniciar Sesión</Button>
				</View>
			</View>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	loginHeader: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#f75151",
		width: "100%",
		height: "40%",
	},
	loginBody: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	image: {
		height: 150,
		width: 150,
	},
	imageContainer: {
		marginTop: -325,
		backgroundColor: "white",
		borderStyle: "solid",
		borderRadius: 100,
		position: "relative",
	},
	loginForm: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 25,
	},
	title: {
		margin: 20,
	},
	input: {
		width: 300,
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
		borderRadius: 50,
		backgroundColor: "#f75151",
		width: 300,
		height: 50,
	},
});
