// // // import { StatusBar } from 'expo-status-bar';
// // // import { Alert, StyleSheet } from 'react-native';
// // // import React, { useState, useEffect } from 'react';
// // // import * as Font from 'expo-font';
// // // import { Asset } from 'expo-asset';
// // // import * as Notifications from 'expo-notifications';
// // // import { GestureHandlerRootView } from 'react-native-gesture-handler';
// // // import { NavigationContainer } from '@react-navigation/native';
// // // import LoadingScreen from './src/screens/Loading/LoadingScreen';
// // // import Router from './src/navigation/Router';
// // import { StatusBar } from 'expo-status-bar';
// // import { StyleSheet, View, Alert } from 'react-native';
// // import React, { useState, useEffect } from 'react';
// // import * as Notifications from 'expo-notifications';
// // import { Asset } from 'expo-asset';
// // import { GestureHandlerRootView } from 'react-native-gesture-handler';
// // import { NavigationContainer } from '@react-navigation/native';
// // import LoadingScreen from './src/screens/Loading/LoadingScreen';
// // import Router from './src/navigation/Router';




// // export default function App() {
// //   const [isLoading, setIsLoading] = useState(true);

// //   const loadAssets = async () => {
// //     try {
// //       const imageAssets = [
// //         require('./assets/images/welcome.png'),
// //         require('./assets/images/logo.png'),
// //       ];

// //       const loadImages = imageAssets.map((image) => {
// //         return Asset.fromModule(image).downloadAsync();
// //       });

// //       await Promise.all(loadImages);
// //       await new Promise(resolve => setTimeout(resolve, 2000));
// //       setIsLoading(false);
// //     } catch (error) {
// //       console.warn('Yükleme sırasında hata:', error);
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadAssets();
// //   }, []);

// //   if (isLoading) {
// //     return (
// //       <GestureHandlerRootView style={{ flex: 1 }}>
// //         <LoadingScreen />
// //         <StatusBar style="auto" />
// //       </GestureHandlerRootView>
// //     );
// //   }

// //   return (
// //     <GestureHandlerRootView style={{ flex: 1 }}>
// //       <NavigationContainer>
// //         <Router />
// //         <StatusBar style="auto" />
// //       </NavigationContainer>
// //     </GestureHandlerRootView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });


// // import { StatusBar } from 'expo-status-bar';
// // import { StyleSheet, View, Alert } from 'react-native';
// // import React, { useState, useEffect } from 'react';
// // import * as Notifications from 'expo-notifications';
// // import { Asset } from 'expo-asset';
// // import { GestureHandlerRootView } from 'react-native-gesture-handler';
// // import { NavigationContainer } from '@react-navigation/native';
// // import LoadingScreen from './src/screens/Loading/LoadingScreen';
// // import Router from './src/navigation/Router';
// // import { useAuthStore } from './src/store/useAuthStore';
// // import { API_HOME } from './src/screens/auth/config';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { jwtDecode } from 'jwt-decode';

// // const appointment = {
// //   id: 1,
// //   doctor: "Dr. Smith",
// //   date: "2025-03-25", // YYYY-MM-DD
// //   time: "12:11:00",   // HH:MM:SS (24-hour)
// // };

// // interface JwtPayload {
// //   healthCardNumber: string;
// // }

// // // Define appointment structure from backend
// // interface Appointment {
// //   id: number;
// //   time: string; // "HH:MM:SS"
// //   doctor: string;
// //   booked: boolean;
// //   date: string; // "YYYY-MM-DD"
// //   clinic_name: string;
// //   healthCardNumber: string | null;
// // }

// // Notifications.setNotificationHandler({
// //   handleNotification: async () => ({
// //     shouldShowAlert: true,
// //     shouldPlaySound: true,
// //     shouldSetBadge: false,
// //   }),
// // });
// // // Function to Schedule Notification
// // const scheduleNotification = async (currentTime: Date, appointment: Appointment) => {
// //   const appointmentTime = new Date(`${appointment.date}T${appointment.time}`);
// //   const notificationTime = new Date(appointmentTime.getTime() - 60 * 60 * 1000); // 1 hour before

// //   if (notificationTime > currentTime) {
// //     const secondsUntilNotification = Math.floor((notificationTime.getTime() - currentTime.getTime()) / 1000);

// //     await Notifications.scheduleNotificationAsync({
// //       content: {
// //         title: "Upcoming Appointment ⏰",
// //         body: `Your appointment with ${appointment.doctor} at ${appointment.clinic_name} is at ${appointmentTime.toLocaleTimeString()}`,
// //         sound: "default",
// //       },
// //       trigger: {
// //         type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
// //         seconds: secondsUntilNotification,
// //         repeats: false,
// //       },
// //     });

// //     Alert.alert("Notification Scheduled", `Set for: ${notificationTime.toLocaleString()}`);
// //   } else if (appointmentTime > currentTime && currentTime >= notificationTime) {
// //     await Notifications.scheduleNotificationAsync({
// //       content: {
// //         title: "Upcoming Appointment ⏰",
// //         body: `Your appointment with ${appointment.doctor} at ${appointment.clinic_name} is at ${appointmentTime.toLocaleTimeString()}`,
// //         sound: "default",
// //       },
// //       trigger: null, // Immediate
// //     });

// //     Alert.alert("Notification", "Fired immediately");
// //   }
// // };
// // // Request Notification Permissions
// // const requestPermissions = async () => {
// //   const { status } = await Notifications.getPermissionsAsync();
// //   if (status !== "granted") {
// //     const { status: newStatus } = await Notifications.requestPermissionsAsync();
// //     if (newStatus !== "granted") {
// //       Alert.alert("Permission Denied", "Notifications are required for appointment reminders.");
// //       return false;
// //     }
// //   }
// //   return true;
// // };
// // const fetchAppointments = async (): Promise<Appointment[]> => {
// //   try {
// //     const response = await fetch(`${API_HOME}/api/appointments/`, {
// //       method: 'GET', // Adjust if your API requires POST or auth headers
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     });
// //     if (!response.ok) throw new Error('Failed to fetch appointments');
// //     const data = await response.json();
// //     console.log('Fetched Appointments:', data);
// //     return data; // Expecting array of appointments
// //   } catch (error) {
// //     console.error('Error fetching appointments:', error);
// //     return [];
// //   }
// // };
// // export default function App() {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const { isAuthenticated, initializeAuth,token } = useAuthStore();

// //   const loadAssets = async () => {
// //     try {
// //       const imageAssets = [
// //         require('./assets/images/welcome.png'),
// //         require('./assets/images/logo.png'),
// //       ];

// //       const loadImages = imageAssets.map((image) => Asset.fromModule(image).downloadAsync());
// //       await Promise.all(loadImages);
// //       await new Promise(resolve => setTimeout(resolve, 2000));
// //     } catch (error) {
// //       Alert.alert("Error", "Failed to load assets: " + error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const setupNotifications = async (healthCardNumber: string) => {
// //     if (!isAuthenticated) return;

// //     const hasPermission = await requestPermissions();
// //     if (hasPermission) {
// //       const appointments = await fetchAppointments();
// //       const userAppointments = appointments.filter(
// //         (appt) => appt.healthCardNumber === healthCardNumber
// //       );
// //       console.log('Filtered User Appointments:', userAppointments);

// //       const currentTime = new Date();
// //       for (const appointment of userAppointments) {
// //         await scheduleNotification(currentTime, appointment);
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     const initializeApp = async () => {
// //       await initializeAuth(); // Ensure authentication completes before proceeding
// //       let healthCardNumber = '';
// //       try {
// //         const storedToken = token || (await AsyncStorage.getItem('jwt_token'));
// //         if (storedToken) {
// //           const decoded = jwtDecode<JwtPayload>(storedToken);
// //           healthCardNumber = decoded.healthCardNumber;
// //           console.log('Decoded HealthCardNumber:', healthCardNumber);
// //         }
// //       } catch (error) {
// //         console.error('Failed to decode token:', error);
// //       }

// //       await loadAssets();
// //       if (healthCardNumber) {
// //         await setupNotifications(healthCardNumber);
// //       }
// //     };
// //       await loadAssets();
// //       await setupNotifications();
// //     };
  
// //     initializeApp();
// //   }, [isAuthenticated]);

// //   if (isLoading) {
// //     return (
// //       <GestureHandlerRootView style={{ flex: 1 }}>
// //         <LoadingScreen />
// //         <StatusBar style="auto" />
// //       </GestureHandlerRootView>
// //     );
// //   }

// //   return (
// //     <GestureHandlerRootView style={{ flex: 1 }}>
// //       <NavigationContainer>
// //         <Router />
// //         <StatusBar style="auto" />
// //       </NavigationContainer>
// //     </GestureHandlerRootView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });

// // import { StatusBar } from 'expo-status-bar';
// // import { StyleSheet, View, Alert } from 'react-native';
// // import React, { useState, useEffect } from 'react';
// // import * as Notifications from 'expo-notifications';
// // import { Asset } from 'expo-asset';
// // import { GestureHandlerRootView } from 'react-native-gesture-handler';
// // import { NavigationContainer } from '@react-navigation/native';
// // import LoadingScreen from './src/screens/Loading/LoadingScreen';
// // import Router from './src/navigation/Router';
// // import { useAuthStore } from './src/store/useAuthStore';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { jwtDecode } from 'jwt-decode'; // Add this for decoding token
// // import { API_HOME } from './src/screens/auth/config'; // Adjust path to your API config

// // // Define JWT payload interface
// // interface JwtPayload {
// //   healthCardNumber: string;
// // }

// // // Define appointment structure from backend
// // interface Appointment {
// //   id: number;
// //   time: string; // "HH:MM:SS"
// //   doctor: string;
// //   booked: boolean;
// //   date: string; // "YYYY-MM-DD"
// //   clinic_name: string;
// //   healthCardNumber: string | null;
// // }

// // // Notification handler
// // Notifications.setNotificationHandler({
// //   handleNotification: async () => ({
// //     shouldShowAlert: true,
// //     shouldPlaySound: true,
// //     shouldSetBadge: false,
// //   }),
// // });

// // // Function to schedule a notification
// // const scheduleNotification = async (currentTime: Date, appointment: Appointment) => {
// //   const appointmentTime = new Date(`${appointment.date}T${appointment.time}`);
// //   const notificationTime = new Date(appointmentTime.getTime() - 60 * 60 * 1000); // 1 hour before
// //   if (appointmentTime <= currentTime) {
// //     console.log('Skipping past appointment:', appointmentTime);
// //     return;
// //   }

// //   if (notificationTime > currentTime) {
// //     const secondsUntilNotification = Math.floor((notificationTime.getTime() - currentTime.getTime()) / 1000);

// //     await Notifications.scheduleNotificationAsync({
// //       content: {
// //         title: "Upcoming Appointment ⏰",
// //         body: `Your appointment with ${appointment.doctor} at ${appointment.clinic_name} is at ${appointmentTime.toLocaleTimeString()}`,
// //         sound: "default",
// //       },
// //       trigger: {
// //         type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
// //         seconds: secondsUntilNotification,
// //         repeats: false,
// //       },
// //     });

// //     Alert.alert("Notification Scheduled", `Set for: ${notificationTime.toLocaleString()}`);
// //   } else if (appointmentTime > currentTime && currentTime >= notificationTime) {
// //     await Notifications.scheduleNotificationAsync({
// //       content: {
// //         title: "Upcoming Appointment ⏰",
// //         body: `Your appointment with ${appointment.doctor} at ${appointment.clinic_name} is at ${appointmentTime.toLocaleTimeString()}`,
// //         sound: "default",
// //       },
// //       trigger: null, // Immediate
// //     });

// //     Alert.alert("Notification", "Fired immediately");
// //   }
// // };

// // // Request notification permissions
// // const requestPermissions = async () => {
// //   const { status } = await Notifications.getPermissionsAsync();
// //   if (status !== "granted") {
// //     const { status: newStatus } = await Notifications.requestPermissionsAsync();
// //     if (newStatus !== "granted") {
// //       Alert.alert("Permission Denied", "Notifications are required for appointment reminders.");
// //       return false;
// //     }
// //   }
// //   return true;
// // };

// // // Fetch appointments from backend
// // const fetchAppointments = async (): Promise<Appointment[]> => {
// //   try {
// //     const response = await fetch(`${API_HOME}/api/appointments/`, {
// //       method: 'GET', // Adjust if your API requires POST or auth headers
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     });
// //     if (!response.ok) throw new Error('Failed to fetch appointments');
// //     const data = await response.json();
// //     console.log('Fetched Appointments:', data);
// //     return data; // Expecting array of appointments
// //   } catch (error) {
// //     console.error('Error fetching appointments:', error);
// //     return [];
// //   }
// // };

// // export default function App() {
// //   const [isLoading, setIsLoading] = useState(true);
// //   const { isAuthenticated, initializeAuth, token } = useAuthStore();

// //   const loadAssets = async () => {
// //     try {
// //       const imageAssets = [
// //         require('./assets/images/welcome.png'),
// //         require('./assets/images/logo.png'),
// //       ];
// //       const loadImages = imageAssets.map((image) => Asset.fromModule(image).downloadAsync());
// //       await Promise.all(loadImages);
// //       await new Promise(resolve => setTimeout(resolve, 2000));
// //     } catch (error) {
// //       Alert.alert("Error", "Failed to load assets: " + error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const setupNotifications = async (healthCardNumber: string) => {
// //     if (!isAuthenticated) return;
// //     await Notifications.cancelAllScheduledNotificationsAsync();
// //     console.log('Cancelled all previous notifications');
// //     const hasPermission = await requestPermissions();
// //     if (hasPermission) {
// //       const appointments = await fetchAppointments();
// //       const userAppointments = appointments.filter(
// //         (appt) => appt.healthCardNumber === healthCardNumber && appt.booked==true
// //       );
// //       console.log('Filtered User Appointments:', userAppointments);

// //       const currentTime = new Date();
// //       for (const appointment of userAppointments) {
// //         await scheduleNotification(currentTime, appointment);
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     let mounted = true;

// //     const initializeApp = async () => {
// //       await initializeAuth(); // Check auth state

// //       // Decode token to get healthCardNumber
// //       let healthCardNumber = '';
// //       try {
// //         const storedToken = token || (await AsyncStorage.getItem('jwt_token'));
// //         if (storedToken) {
// //           const decoded = jwtDecode<JwtPayload>(storedToken);
// //           healthCardNumber = decoded.healthCardNumber;
// //           console.log('Decoded HealthCardNumber:', healthCardNumber);
// //         }
// //       } catch (error) {
// //         console.error('Failed to decode token:', error);
// //       }

// //       await loadAssets();
// //       if (healthCardNumber&& mounted) {
// //         await setupNotifications(healthCardNumber);
// //       }
      
// //     };

// //     initializeApp();
// //     return () => {
// //       mounted = false; // Cleanup on unmount
// //     };
// //   }, [isAuthenticated, token]);

// //   if (isLoading) {
// //     return (
// //       <GestureHandlerRootView style={{ flex: 1 }}>
// //         <LoadingScreen />
// //         <StatusBar style="auto" />
// //       </GestureHandlerRootView>
// //     );
// //   }

// //   return (
// //     <GestureHandlerRootView style={{ flex: 1 }}>
// //       <NavigationContainer>
// //         <Router />
// //         <StatusBar style="auto" />
// //       </NavigationContainer>
// //     </GestureHandlerRootView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });


// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, View, Alert } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import * as Notifications from 'expo-notifications';
// import { Asset } from 'expo-asset';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import LoadingScreen from './src/screens/Loading/LoadingScreen';
// import Router from './src/navigation/Router';
// import { useAuthStore } from './src/store/useAuthStore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { jwtDecode } from 'jwt-decode';
// import { API_HOME } from './src/screens/auth/config';

// // Define JWT payload interface
// interface JwtPayload {
//   healthCardNumber: string;
// }

// // Define appointment structure from backend
// interface Appointment {
//   id: number;
//   time: string; // "HH:MM:SS"
//   doctor: string;
//   booked: boolean;
//   date: string; // "YYYY-MM-DD"
//   clinic_name: string;
//   healthCardNumber: string | null;
// }

// // Notification handler
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// // Function to schedule a notification
// const scheduleNotification = async (currentTime: Date, appointment: Appointment) => {
//   const appointmentTime = new Date(`${appointment.date}T${appointment.time}:00`);
//   const notificationTime = new Date(appointmentTime.getTime() - 60 * 60 * 1000); // 1 hour before

//   // Skip if appointment time is in the past
//   if (appointmentTime <= currentTime) {
//     console.log('Skipping past appointment:', appointmentTime.toLocaleString());
//     return;
//   }

//   // Only schedule if notification time (1 hour before) is still in the future
//   if (notificationTime > currentTime) {
//     const secondsUntilNotification = Math.floor((notificationTime.getTime() - currentTime.getTime()) / 1000);

//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Upcoming Appointment ⏰",
//         body: `Your appointment with ${appointment.doctor} at ${appointment.clinic_name} is at ${appointmentTime.toLocaleTimeString()}`,
//         sound: "default",
//       },
//       trigger: {
//         type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
//         seconds: secondsUntilNotification,
//         repeats: false,
//       },
//     });

//     console.log(`Notification scheduled for ${notificationTime.toLocaleString()}`);
//     Alert.alert("Notification Scheduled", `Set for: ${notificationTime.toLocaleString()}`);
//   } else {
//     console.log('Notification time already passed:', notificationTime.toLocaleString());
//   }
// };

// // Request notification permissions
// const requestPermissions = async () => {
//   const { status } = await Notifications.getPermissionsAsync();
//   if (status !== "granted") {
//     const { status: newStatus } = await Notifications.requestPermissionsAsync();
//     if (newStatus !== "granted") {
//       Alert.alert("Permission Denied", "Notifications are required for appointment reminders.");
//       return false;
//     }
//   }
//   return true;
// };

// // Fetch appointments from backend
// const fetchAppointments = async (): Promise<Appointment[]> => {
//   try {
//     const response = await fetch(`${API_HOME}/api/appointments/`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) throw new Error('Failed to fetch appointments');
//     const data = await response.json();
//     console.log('Fetched Appointments:', data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching appointments:', error);
//     return [];
//   }
// };

// export default function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const { isAuthenticated, initializeAuth, token } = useAuthStore();

//   const loadAssets = async () => {
//     try {
//       const imageAssets = [
//         require('./assets/images/welcome.png'),
//         require('./assets/images/logo.png'),
//       ];
//       const loadImages = imageAssets.map((image) => Asset.fromModule(image).downloadAsync());
//       await Promise.all(loadImages);
//       await new Promise(resolve => setTimeout(resolve, 2000));
//     } catch (error) {
//       Alert.alert("Error", "Failed to load assets: " + error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const setupNotifications = async (healthCardNumber: string) => {
//     if (!isAuthenticated) return;

//     // Clear all previous notifications
//     await Notifications.cancelAllScheduledNotificationsAsync();
//     console.log('Cancelled all previous notifications');

//     const hasPermission = await requestPermissions();
//     if (!hasPermission) return;

//     const appointments = await fetchAppointments();
//     const userAppointments = appointments.filter(
//       (appt) => appt.healthCardNumber === healthCardNumber && appt.booked === true
//     );
//     console.log('Filtered User Appointments:', userAppointments);

//     const currentTime = new Date();
//     for (const appointment of userAppointments) {
//       await scheduleNotification(currentTime, appointment);
//     }
//   };

//   useEffect(() => {
//     const initializeApp = async () => {
//       await Notifications.cancelAllScheduledNotificationsAsync();

//       await initializeAuth(); // Check auth state

//       // Decode token to get healthCardNumber
//       let healthCardNumber = '';
//       try {
//         const storedToken = token || (await AsyncStorage.getItem('jwt_token'));
//         if (storedToken&& isAuthenticated) {
//           const decoded = jwtDecode<JwtPayload>(storedToken);
//           healthCardNumber = decoded.healthCardNumber;
//           console.log('Decoded HealthCardNumber:', healthCardNumber);
//         }
//       } catch (error) {
//         console.error('Failed to decode token:', error);
//       }

//       await loadAssets();
//       if (healthCardNumber) {
//         await setupNotifications(healthCardNumber);
//       }
//     };

//     initializeApp();
//   }, []); // Empty dependency array to run only once on mount

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
import { useAuthStore } from './src/store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { API_HOME } from './src/screens/auth/config';

// Define JWT payload interface
interface JwtPayload {
  healthCardNumber: string;
  exp: number;
}

// Define appointment structure from backend
interface Appointment {
  id: number;
  time: string; // "HH:MM:SS"
  doctor: string;
  booked: boolean;
  date: string; // "YYYY-MM-DD"
  clinic_name: string;
  healthCardNumber: string | null;
}

// Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Function to schedule a notification
const scheduleNotification = async (currentTime: Date, appointment: Appointment) => {
  const appointmentTime = new Date(`${appointment.date}T${appointment.time}:00`);
  const notificationTime = new Date(appointmentTime.getTime() - 60 * 60 * 1000); // 1 hour before

  // Skip if appointment time is in the past
  if (appointmentTime <= currentTime) {
    console.log('Skipping past appointment:', appointmentTime.toLocaleString());
    return;
  }

  // Only schedule if notification time (1 hour before) is still in the future
  if (notificationTime > currentTime) {
    const secondsUntilNotification = Math.floor((notificationTime.getTime() - currentTime.getTime()) / 1000);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Upcoming Appointment ⏰",
        body: `Your appointment with ${appointment.doctor} at ${appointment.clinic_name} is at ${appointmentTime.toLocaleTimeString()}`,
        sound: "default",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: secondsUntilNotification,
        repeats: false,
      },
    });

    console.log(`Notification scheduled for ${notificationTime.toLocaleString()}`);
    Alert.alert("Notification Scheduled", `Set for: ${notificationTime.toLocaleString()}`);
  } else {
    console.log('Notification time already passed:', notificationTime.toLocaleString());
  }
};

// Request notification permissions
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

// Fetch appointments from backend
const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await fetch(`${API_HOME}/api/appointments/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch appointments');
    const data = await response.json();
    console.log('Fetched Appointments:', data);
    return data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, initializeAuth, token, setToken, setRefreshToken, logout } = useAuthStore();

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

  // Token refresh function
  const refreshAuthToken = async (): Promise<string | null> => {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    if (!refreshToken) {
      Alert.alert('Session Expired', 'Please login again');
      await logout();
      return null;
    }

    try {
      const response = await fetch(`${API_HOME}/api/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const { token: newToken, refresh: newRefreshToken } = await response.json();
      
      // Update tokens in store and storage
      setToken(newToken);
      setRefreshToken(newRefreshToken);
      await AsyncStorage.multiSet([
        ['jwt_token', newToken],
        ['refresh_token', newRefreshToken],
      ]);

      return newToken;
    } catch (error) {
      console.error('Refresh token error:', error);
      Alert.alert('Error', 'Session expired. Please login again.');
      await logout();
      return null;
    }
  };

  // Validate token and refresh if needed
  const validateToken = async (): Promise<string | null> => {
    if (!isAuthenticated) return null;

    try {
      let currentToken = token || (await AsyncStorage.getItem('jwt_token'));
      if (!currentToken) {
        await logout();
        return null;
      }

      // Check token expiration
      const decoded = jwtDecode<JwtPayload>(currentToken);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        currentToken = await refreshAuthToken();
      }

      return currentToken;
    } catch (error) {
      console.error('Token validation error:', error);
      return null;
    }
  };

  const setupNotifications = async (healthCardNumber: string) => {
    if (!isAuthenticated) return;

    // Clear all previous notifications
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('Cancelled all previous notifications');

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const appointments = await fetchAppointments();
    const userAppointments = appointments.filter(
      (appt) => appt.healthCardNumber === healthCardNumber && appt.booked === true
    );
    console.log('Filtered User Appointments:', userAppointments);

    const currentTime = new Date();
    for (const appointment of userAppointments) {
      await scheduleNotification(currentTime, appointment);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      await initializeAuth(); // Check auth state

      // Decode token to get healthCardNumber
      let healthCardNumber = '';
      if (isAuthenticated) {
        try {
          const validToken = await validateToken();
          if (validToken) {
            const decoded = jwtDecode<JwtPayload>(validToken);
            healthCardNumber = decoded.healthCardNumber;
            console.log('Decoded HealthCardNumber:', healthCardNumber);
          }
        } catch (error) {
          console.error('Failed to decode token:', error);
        }
      }

      await loadAssets();
      if (healthCardNumber && isAuthenticated) {
        await setupNotifications(healthCardNumber);
      }
    };

    initializeApp();
  }, []); // Empty dependency array to run only once on mount

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