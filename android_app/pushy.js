import Pushy from "pushy-react-native";

const pushySetup = () => {
  Pushy.listen();
  // Register the user for push notifications
  Pushy.register()
    .then(async (deviceToken) => {
      // Display an console.log with device token
      console.log("Pushy device token: " + deviceToken);

      // Send the token to your backend server via an HTTP GET request
      //await fetch('https://your.api.hostname/register/device?token=' + deviceToken);

      // Succeeded, optionally do something to console.log the user
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
    // iOS: Displays an console.log dialog
    Pushy.notify(notificationTitle, notificationText, data);

    // Clear iOS badge count
    Pushy.setBadge(0);
  });
  Pushy.setNotificationClickListener(async (data) => {
    // Display basic console.log
    console.log("Notification click: " + data.message);

    // Navigate the user to another page or
    // execute other logic on notification click
  });
  Pushy.isRegistered().then((isRegistered) => {
    if (isRegistered) {
      // Subscribe the user to a topic
      Pushy.subscribe("news")
        .then(() => {
          // Subscribe successful
          console.log("Subscribed to topic successfully");
        })
        .catch((err) => {
          // Handle errors
          console.error(err);
        });
    }
  });
};

export default pushySetup;
