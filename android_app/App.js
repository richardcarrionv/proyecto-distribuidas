import {extendTheme, NativeBaseProvider} from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/views/main';

export default function App() {

  const theme = extendTheme({
    components: { 
      Button: { 
        baseStyle: { 
        }, 
        defaultProps: { 
          colorScheme: "red"
        }
      }
    }
  })
  return (
    <NativeBaseProvider theme={theme}>
      <Main />
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

