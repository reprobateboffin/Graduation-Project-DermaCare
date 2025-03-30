import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Router';
import { API_HOME } from '../auth/config';
import { useRoute } from '@react-navigation/native';
import { BottomTabParamList } from '../../navigation/BottomTabs';
export interface PersonalInfo {  
  HealthCareNumber: string;

  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Email: string;
  Clinic: string,
  PhoneNumber: string;
  Preference:string;
  
}

const PERSONAL_INFO: PersonalInfo = {
  FirstName: "Santiago",
  LastName: "Silva",
  HealthCareNumber: "12",
  DateOfBirth: "2001/01/18",
  Clinic:"Manhattan",
  PhoneNumber: "306 (123) 4567",
  Email: "santiago@pgrminc.com",
  Preference: "Phone"
};
type ProfileScreenRouteProp = RouteProp<BottomTabParamList, 'Profile'>;
const ProfileScreen = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<ProfileScreenRouteProp>(); // Type the route
  const { healthCardNumber } = route.params || {}; 
   const [lastName,setLastName] = useState(PERSONAL_INFO.LastName)
   const [email,setEmail] = useState(PERSONAL_INFO.Email)
   const [phone,setPhone] = useState(PERSONAL_INFO.PhoneNumber)
   const [dOB,setDOB] = useState(PERSONAL_INFO.DateOfBirth)
   const [preference,setPreference] = useState(PERSONAL_INFO.Preference)
 
 
  const [profileInfo, setProfileInfo] = useState<PersonalInfo>(PERSONAL_INFO||null); // Use null initially
  useEffect(  ()=>{

    const response = fetch(`${API_HOME}/api/profile/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        healthCardNumber: healthCardNumber,
      }),
    })
    .then((response)=>response.json())
    .then((data)=>{
setProfileInfo(data);
    })



  },[])
  // const displayInfo =PERSONAL_INFO;
  const displayInfo = profileInfo || PERSONAL_INFO;
  const [firstName,setFirstName] = useState(displayInfo.FirstName)
  const params = {
    healthCardNumber: healthCardNumber,
    firstName: displayInfo.FirstName,
    lastName: displayInfo.LastName,
    dOB: displayInfo.DateOfBirth,
    email: displayInfo.Email,
    Clinic: displayInfo.Clinic,
    phoneNumber: displayInfo.PhoneNumber,
    preference: displayInfo.Preference
  };
  console.log('debugging with params:',params);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Personal Information</Text>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image 
            source={require('../../../assets/images/profile-placeholder.png')} 
            style={styles.profileImage}
          />
          <Text style={styles.name}>{displayInfo.FirstName}</Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <InfoItem label="Health card number" value={displayInfo.HealthCareNumber} />
          <InfoItem label="Date of birth" value={displayInfo.DateOfBirth} />
          {/* <InfoItem label="Sex" value={PERSONAL_INFO.sex} /> */}
          {/* <InfoItem label="Pronouns" value={PERSONAL_INFO.pronouns} /> */}
          <InfoItem label="Phone" value={displayInfo.PhoneNumber} />
          <InfoItem label="Email" value={displayInfo.Email} />
        </View>

        {/* Edit Button */}
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile',params)}
        >
          <Text style={styles.editButtonText}>Edit</Text>
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
    textAlign:"center",
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
    marginBottom: 80,
  },
  editButtonText: {
    color: colors.base.white,
    fontSize: 14,
    fontWeight: 'semibold',
  },
});

export default ProfileScreen; 