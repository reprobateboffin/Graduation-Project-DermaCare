import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { useAuthStore } from "../../store/useAuthStore";
import AuthHeader from "../../components/Header/AuthHeader";
const { height, width } = Dimensions.get("window");
import { useRoute } from "@react-navigation/native";
import { API_HOME } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VerificationCodeLogin = ({ navigation }) => {
    const route = useRoute();
   const params = route.params || {};
    const {healthCardNumber,verificationCode} = params;
    // const {healthCardNumber,verificationCode} = params;
    const [userCode,setUserCode] = useState('')
  const {setIsAuthenticated,setToken} = useAuthStore();
  //   async


const getJWTToken =  async (healthCardNumber,userCode) =>{
  try {
    const response = await fetch(`${API_HOME}/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        healthCardNumber, 
      }),
    });

    if (!response.ok) {
      // If the response is not successful, throw an error
      throw new Error('Error fetching token');
    }

    const data = await response.json();
    alert(data.token)
    // On success, store JWT token securely
    const { token } = data; // Assuming token is returned in the response
    try {
      await AsyncStorage.setItem('jwt_token', token);
      setToken(token);
    } catch (storageError) {
      console.error("Error storing JWT token:", storageError);
      alert("Token retrieved but failed to store it locally.");
      return; // Optionally stop execution here
    }
    // Update auth state to logged in
    setIsAuthenticated(true);

    // Navigate to MainTabs
    // navigation.navigate("MainTabs", { healthCardNumber });
  } catch (error) {
    console.error("Error fetching JWT token:", error);
    alert("There was an error with token retrieval.");
  }
}

  const handleSubmit = () => {
    // await
    alert(`user code is ${userCode} and verification code is ${verificationCode}`)

    setIsAuthenticated(true); // First update authentication
    // Then navigate
    // if(userCode == verificationCode){
    if(userCode == verificationCode){
      getJWTToken(healthCardNumber,userCode)
    navigation.navigate("MainTabs",{healthCardNumber});
  }
    else{
      alert(`wrong code`)
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.whiteBackground}>
    <AuthHeader
        navigation={navigation}
        currentStep={5} // You can dynamically set this value based on your logic
        totalSteps={5} // Total steps in your process
      />
      {/* Background Image covering only the bottom half */}
       <View style={styles.topImageWrapper}>
                 
              <ImageBackground source={require('../../../assets/bgimgrg2.jpg')} style={styles.topImage} />
             </View>  
        <View style={styles.bottomImageWrapper}>

      <ImageBackground
        source={require("./image.jpg")}
        style={styles.imageBackground}
      >
        {/* Form Overlay */}
        <View style={styles.overlay}>
          {/* Heading */}
          <Text style={styles.title}>Verification</Text>

          {/* Health Card Number Field */}
          <Text style={styles.label}>Enter the access code provided</Text>
          <TextInput
            style={styles.input}
            placeholder="acccess code"
            onChangeText={(text)=>{setUserCode(text)}}
            placeholderTextColor="#ddd"
            // keyboardType="numeric"
          />

          {/* Register Button */}
          <Pressable style={styles.registerButton} onPress={handleSubmit}>
            <Text style={styles.registerButtonText}>Submit</Text>
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
    justifyContent: "flex-end", // Push everything to the bottom
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
    height: height*0.7, // 50% of screen height
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    position: "absolute",
    bottom: height * -0.1, // Overlaps 20% of the top image
    zIndex: 2,
  },
  bottomImage: {
    width: "100%",
    height: height*0.70,
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
    fontSize: 30,
    color: "white",
    marginBottom: 20,
  },
  label: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    marginBottom: 35,
    marginLeft: "5%",
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "white",
    marginBottom: 90,
    borderWidth: 1,
    borderColor: "white",
  },
  registerButton: {
    width: "88%", // Make button the same width as the TextInput
    height: 50, // Adjust the height of the button
    backgroundColor: "#32CD32", // Parrot Green color
    justifyContent: "center",
    borderRadius: 10, // Apply border radius for rounded corners
    alignItems: "center",
    marginTop: 0, // Add space between button and previous field
    marginBottom: 30,
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: "white",},

});

export default VerificationCodeLogin;
