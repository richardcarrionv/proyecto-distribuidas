import { extendTheme, NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import Main from "./src/views/main";
import Pushy from "pushy-react-native";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    Pushy.listen();
    // Register the user for push notifications
    Pushy.register()
      .then(async (deviceToken) => {
        // Display an alert with device token
        alert("Pushy device token: " + deviceToken);

        // Send the token to your backend server via an HTTP GET request
        //await fetch('https://your.api.hostname/register/device?token=' + deviceToken);

        // Succeeded, optionally do something to alert the user
      })
      .catch((err) => {
        // Handle registration errors
        console.error(err);
      });
    Pushy.toggleInAppBanner(true);

    Pushy.setNotificationListener(async (data) => {
      // Print notification payload data
      console.log("Received notification: " + JSON.stringify(data));

      // Notification title
      let notificationTitle = "MyApp";

      // Attempt to extract the "message" property from the payload: {"message":"Hello World!"}
      let notificationText = data.message || "Test notification";

      // Android: Displays a system notification
      // iOS: Displays an alert dialog
      Pushy.notify(notificationTitle, notificationText, data);

      // Clear iOS badge count
      Pushy.setBadge(0);
    });
    Pushy.setNotificationClickListener(async (data) => {
      // Display basic alert
      alert("Notification click: " + data.message);

      // Navigate the user to another page or
      // execute other logic on notification click
    });
    Pushy.isRegistered().then((isRegistered) => {
      if (isRegistered) {
        // Subscribe the user to a topic
        Pushy.subscribe("news")
          .then(() => {
            // Subscribe successful
            alert("Subscribed to topic successfully");
          })
          .catch((err) => {
            // Handle errors
            console.error(err);
          });
      }
    });
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
