import { extendTheme, NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import Pushy from "pushy-react-native";
import { createContext, useEffect, useState } from "react";
import pushySetup from "./pushy";
import Main from "./src/screens/Main";

export const UserContext = createContext({
  id: null,
  setId: () => {  }
});

export default function App() {

  const [id, setId] = useState(null);

  useEffect(() => {
    pushySetup();
  }, []);

  const theme = extendTheme({
    components: {
      Button: {
        baseStyle: {},
        defaultProps: {
          colorScheme: "red",
        },
      },
    },
  });

  return (
    <UserContext.Provider
      value={{id, setId}}
    >
      <NativeBaseProvider theme={theme}>
        <Main />
      </NativeBaseProvider>
    </UserContext.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
