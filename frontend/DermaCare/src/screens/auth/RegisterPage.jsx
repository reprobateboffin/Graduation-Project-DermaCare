import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';
import Svg from 'react-native-svg';
import AuthHeader from "../../components/Header/AuthHeader";
import { Picker } from "@react-native-picker/picker";
import { API_HOME } from './config';


const { height, width } = Dimensions.get('window');

const RegisterPage = ({ navigation }) => {

const [healthCardNumber, setHealthCardNumber] = useState('1234');

const [selectedClinic,setSelectedClinic] = useState('Down Town')


handleSubmit = async () =>{
  const response = await fetch(`${API_HOME}/api/check-existence/`,{
    method: "POST",
    headers:{
      'Content-Type': 'application/json'

    },
    body:JSON.stringify({healthCareNumber : healthCardNumber })
  })

const data = await response.json();
alert(`User ${data.message}`)
if(data.message === "Already Exists"){
  navigation.navigate("MainTabs")
}
else if (data.message === "NotRegistered"){
  navigation.navigate('RegisterPage2', {healthCardNumber,selectedClinic})
}

}

  return (
    <View style={styles.container}>
                    <View style={styles.whiteBackground}>
      

<AuthHeader
        navigation={navigation}
        currentStep={4} // You can dynamically set this value based on your logic
        totalSteps={4} // Total steps in your process
      />
      {/* Top Image covering upper part */}
                      <View style={styles.topImageWrapper}>
      
      <ImageBackground source={require('../../../assets/bgimgrg.png')} style={styles.topImage} />
</View>

      {/* Bottom Image overlapping top image */}
                      <View style={styles.bottomImageWrapper}>
      
      <ImageBackground source={require('./image.jpg')} style={styles.bottomImage}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Register</Text>
          <Text style={{ marginRight: '90', marginBottom: '20', color: 'white' }}>Provide your health card number</Text>
          <TextInput
            style={styles.input}
            placeholder="Health Card Number"
            placeholderTextColor="#ddd"
            value={healthCardNumber}
            onChangeText={(text)=>{setHealthCardNumber(text)}}
          />
          <Text style={{ marginRight: '180', marginBottom: '20', color: 'white' }}>Choose your clinic</Text>

          {/* <TextInput
            style={styles.input}
            placeholder="Choose Your Clinic"
            placeholderTextColor="#ddd"
          /> */}
        <View style={styles.pickerContainer}>
  <Picker
    selectedValue={selectedClinic}
    onValueChange={(itemValue) => setSelectedClinic(itemValue)}
    style={styles.picker}
    dropdownIconColor="gray" // Optional: Change dropdown arrow color
  >
    <Picker.Item label="Choose Your Clinic" value="" />
    <Picker.Item label="Down Town" value="clinicA" />
    <Picker.Item label="Manhattan" value="clinicB" />
  </Picker>
</View>

          <Svg
            width={250}
            height={50}
            style={{ marginBottom: 20, padding: 0 }}
            source={require('../../../assets/statusadv.svg')} // Use the path to your SVG file
          />
          <Pressable style={styles.registerButton} onPress={() => handleSubmit()}>
            <Text style={styles.registerButtonText}>Next</Text>
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
    backgroundColor: 'transparent',
  },
  topImageWrapper: {
    width: width * 0.9,
    height: height * 0.7, // 70% of screen height
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    top:height*0.1,
  },
  topImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bottomImageWrapper: {
    width: width ,
    height: height * 0.57, // 50% of screen height
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    position: "absolute",
    bottom: height * -0.02, // Overlaps 20% of the top image
    zIndex: 2,
  },
  bottomImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'gray',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  registerButton: {
    width: '88%',        // Make button the same width as the TextInput
    height: 50,           // Adjust the height of the button
    backgroundColor: '#32CD32', // Parrot Green color
    justifyContent: 'center',
    borderRadius: 25,         // Apply border radius for rounded corners
    alignItems: 'center',
    marginTop: 0,        // Add space between button and previous field
    marginBottom: 30,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: "white",
  },
  pickerContainer: {
    width: '90%',
    height: '55',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',  // Ensures border radius is applied
  },
  picker: {
    width: '100%',
    height: '100%',
    color: 'gray',
  },
  
});

export default RegisterPage;
