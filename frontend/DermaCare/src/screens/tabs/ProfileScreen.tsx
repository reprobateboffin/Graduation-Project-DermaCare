
// import React, { useCallback, useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
// import { colors } from '../../theme/colors';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { RootStackParamList } from '../../navigation/Router';
// import { API_HOME } from '../auth/config';
// import { useAuthStore } from '../../store/useAuthStore';
// import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Define your JWT payload interface
// interface JwtPayload {
//   healthCardNumber: string; // Add this to match your token structure
//   // Add other fields if your token has them
// }

// export interface PersonalInfo {
//   HealthCareNumber: string;
//   FirstName: string;
//   LastName: string;
//   DateOfBirth: string;
//   Email: string;
//   Clinic: string;
//   PhoneNumber: string;
//   Preference: string;
//   profile_picture: string;
// }

// const PERSONAL_INFO: PersonalInfo = {
//   FirstName: "Santiago",
//   LastName: "Silva",
//   HealthCareNumber: "12",
//   DateOfBirth: "2001/01/18",
//   Clinic: "Manhattan",
//   PhoneNumber: "306 (123) 4567",
//   Email: "santiago@pgrminc.com",
//   Preference: "Phone",
//   profile_picture: "../../../assets/images/profile-placeholder.png",
// };

// const ProfileScreen = () => {
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
//   const token = useAuthStore((state) => state.token); // Get token from store
//   const refreshToken = useAuthStore((state) => state.refreshToken); // Get token from store
//   const logout = useAuthStore((state) => state.logout);
//   const [healthCardNumber, setHealthCardNumber] = useState<string>(''); // State for healthCardNumber

//   const [profileInfo, setProfileInfo] = useState<PersonalInfo>(PERSONAL_INFO);
//   const checkAndRefreshToken = async () => {
//     try {
//       if (!token) return null;

//       const decoded = jwtDecode<JwtPayload & { exp: number }>(token);
//       const isExpired = decoded.exp * 1000 < Date.now();

//       if (isExpired) {
//         console.log('Token expired, refreshing...');
//         if (!refreshToken) {
//           throw new Error('No refresh token available');
//         }

//         const response = await fetch(`${API_HOME}/api/token/refresh/`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ refresh: refreshToken }),
//         });

//         if (!response.ok) {
//           throw new Error('Token refresh failed');
//         }

//         const { token: newToken, refresh: newRefreshToken } = await response.json();
//          useAuthStore.getState().setToken(newToken);
//          useAuthStore.getState().setRefreshToken(newRefreshToken);
//         return newToken;
//       }

//       return token;
//     } catch (error) {
//       console.error('Token refresh error:', error);
//       await logout();
//       navigation.navigate('LoginPage');
//       return null;
//     }
//   };

//   // Decode token to get healthCardNumber
//   useEffect(() => {
//     const decodeToken = async () => {
//       try {
//         const storedToken = token || (await AsyncStorage.getItem('jwt_token')); // Use store token or fetch from AsyncStorage
//         if (storedToken) {
//           const decoded = jwtDecode<JwtPayload>(storedToken);
//           const extractedHealthCardNumber = decoded.healthCardNumber;
//           console.log('Decoded HealthCardNumber:', extractedHealthCardNumber);
//           setHealthCardNumber(extractedHealthCardNumber);
//         } else {
//           console.log('No token found');
//         }
//       } catch (error) {
//         console.error('Failed to decode token:', error);
//       }
//     };
//     decodeToken();
//   }, [token]);

//   // Fetch profile data using healthCardNumber
//   const fetchData = async () => {
//     if (!healthCardNumber) return; // Wait until healthCardNumber is set
//     try {
//       const response = await fetch(`${API_HOME}/api/profile/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           healthCardNumber: healthCardNumber, // Use decoded value
//         }),
//       });
//       const data = await response.json();
//       console.log('Profile Data:', data);
//       setProfileInfo(data);
//       setProfilePic(data.profile_picture);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchData(); // Fetch profile when screen is focused
//     }, [healthCardNumber]) // Depend on healthCardNumber
//   );

//   const handleLogout = async () => {
//     await logout();
//     navigation.navigate('LoginPage');
//   };

//   const displayInfo = profileInfo || PERSONAL_INFO;
//   const [profilePic, setProfilePic] = useState(displayInfo.profile_picture);

//   const params = {
//     healthCardNumber: healthCardNumber,
//     firstName: displayInfo.FirstName,
//     lastName: displayInfo.LastName,
//     dOB: displayInfo.DateOfBirth,
//     email: displayInfo.Email,
//     Clinic: displayInfo.Clinic,
//     phoneNumber: displayInfo.PhoneNumber,
//     preference: displayInfo.Preference,
//     profile_picture: displayInfo.profile_picture,
//   };

//   console.log('Params for EditProfile:', params);

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <Text style={styles.title}>Personal Information</Text>

//         {/* Profile Image */}
//         <View style={styles.profileImageContainer}>
//           <Image 
//             source={{ uri: displayInfo.profile_picture }} 
//             style={styles.profileImage}
//           />
//           <Text style={styles.name}>{displayInfo.FirstName}</Text>
//         </View>

//         {/* Info Card */}
//         <View style={styles.infoCard}>
//           <InfoItem label="Health card number" value={displayInfo.HealthCareNumber} />
//           <InfoItem label="Date of birth" value={displayInfo.DateOfBirth} />
//           <InfoItem label="Phone" value={displayInfo.PhoneNumber} />
//           <InfoItem label="Email" value={displayInfo.Email} />
//         </View>

//         {/* Edit Button */}
//         <TouchableOpacity 
//           style={styles.editButton}
//           onPress={() => navigation.navigate('EditProfile', params)}
//         >
//           <Text style={styles.editButtonText}>Edit</Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={styles.editButton}
//           onPress={handleLogout}
//         >
//           <Text style={styles.editButtonText}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const InfoItem = ({ label, value }: { label: string; value: string }) => (
//   <View style={styles.infoItem}>
//     <Text style={styles.infoLabel}>{label}</Text>
//     <Text style={styles.infoValue}>{value}</Text>
//   </View>
// );

// // Styles remain unchanged
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.base.white,
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingHorizontal: 24,
//     paddingTop: 20,
//     paddingBottom: 40,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     lineHeight: 61,
//     color: colors.base.black,
//     marginBottom: 28,
//     marginTop: 28,
//     textAlign: "center",
//     alignSelf: 'center',
//   },
//   profileImageContainer: {
//     alignItems: 'center',
//     marginBottom: 32,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 28,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: colors.base.black,
//   },
//   infoCard: {
//     width: '100%',
//     backgroundColor: colors.primary.blue,
//     borderRadius: 2,
//     paddingVertical: 20,
//     paddingHorizontal: 24,
//     marginBottom: 24,
//     gap: 42,
//   },
//   infoItem: {
//     gap: 18,
//   },
//   infoLabel: {
//     fontSize: 16,
//     color: colors.base.white,
//     fontWeight: 'bold',
//   },
//   infoValue: {
//     fontSize: 14,
//     color: colors.base.white,
//     fontWeight: 'regular',
//   },
//   editButton: {
//     backgroundColor: colors.primary.green,
//     paddingVertical: 10,
//     paddingHorizontal: 36,
//     borderRadius: 12,
//     width: 114,
//     alignItems: 'center',
//     marginBottom: 80,
//   },
//   editButtonText: {
//     color: colors.base.white,
//     fontSize: 14,
//     fontWeight: 'semibold',
//   },
// });

// export default ProfileScreen;


import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Router';
import { API_HOME } from '../auth/config';
import { useAuthStore } from '../../store/useAuthStore';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface JwtPayload {
  healthCardNumber: string;
  exp: number;
}

export interface PersonalInfo {
  HealthCareNumber: string;
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Email: string;
  Clinic: string;
  PhoneNumber: string;
  Preference: string;
  profile_picture: string;
}

const PERSONAL_INFO: PersonalInfo = {
  FirstName: "Santiago",
  LastName: "Silva",
  HealthCareNumber: "12",
  DateOfBirth: "2001/01/18",
  Clinic: "Manhattan",
  PhoneNumber: "306 (123) 4567",
  Email: "santiago@pgrminc.com",
  Preference: "Phone",
  profile_picture: "../../../assets/images/profile-placeholder.png",
};

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { token, refreshToken, setToken, setRefreshToken, logout } = useAuthStore();
  const [healthCardNumber, setHealthCardNumber] = useState<string>('');
  const [profileInfo, setProfileInfo] = useState<PersonalInfo>(PERSONAL_INFO);
  const [profilePic, setProfilePic] = useState(profileInfo.profile_picture);
  const [isLoading, setIsLoading] = useState(false);

  const refreshAuthToken = async () => {
    try {
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

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
        ['refresh_token', newRefreshToken]
      ]);

      return newToken;
    } catch (error) {
      console.error('Refresh token error:', error);
      await logout();
      navigation.navigate('LoginPage');
      return null;
    }
  };

  const fetchProfileData = async (currentToken: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(currentToken);
      setHealthCardNumber(decoded.healthCardNumber);

      const response = await fetch(`${API_HOME}/api/profile/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          healthCardNumber: decoded.healthCardNumber,
        }),
      });

      if (response.status === 401) {
        const newToken = await refreshAuthToken();
        if (newToken) {
          return fetchProfileData(newToken); // Retry with new token
        }
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfileInfo(data);
      setProfilePic(data.profile_picture);
    } catch (error) {
      console.error('Fetch profile error:', error);
      Alert.alert('Error', 'Failed to load profile data');
    }
  };

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      let currentToken = token;
      
      // Check if token exists and is valid
      if (currentToken) {
        const decoded = jwtDecode<JwtPayload>(currentToken);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          currentToken = await refreshAuthToken();
          if (!currentToken) return;
        }
      } else {
        // Try to get token from storage
        currentToken = await AsyncStorage.getItem('jwt_token');
        if (!currentToken) {
          await logout();
          navigation.navigate('LoginPage');
          return;
        }
      }

      await fetchProfileData(currentToken);
    } catch (error) {
      console.error('Profile load error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [token, refreshToken])
  );

  const handleLogout = async () => {
    await logout();
    navigation.navigate('LoginPage');
  };

  const displayInfo = profileInfo || PERSONAL_INFO;

  const params = {
    healthCardNumber: healthCardNumber,
    firstName: displayInfo.FirstName,
    lastName: displayInfo.LastName,
    dOB: displayInfo.DateOfBirth,
    email: displayInfo.Email,
    Clinic: displayInfo.Clinic,
    phoneNumber: displayInfo.PhoneNumber,
    preference: displayInfo.Preference,
    profile_picture: displayInfo.profile_picture,
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Personal Information</Text>

        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: displayInfo.profile_picture }} 
            style={styles.profileImage}
          />
          <Text style={styles.name}>{displayInfo.FirstName}</Text>
        </View>

        <View style={styles.infoCard}>
          <InfoItem label="Health card number" value={displayInfo.HealthCareNumber} />
          <InfoItem label="Date of birth" value={displayInfo.DateOfBirth} />
          <InfoItem label="Phone" value={displayInfo.PhoneNumber} />
          <InfoItem label="Email" value={displayInfo.Email} />
        </View>

        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile', params)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.editButton, { backgroundColor: 'red' }]}
          onPress={handleLogout}
        >
          <Text style={styles.editButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 61,
    color: colors.base.black,
    marginBottom: 28,
    marginTop: 28,
    textAlign: "center",
    alignSelf: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 28,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.base.black,
  },
  infoCard: {
    width: '100%',
    backgroundColor: colors.primary.blue,
    borderRadius: 2,
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 42,
  },
  infoItem: {
    gap: 18,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.base.white,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 14,
    color: colors.base.white,
    fontWeight: 'regular',
  },
  editButton: {
    backgroundColor: colors.primary.green,
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 12,
    width: 114,
    alignItems: 'center',
    marginBottom: 20,
  },
  editButtonText: {
    color: colors.base.white,
    fontSize: 14,
    fontWeight: 'semibold',
  },
});

export default ProfileScreen;