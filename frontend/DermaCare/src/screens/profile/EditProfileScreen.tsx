
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../theme/colors';
import { RootStackParamList } from '../../navigation/Router';
import { API_HOME } from '../auth/config';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EditProfile'>;

interface InputFieldProps {
  label: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const EditProfileScreen: React.FC = () => {
  const route = useRoute<ProfileScreenRouteProp>();
  const { healthCardNumber, firstName, lastName, dOB, email, phoneNumber, Clinic, preference, profile_picture } = route.params || {};
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [image, setImage] = useState<string | null>(null);
  const [updatedHealthCardNumber, setUpdatedHealthCardNumber] = useState(healthCardNumber);
  const [updatedFirstName, setUpdatedFirstName] = useState(firstName);
  const [updatedLastName, setUpdatedLastName] = useState(lastName);
  const [updatedDOB, setUpdatedDOB] = useState(dOB);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(phoneNumber);
  const [updatedClinic, setUpdatedClinic] = useState(Clinic);
  const [updatedPreference, setUpdatedPreference] = useState(preference);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to allow access to your photos.');
      return;
    }
   
// useEffect(() =>{
//   const func = async ()=>{
  
//    await fetch(`${API_HOME}/api/get-pfp`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ HealthCareNumber: updatedHealthCardNumber }), // Sending HealthCareNumber
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.error) {
// console.log(data.error);
//         } else {
//           setImage(data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//     }
//     func()
// } ,[updatedHealthCardNumber])

// useFocusEffect(
//   useCallback(() => {
//     const fetchProfilePicture = async () => {
//       try {
//         const response = await fetch(`${API_HOME}/api/get-pfp/`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ HealthCareNumber: updatedHealthCardNumber }),
//         });

//         const data = await response.json();
//         if (data.error) {
//           console.log(data.error);
//         } else {
//           setImage(data.profile_picture);
//           alert(data)
//           console.log(data);
//         }
//       } catch (error) {
//         console.error('Error fetching profile picture:', error);
//       }
//     };

//     fetchProfilePicture();
//   }, [updatedHealthCardNumber])
// );

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // Updated from ImagePicker.MediaTypeOptions.Images
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("HealthCareNumber", updatedHealthCardNumber || '');
    formData.append("Clinic", updatedClinic || '');
    formData.append("FirstName", updatedFirstName || '');
    formData.append("LastName", updatedLastName || '');
    formData.append("DateOfBirth", updatedDOB || '');
    formData.append("Email", updatedEmail || '');
    formData.append("PhoneNumber", updatedPhoneNumber || '');
    formData.append("Preference", updatedPreference || '');

    if (image) {
      const fileName = image.split('/').pop() || 'profile.jpg';
      const fileType = fileName.split('.').pop() || 'jpeg';
      formData.append("profile_picture", {
        uri: image,
        name: fileName,
        type: `image/${fileType}`,
      } as any);
    }
    else{
      console.log("No Image Selected");
    }
    console.log('FormData contents:');
    for (let [key, value] of (formData as any).entries()) {
      console.log(`Hi ${key}: ${JSON.stringify(value)}`);
    }
    try {
      const response = await fetch(`${API_HOME}/api/update-user/`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Accept': 'application/json',

          // 'Content-Type': 'multipart/form-data', // ✅ Add this
        },
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully!');
        navigation.goBack();
      } else {
        Alert.alert( `${result.message}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.base.black} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Personal Information</Text>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
            <Image
              source={image ? { uri: image } :{uri:profile_picture}}
              style={styles.profileImage}
            />
            <View style={styles.editImageButton}>
              <Ionicons name="camera" size={20} color={colors.base.white} />
            </View>
          </TouchableOpacity>
        </View>
        <InputField label="Health Card Number" value={updatedHealthCardNumber} onChangeText={setUpdatedHealthCardNumber} />
        <InputField label="First Name" value={updatedFirstName} onChangeText={setUpdatedFirstName} />
        <InputField label="Last Name" value={updatedLastName} onChangeText={setUpdatedLastName} />
        <InputField label="Date of Birth" value={updatedDOB} onChangeText={setUpdatedDOB} />
        <InputField label="Email" value={updatedEmail} onChangeText={setUpdatedEmail} />
        <InputField label="Phone Number" value={updatedPhoneNumber} onChangeText={setUpdatedPhoneNumber} />
        <InputField label="Preference" value={updatedPreference} onChangeText={setUpdatedPreference} />
        <TouchableOpacity style={styles.doneButton} onPress={handleSubmit}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      placeholder=""
      onChangeText={onChangeText}
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
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.base.black,
  },
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