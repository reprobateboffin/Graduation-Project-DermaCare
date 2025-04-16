// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView, Linking, Animated, Pressable } from 'react-native';
// import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
// import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// import type { BottomTabParamList } from '../../navigation/BottomTabs';
// import { colors } from '../../theme/colors';
// import { useAuthStore } from '../../store/useAuthStore';
// import BackgroundShape from '../../components/BackgroundShape';
// import ActionButton from '../../components/Buttons/ActionButton';
// import DoctorCard from '../../components/DoctorCard';
// import ScrollAnimatedView from '../../components/ScrollAnimatedView';
// import { DOCTORS } from '../../data/doctors';
// import AnimatedSection from '../../components/AnimatedSection';
// import { Ionicons } from '@expo/vector-icons';
// import SubHeader from '../SubHeaders/SubHeader';
// const { width: SCREEN_WIDTH } = Dimensions.get('window');
// import { jwtDecode, JwtPayload } from 'jwt-decode';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const HERO_IMAGE_WIDTH = 522;
// const HERO_IMAGE_HEIGHT = 447;
// declare module 'jwt-decode' {
//   interface CustomJwtPayload extends JwtPayload {
//     healthCardNumber: string;
//     // Add other custom claims here if needed
//   }
// }

// const HomeScreen = () => {
//   const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
//   const [healthCardNumber,setHealthCardNumber] = useState('')
//   const route = useRoute();
//   const token = useAuthStore((store=>store.token))
//   const handlePhysicianPress = () => {
//     // Navigate to physicians list
//   };
// useEffect(()=>{

//   console.log('Retreived Token', token)
//   const decodeToken = async () => {
//     const token = await AsyncStorage.getItem('jwt_token');

//     try {
//       if (token) {
//         const decoded = jwtDecode(token) as { healthCardNumber: string } & JwtPayload;
//         const extractedHealthCardNumber = decoded.healthCardNumber;
//         console.log('Decoded HealthCardNumber:', extractedHealthCardNumber);
//         setHealthCardNumber(extractedHealthCardNumber);
//         alert(healthCardNumber)
//       }
//     } catch (error) {
//       console.error('Failed to decode token:', error);
//     }
//   };

//   decodeToken();
// },[token])



//   return (
//     <SafeAreaView style={styles.container}>
//       <Animated.ScrollView 
//         style={styles.scrollView} 
//         showsVerticalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: true }
//         )}
//         scrollEventThrottle={16}
//         contentContainerStyle={styles.scrollViewContent}
//       >
//         {/* Background Shape */}
//         <View style={styles.backgroundContainer}>
//           <BackgroundShape />
//         </View>

//         {/* //Home and Blogs Sub Headers */}
//         {/* <View style={styles.headersub}>
//   <Pressable>
//     <Text  style={styles.activesubheading}>Home</Text>
//   </Pressable>
//   <Pressable>
//     <Text onPress={()=>navigation.navigate('Blogs')} style={[styles.subheading, route.name=='Blogs'&& styles.activesubheading]}>Blogs</Text>
//   </Pressable>
// </View> */}

// <SubHeader />
//         {/* Header */}
//         <AnimatedSection isInitial delay={100} style={styles.header}>
//           <View style={styles.profileContainer}>
//             <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile',{healthCardNumber})}>
//               <Image 
//                 source={require('../../../assets/images/profile-placeholder.png')} 
//                 style={styles.profileImage}
//               />
//             </TouchableOpacity>
//           </View>
//         </AnimatedSection>

//         <AnimatedSection isInitial delay={200} style={styles.headerContent}>
//           <Text style={styles.title}>Hope Health Centre</Text>
//           <Text style={styles.subtitle}>Welcome!</Text>
//         </AnimatedSection>

//         {/* Main Content */}
//         <View style={styles.content}>
//           {/* Hero Image */}
//           <AnimatedSection isInitial delay={300} style={styles.heroContainer}>
//             <Image 
//               source={require('../../../assets/images/doctor-patient.png')}
//               style={styles.heroImage}
//               resizeMode="contain"
//             />
//           </AnimatedSection>

//           {/* Action Button */}
//           <AnimatedSection scrollY={scrollY} index={3} style={styles.buttonContainer}>
//             <ActionButton 
//               title="See our Physicians"
//               onPress={handlePhysicianPress}
//             />
//           </AnimatedSection>

//           {/* Physicians Section */}
//           <AnimatedSection scrollY={scrollY} index={4} style={styles.physiciansSection}>
//             <Text style={styles.sectionTitle}>Our physicians</Text>
//             <Text style={styles.sectionDescription}>
//               I'm not sure what you would put in this description but I'm pretty sure it could be something interesting that says something about the clinic
//             </Text>

//             {/* Doctor Cards */}
//             <View style={styles.doctorsContainer}>
//               {DOCTORS.map((doctor, index) => (
//                 <AnimatedSection key={doctor.id} scrollY={scrollY} index={5 + index} style={{ width: '100%' }}>
//                   <DoctorCard
//                     name={doctor.name}
//                     title={doctor.title}
//                     imageUrl={doctor.imageUrl}
//                   />
//                 </AnimatedSection>
//               ))}
//             </View>
//           </AnimatedSection>

//           {/* Contact Section */}
//           <AnimatedSection scrollY={scrollY} index={8} style={styles.contactSection}>
//             <Text style={{...styles.sectionTitle, color: colors.primary.darkBlue}}>Contact</Text>
//             <View style={styles.contactInfo}>
//               <Text style={styles.contactText}>Email: <Text style={styles.contactLink} onPress={() => Linking.openURL('mailto:reception@pacmc.com')}>reception@pacmc.com</Text></Text>
//               <Text style={styles.contactText}>Mobile: 306-922-2002</Text>
//             </View>

//           {/* Locations Section */}
//             <Text style={{...styles.sectionTitle, color: colors.primary.darkBlue}}>Locations</Text>
//             <View style={styles.locationInfo}>
//               <Text style={styles.locationTitle}>Hope Health Centre</Text>
//               <Text style={styles.locationLink} onPress={() => Linking.openURL('https://maps.google.com/?q=1135 Central Avenue Prince Albert, SK S6V 4V7')}>
//                 1135 Central Avenue{'\n'}Prince Albert, SK S6V 4V7
//               </Text>

//               <Text style={[styles.locationTitle, styles.secondLocation]}>Walmart Clinic</Text>
//               <Text style={styles.locationLink} onPress={() => Linking.openURL('https://maps.google.com/?q=100 – 800 15th Street East Prince Albert, SK S6V 8E3')}>
//                 100 – 800 15th Street East{'\n'}Prince Albert, SK S6V 8E3
//               </Text>
//             </View>

//           {/* Socials Section */}
//             <Text style={{...styles.sectionTitle, color: colors.primary.darkBlue}}>Socials</Text>
//             <View style={styles.socialIcons}>
//               <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://linkedin.com')}>
//                 <Image source={require('../../../assets/icons/linkedin.png')} style={styles.socialIcon} />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://twitter.com')}>
//                 <Image source={require('../../../assets/icons/x.png')} style={styles.socialIcon} />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://instagram.com')}>
//                 <Image source={require('../../../assets/icons/instagram.png')} style={styles.socialIcon} />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://facebook.com')}>
//                 <Image source={require('../../../assets/icons/facebook.png')} style={styles.socialIcon} />
//               </TouchableOpacity>
//             </View>
//           </AnimatedSection>
//         </View>
//       </Animated.ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   backgroundContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 800,
//   },
//   header: {
//     paddingHorizontal: 24,
//     paddingTop: 64,
//     paddingBottom: 19,
//     alignItems: 'flex-end',
//     zIndex: 1,
//   },
//   profileContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingBottom: 24,
//   },
//   headerContent: {
//     width: '100%',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingBottom: 24,
//     zIndex: 1,
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: colors.base.white,
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 24,
//     fontWeight: 'light',
//     color: colors.base.white,
//     opacity: 0.9,
//     textAlign: 'center',
//   },
//   profileButton: {
//     width: 58,
//     height: 58,
//     overflow: 'hidden',
//   },
//   profileImage: {
//     width: "100%",
//     height: "100%",
//   },
//   content: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 20,
//   },
//   heroContainer: {
//     width: HERO_IMAGE_WIDTH,
//     height: HERO_IMAGE_HEIGHT,
//     marginBottom: 24,
//     marginLeft: -(HERO_IMAGE_WIDTH - SCREEN_WIDTH) / 2,
//     overflow: 'visible',
//   },
//   heroImage: {
//     width: '100%',
//     height: '100%',
//     transform: [{scale: 1.2}],
//   },
//   buttonContainer: {
//     width: '100%',
//     paddingTop: 20,
//     marginBottom: 40,
//     alignItems: 'center',
//   },
//   physiciansSection: {
//     width: '100%',
//     paddingHorizontal: 24,
//     marginBottom: 40,
//     alignItems: 'center',
//   },
//   sectionTitle: {
//     fontSize: 34,
//     fontWeight: 'medium',
//     color: colors.base.white,
//     marginBottom: 24,
//     paddingTop: 74,
//   },
//   sectionDescription: {
//     fontSize: 16,
//     color: colors.base.white,
//     opacity: 0.9,
//     fontWeight: 'semibold',
//     marginBottom: 24,
//     textAlign: 'center',
//     lineHeight: 32,
//   },
//   doctorsContainer: {
//     paddingTop: 32,
//     width: '100%',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: 16,
//     paddingHorizontal: 24,
//   },
//   contactSection: {
//     width: '100%',
//     paddingHorizontal: 24,
//     marginBottom: 40,
//     alignItems: 'center',
//   },
//   contactInfo: {
//     alignItems: 'center',
//   },
//   contactText: {
//     fontSize: 16,
//     color: colors.primary.darkBlue,
//     marginBottom: 8,
//   },
//   contactLink: {
//     textDecorationLine: 'underline',
//     color: colors.primary.purple,
//   },
//   locationsSection: {
//     width: '100%',
//     paddingHorizontal: 24,
//     marginBottom: 40,
//     alignItems: 'center',
//   },
//   locationInfo: {
//     alignItems: 'center',
//   },
//   locationTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: colors.primary.darkBlue,
//     marginBottom: 8,
//   },
//   secondLocation: {
//     marginTop: 24,
//   },
//   locationLink: {
//     fontSize: 16,
//     color: colors.primary.purple,
//     textDecorationLine: 'underline',
//     textAlign: 'center',
//     marginBottom: 8,
//   },
//   socialsSection: {
//     width: '100%',
//     paddingHorizontal: 24,
//     marginBottom: 40,
//     alignItems: 'center',
//   },
//   socialIcons: {
//     flexDirection: 'row',
//     gap: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 70,
//   },
//   socialButton: {
//     width: 32,
//     height: 32,
//   },
//   socialIcon: {
//     width: 20,
//     height: 20,
//     tintColor: colors.primary.purple,
//   },
//   scrollViewContent: {
//     paddingBottom: 40,
//   },
//   headersub: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingVertical: 5,
//     marginTop: 30,
//     marginBottom: 0,
//   },
//   subheading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black', // Customize text color
//   }, 
//   activesubheading: {
//     color: colors.primary.purple,

//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen; 
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  ScrollView, 
  Linking, 
  Animated, 
  Pressable, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { BottomTabParamList } from '../../navigation/BottomTabs';
import { colors } from '../../theme/colors';
import { useAuthStore } from '../../store/useAuthStore';
import BackgroundShape from '../../components/BackgroundShape';
import ActionButton from '../../components/Buttons/ActionButton';
import DoctorCard from '../../components/DoctorCard';
import { DOCTORS } from '../../data/doctors';
import AnimatedSection from '../../components/AnimatedSection';
import SubHeader from '../SubHeaders/SubHeader';
import { CustomJwtPayload, jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { API_HOME } from '../auth/config';
// Constants
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_IMAGE_WIDTH = 522;
const HERO_IMAGE_HEIGHT = 447;

// Extend JWT payload typing
declare module 'jwt-decode' {
  interface CustomJwtPayload {
    healthCardNumber: string;
    exp: number;
  }
}

interface Doctor{
  id: string;
  name: string;
  title: string;
  ssn: string;
  image: string;
}

const HomeScreen = () => {

  
  // Navigation and state
  const navigationBottom = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
  const navigationTop = useNavigation<StackNavigationProp<RootStackParamList>>();

  const route = useRoute();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Auth state
  const { token, refreshToken, setToken, setRefreshToken, logout } = useAuthStore();
  const [healthCardNumber, setHealthCardNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshingToken, setIsRefreshingToken] = useState(false);
  const [doctors,setDoctors] =useState<Doctor[]>([]);
  // Token refresh function
  const refreshAuthToken = async (): Promise<string | null> => {
    if (!refreshToken) {
      Alert.alert('Session Expired', 'Please login again');
      await logout();
      navigationTop.navigate('LoginPage');
      return null;
    }

    setIsRefreshingToken(true);
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
        ['refresh_token', newRefreshToken]
      ]);

      return newToken;
    } catch (error) {
      console.error('Refresh token error:', error);
      Alert.alert('Error', 'Session expired. Please login again.');
      await logout();
      navigationTop.navigate('LoginPage');
      return null;
    } finally {
      setIsRefreshingToken(false);
    }
  };

  // Check and refresh token if needed
  const validateToken = async (): Promise<string | null> => {
    try {
      let currentToken = token || await AsyncStorage.getItem('jwt_token');
      if (!currentToken) {
        await logout();
        return null;
      }

      // Check token expiration
      const decoded = jwtDecode<CustomJwtPayload>(currentToken);
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

  // Decode token and set health card number
  const loadUserData = async () => {
    setIsLoading(true);
    try {
      const validToken = await validateToken();
      if (!validToken) return;

      const decoded = jwtDecode<CustomJwtPayload>(validToken);
      setHealthCardNumber(decoded.healthCardNumber);
    } catch (error) {
      console.error('Failed to load user data:', error);
      Alert.alert('Error', 'Failed to load user information');
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on focus and token change
  useFocusEffect(
    useCallback(() => {
      loadUserData();





    }, [token, refreshToken])
  );

  // Initial load
  useEffect(() => {
    loadUserData();
     const fetchData = async () => {
          try {
            const response = await fetch(`${API_HOME}/api/get-doctors/`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            console.log('Fetched products:', JSON.stringify(data, null, 2));
            setDoctors(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          } finally {
          }
        };
        fetchData()
  }, []);

  const handlePhysicianPress = () => {
    // Navigate to physicians list
    // navigation.navigate('Physicians');
    console.log("handled physicians");
    navigationBottom.navigate('SeeOurPhysicians')
    
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary.blue} />
        <Text style={styles.loadingText}>Loading your information...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Background Shape */}
        <View style={styles.backgroundContainer}>
          <BackgroundShape />
        </View>

        {/* Sub Header */}
        <SubHeader />

        {/* Header Section */}
        <AnimatedSection isInitial delay={100} style={styles.header}>
          <View style={styles.profileContainer}>
            <TouchableOpacity 
              style={styles.profileButton} 
              onPress={() => navigationBottom.navigate('Profile', { healthCardNumber })}
              disabled={isRefreshingToken}
            >
              {/* <Image 
                source={require('../../../assets/images/profile-placeholder.png')} 
                style={styles.profileImage}
              /> */}
              {isRefreshingToken && (
                <View style={styles.refreshOverlay}>
                  <ActivityIndicator size="small" color="white" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </AnimatedSection>

        <AnimatedSection isInitial delay={200} style={styles.headerContent}>
          <Text style={styles.title}>Hope Health Centre</Text>
          <Text style={styles.subtitle}>Welcome!</Text>
        </AnimatedSection>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Hero Image */}
          <AnimatedSection isInitial delay={300} style={styles.heroContainer}>
            <Image 
              source={require('../../../assets/images/doctor-patient.png')}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </AnimatedSection>

          {/* Action Button */}
          <AnimatedSection scrollY={scrollY} index={3} style={styles.buttonContainer}>
            <ActionButton 
              title="See our Physicians"
              onPress={handlePhysicianPress}
            />
          </AnimatedSection>

          {/* Physicians Section */}
          <AnimatedSection scrollY={scrollY} index={4} style={styles.physiciansSection}>
            <Text style={styles.sectionTitle}>Our physicians</Text>
            <Text style={styles.sectionDescription}>
              Our team of experienced physicians is ready to provide you with the best care possible.
            </Text>

            {/* Doctor Cards */}
            <View style={styles.doctorsContainer}>
              {doctors.slice(0,2).map((doctor, index) => (
                <AnimatedSection key={doctor.id} scrollY={scrollY} index={5 + index} style={{ width: '100%' }}>
                  <DoctorCard
                    name={doctor.name}
                    title={doctor.title}
                    imageUrl={doctor.image}
                  />
                </AnimatedSection>
              ))}
            </View>
          </AnimatedSection>

          {/* Contact Section */}
          <AnimatedSection scrollY={scrollY} index={8} style={styles.contactSection}>
            <Text style={{...styles.sectionTitle, color: colors.primary.darkBlue}}>Contact</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>Email: <Text style={styles.contactLink} onPress={() => Linking.openURL('mailto:reception@pacmc.com')}>reception@pacmc.com</Text></Text>
              <Text style={styles.contactText}>Mobile: 306-922-2002</Text>
            </View>

            {/* Locations Section */}
            <Text style={{...styles.sectionTitle, color: colors.primary.darkBlue}}>Locations</Text>
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>Hope Health Centre</Text>
              <Text style={styles.locationLink} onPress={() => Linking.openURL('https://maps.google.com/?q=1135 Central Avenue Prince Albert, SK S6V 4V7')}>
                1135 Central Avenue{'\n'}Prince Albert, SK S6V 4V7
              </Text>

              <Text style={[styles.locationTitle, styles.secondLocation]}>Walmart Clinic</Text>
              <Text style={styles.locationLink} onPress={() => Linking.openURL('https://maps.google.com/?q=100 – 800 15th Street East Prince Albert, SK S6V 8E3')}>
                100 – 800 15th Street East{'\n'}Prince Albert, SK S6V 8E3
              </Text>
            </View>

            {/* Socials Section */}
            <Text style={{...styles.sectionTitle, color: colors.primary.darkBlue}}>Socials</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://linkedin.com')}>
                <Image source={require('../../../assets/icons/linkedin.png')} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://twitter.com')}>
                <Image source={require('../../../assets/icons/x.png')} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://instagram.com')}>
                <Image source={require('../../../assets/icons/instagram.png')} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL('https://facebook.com')}>
                <Image source={require('../../../assets/icons/facebook.png')} style={styles.socialIcon} />
              </TouchableOpacity>
            </View>
          </AnimatedSection>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.white,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: colors.primary.darkBlue,
  },
  scrollView: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 800,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 19,
    alignItems: 'flex-end',
    zIndex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  headerContent: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.base.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'light',
    color: colors.base.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  profileButton: {
    width: 58,
    height: 58,
    overflow: 'hidden',
    borderRadius: 29,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  refreshOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 29,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  heroContainer: {
    width: HERO_IMAGE_WIDTH,
    height: HERO_IMAGE_HEIGHT,
    marginBottom: 24,
    marginLeft: -(HERO_IMAGE_WIDTH - SCREEN_WIDTH) / 2,
    overflow: 'visible',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    transform: [{scale: 1.2}],
  },
  buttonContainer: {
    width: '100%',
    paddingTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  physiciansSection: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 40,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: 'medium',
    color: colors.base.white,
    marginBottom: 24,
    paddingTop: 74,
  },
  sectionDescription: {
    fontSize: 16,
    color: colors.base.white,
    opacity: 0.9,
    fontWeight: 'semibold',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 32,
  },
  doctorsContainer: {
    paddingTop: 32,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
  },
  contactSection: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 40,
    alignItems: 'center',
  },
  contactInfo: {
    alignItems: 'center',
  },
  contactText: {
    fontSize: 16,
    color: colors.primary.darkBlue,
    marginBottom: 8,
  },
  contactLink: {
    textDecorationLine: 'underline',
    color: colors.primary.purple,
  },
  locationInfo: {
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary.darkBlue,
    marginBottom: 8,
  },
  secondLocation: {
    marginTop: 24,
  },
  locationLink: {
    fontSize: 16,
    color: colors.primary.purple,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 8,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
  },
  socialButton: {
    width: 32,
    height: 32,
  },
  socialIcon: {
    width: 20,
    height: 20,
    tintColor: colors.primary.purple,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
});

export default HomeScreen;