// // import { StatusBar } from 'expo-status-bar';
// // import { Alert, StyleSheet } from 'react-native';
// // import React, { useState, useEffect } from 'react';
// // import * as Font from 'expo-font';
// // import { Asset } from 'expo-asset';
// // import * as Notifications from 'expo-notifications';
// // import { GestureHandlerRootView } from 'react-native-gesture-handler';
// // import { NavigationContainer } from '@react-navigation/native';
// // import LoadingScreen from './src/screens/Loading/LoadingScreen';
// // import Router from './src/navigation/Router';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View, Alert } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import * as Notifications from 'expo-notifications';
// import { Asset } from 'expo-asset';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import LoadingScreen from './src/screens/Loading/LoadingScreen';
// import Router from './src/navigation/Router';




// export default function App() {
//   const [isLoading, setIsLoading] = useState(true);

//   const loadAssets = async () => {
//     try {
//       const imageAssets = [
//         require('./assets/images/welcome.png'),
//         require('./assets/images/logo.png'),
//       ];

//       const loadImages = imageAssets.map((image) => {
//         return Asset.fromModule(image).downloadAsync();
//       });

//       await Promise.all(loadImages);
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       setIsLoading(false);
//     } catch (error) {
//       console.warn('Yükleme sırasında hata:', error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAssets();
//   }, []);

//   if (isLoading) {
//     return (
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <LoadingScreen />
//         <StatusBar style="auto" />
//       </GestureHandlerRootView>
//     );
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <NavigationContainer>
//         <Router />
//         <StatusBar style="auto" />
//       </NavigationContainer>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Asset } from 'expo-asset';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from './src/screens/Loading/LoadingScreen';
import Router from './src/navigation/Router';

const appointment = {
  id: 1,
  doctor: "Dr. Smith",
  date: "2025-03-25", // YYYY-MM-DD
  time: "12:11:00",   // HH:MM:SS (24-hour)
};
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
// Function to Schedule Notification
const scheduleNotification = async (currentTime: Date, appointmentTime: Date) => {
  const notificationTime = new Date(appointmentTime.getTime() - 60 * 60 * 1000); // 1 hour before

  if (notificationTime > currentTime) {
    const secondsUntilNotification = Math.floor((notificationTime.getTime() - currentTime.getTime()) / 1000);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Upcoming Appointment ⏰",
        body: `Your appointment with ${appointment.doctor} is at ${appointmentTime.toLocaleTimeString()}`,
        sound: "default",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        // seconds: secondsUntilNotification,
        seconds : secondsUntilNotification,
        repeats: false, // One-time notification
      },
    });

    Alert.alert("Notification Scheduled", `Set for: ${notificationTime.toLocaleString()}`);
  } else if (appointmentTime > currentTime && currentTime >= notificationTime) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Upcoming Appointment ⏰",
        body: `Your appointment with ${appointment.doctor} is at ${appointmentTime.toLocaleTimeString()}`,
        sound: "default",
      },
      trigger: null, // Immediate
    });

    Alert.alert("Notification", "Fired immediately");
  }
};

// Request Notification Permissions
const requestPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== "granted") {
      Alert.alert("Permission Denied", "Notifications are required for appointment reminders.");
      return false;
    }
  }
  return true;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const loadAssets = async () => {
    try {
      const imageAssets = [
        require('./assets/images/welcome.png'),
        require('./assets/images/logo.png'),
      ];

      const loadImages = imageAssets.map((image) => Asset.fromModule(image).downloadAsync());
      await Promise.all(loadImages);
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      Alert.alert("Error", "Failed to load assets: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupNotifications = async () => {
    const hasPermission = await requestPermissions();
    if (hasPermission) {
      const appointmentTime = new Date(`${appointment.date}T${appointment.time}`);
      const currentTime = new Date();
      await scheduleNotification(currentTime, appointmentTime);
    }
  };

  useEffect(() => {
    loadAssets();
    setupNotifications();
  }, []);

  if (isLoading) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LoadingScreen />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Router />
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});