import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Router';
import * as ImagePicker from 'expo-image-picker';
import { BottomTabParamList } from '../../navigation/BottomTabs';
import { API_HOME } from '../auth/config';
// import UploadProfilePicture from './UploadProfilePicture';


interface InputFieldProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void; // Accept onChangeText as a prop
}
interface EditProfileScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}
// interface PersonalInfo {  
//   HealthCareNumber: string;

//   FirstName: string;
//   LastName: string;
//   DateOfBirth: string;
//   Email: string;
//   PhoneNumber: string;
//   Preference:string;
  
// }

// const PERSONAL_INFO: PersonalInfo = {
//   FirstName: "Santiago",
//   LastName: "Silva",
//   HealthCareNumber: "12",
//   DateOfBirth: "2001/01/18",
  
//   PhoneNumber: "306 (123) 4567",
//   Email: "santiago@pgrminc.com",
//   Preference: "Phone"
// };
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EditProfile'>;
// interface InputFieldProps {
//   label: string;
//   value?: string;
// }
const EditProfileScreen: React.FC<EditProfileScreenProps> = () => {
  const route = useRoute<ProfileScreenRouteProp>(); // Type the route
    const { healthCardNumber,firstName,lastName, dOB,email,phoneNumber,Clinic,preference } = route.params || {}; 
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [image, setImage] = React.useState<string | null>(null);
  // const [firstName,setFirstName] = useState('')
  // const [lastName,setLastName] = useState('')
  // const [email,setEmail] = useState('')
  // const [phone,setPhone] = useState('')
  // const [dOB,setDOB] = useState('')
  // const [preference,setPreference] = useState('')
  useEffect(()=>{
  },[])

    // const response = fetch(`${API_HOME}/api/profile/`,{
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     healthCardNumber: healthCardNumber,
    //   }),
    // })
    // .then((response)=>response.json())
    // .then((data)=>{
    //   setFirstName(data.FirstName)
    //   setLastName(data.LastName)
    //   setDOB(data.DateOfBirth)
    //   setEmail(data.Email)
    //   setPhone(data.PhoneNumber)
    //   console.log(data);
     
    // })
    
    const [updatedHealthCardNumber, setUpdatedHealthCardNumber] = useState(healthCardNumber);
    const [updatedFirstName, setUpdatedFirstName] = useState(firstName);
  const [updatedLastName, setUpdatedLastName] = useState(lastName);
  const [updatedDOB, setUpdatedDOB] = useState(dOB);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedClinic, setUpdatedClinic] = useState(Clinic);

  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(phoneNumber);
  const [updatedPreference, setUpdatedPreference] = useState(preference);
    
  // const [healthCardNumber,setHealthCardNumber] = useState()
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Permission required to access photos!');
      return;
    }




    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

const dataToUpdate= {
  HealthCareNumber:updatedHealthCardNumber,
  Clinic: updatedClinic,
  FirstName:updatedFirstName,
  LastName: updatedLastName,
  DateOfBirth:updatedDOB,
  Email: updatedEmail,
  PhoneNumber: updatedPhoneNumber,
  Preference: updatedPreference
}
  const handleSubmit = async() =>{
    const response = await fetch(`${API_HOME}/api/update-user/`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( dataToUpdate ),
    })
    .then((response)=>response.json())
    .then((data)=>{

      console.log(data);
      console.log(updatedHealthCardNumber);

    })
    navigation.goBack()


  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.base.black} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Personal Information</Text>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
           <Image 
              source={image ? { uri: image } : require('../../../assets/images/profile-placeholder.png')} 
              style={styles.profileImage}
            /> 
            {/* <UploadProfilePicture /> */}
            <View style={styles.editImageButton}>
              <Ionicons name="camera" size={20} color={colors.base.white} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        {/* <View style={styles.form}> */}
        <InputField label="health card number" value={healthCardNumber} onChangeText={setUpdatedHealthCardNumber} />
        <InputField label="First Name" value={updatedFirstName} onChangeText={setUpdatedFirstName} />
        <InputField label="Last Name" value={updatedLastName} onChangeText={setUpdatedLastName} />
        <InputField label="Date of Birth" value={updatedDOB} onChangeText={setUpdatedDOB} />
        <InputField label="Email" value={updatedEmail} onChangeText={setUpdatedEmail} />
        <InputField label="Phone Number" value={updatedPhoneNumber} onChangeText={setUpdatedPhoneNumber} />
        <InputField label="Preference" value={updatedPreference} onChangeText={setUpdatedPreference} />
{/* navigation.goBack() */}
        {/* Done Button */}
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={handleSubmit}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};



const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      placeholder=""
       onChangeText={onChangeText} // Add onChangeText prop here
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: colors.base.lightGray,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 61,
    color: colors.base.black,
    marginBottom: 28,
    textAlign: "center",
    alignSelf: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  profileImageContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary.green,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.base.black,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.base.black,
  },
  // input: {
  //   width: '100%',
  //   height: 48,
  //   backgroundColor: colors.base.lightGray,
  //   borderRadius: 8,
  //   paddingHorizontal: 16,
  //   fontSize: 16,
  // },
  doneButton: {
    backgroundColor: colors.primary.green,
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 12,
    width: 114,
    alignItems: 'center',
    marginBottom: 45,
    marginTop: 45,
    alignSelf: 'center',
  },
  doneButtonText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfileScreen; 

function setImage(uri: string) {
  throw new Error('Function not implemented.');
}
