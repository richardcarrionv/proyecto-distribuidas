# Panic Button System for Stores

This project is a Panic Button System designed to provide a safety mechanism for stores. The system consists of a desktop client developed with Electron and React, a mobile client, and a backend REST API developed with Spring Boot. The system allows an admin user to add stores, locate them on a Google Maps component, and assign a user to each store. The store owners can then log in using the assigned user credentials and trigger a panic alert to notify all other users, including the admin, through push notifications.

## Features

- Admin User:
  - Add stores to the system
  - Assign users to each store
  - Locate stores on a Google Maps component
  - Receive panic alerts from stores and locate them in the Google Maps component

- Store Owners:
  - Log in using assigned user credentials
  - Trigger panic alerts
  - Receive panic alerts from other stores

- Push Notifications:
  - Integrated push notification service for real-time alerts

## Installation and Setup

### Backend (Spring Boot)

1. Clone this repository to your local machine.
2. Open the backend project in an IDE (such as IntelliJ IDEA or Eclipse).
3. Configure the necessary database settings in `src/main/resources/application.properties`.
4. Build and run the Spring Boot application.

### Desktop Client (Electron with React)

1. Navigate to the `desktop-client` directory.
2. Install the required dependencies by running the following command:
   ```
   npm install
   ```
3. Configure the backend API endpoint in `src/config.js`.
4. Build the desktop client using the following command:
   ```
   npm run build
   ```
5. The built desktop client executable file will be generated in the `dist` directory.

### Mobile Client (React Native)

1. Set up the mobile client development environment according to the requirements of the React Native framework.
2. Configure the backend API endpoint in the mobile client code.
3. Build and run the mobile client on a device or emulator.

## Usage

1. Start the backend server and ensure it is running successfully.
2. Launch the desktop client application.
3. As an admin user, add stores, assign users, and locate them on the map.
4. Store owners can then log in using their assigned user credentials in the desktop client.
5. Store owners can trigger panic alerts when needed.
6. All users, including the admin, will receive push notifications with panic alerts in real-time.

## Technologies Used

The Panic Button System for Stores is developed using the following technologies:

- Electron: A framework for building cross-platform desktop applications using web technologies.
- React: A JavaScript library for building user interfaces.
- Spring Boot: A framework for creating Java-based applications.
- Google Maps API: An API for integrating maps into applications.
- Pushy: A service for sending real-time push notifications to clients.
