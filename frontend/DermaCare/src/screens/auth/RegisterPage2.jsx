import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AuthHeader from '../../components/Header/AuthHeader'; // Ensure this path is correct
import { useRoute } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns'; // For formatting dates
import TestDatePicker from './TestDatePicker';

const { height, width } = Dimensions.get('window');

const RegisterPage2 = ({ navigation }) => {
  const route = useRoute();
  const { healthCardNumber, selectedClinic } = route.params || {};

  const [firstName, setFirstName] = useState('Muhammad');
  const [lastName, setLastName] = useState('Akbar');
  const [dob, setDob] = useState('2004-01-12'); // Initial date as a valid Date object

  const handleRegister = () => {
    // if (!firstName || !lastName) {
    //   alert('Please fill in all fields.');
    //   return;
    // }
    try {
      //  navigation.navigate('DummyScreen')
      navigation.navigate('RegisterVerification', {
        firstName,
        lastName,
        dob,
        healthCardNumber,
        selectedClinic,
      });
    } catch (error) {
      console.error('Navigation error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteBackground}>
        <AuthHeader navigation={navigation} currentStep={4} totalSteps={4} />

        <View style={styles.topImageWrapper}>
          <ImageBackground
            source={require('../../../assets/bgimgrg2.jpg')} // Ensure this image exists
            style={styles.topImage}
          />
        </View>

        <View style={styles.bottomImageWrapper}>
          <ImageBackground
            source={require('./image.jpg')} // Ensure this image exists
            style={styles.bottomImage}
          >
            <View style={styles.overlay}>
              <Text style={styles.title}>Register</Text>

              {/* First Name */}
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#999"
                value={firstName}
                onChangeText={setFirstName}
              />

              {/* Last Name */}
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#999"
                value={lastName}
                onChangeText={setLastName}
              />

              {/* Date of Birth */}
              <Text style={styles.label}>Date of Birth</Text>
     <TestDatePicker  dob={dob} setDob={setDob}/>
     {/* <TextInput
  style={styles.input}
  placeholder="Date of Birth (YYYY-MM-DD)"
  value={dob}
  onChangeText={setDob}
/> */}

              {/* Register Button */}
              <Pressable style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Register</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: 'white',
  },
  topImageWrapper: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    top: height * 0.1,
  },
  topImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomImageWrapper: {
    width: width,
    height: height * 0.85,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    position: 'absolute',
    bottom: height * -0.12222,
    zIndex: 2,
  },
  bottomImage: {
    width: '100%',
    height: height * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 34,
    color: 'white',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
    marginLeft: '5%',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'gray',
  },
  registerButton: {
    width: '88%',
    height: 50,
    backgroundColor: '#32CD32',
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterPage2;