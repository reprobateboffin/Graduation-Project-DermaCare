import AuthHeader from "../../components/Header/AuthHeader";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
} from "react-native";
import Svg from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
const { height, width } = Dimensions.get("window");

const WeFoundYou = ({ navigation }) => {
 const  route = useRoute()
  
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [currentStep,setCurrentStep] = useState(2);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Initial opacity is 0 (hidden)
const {healthCardNumber} = route.params || {};
  

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    });
  
    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    });
  
    const showContentTimer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
      setCurrentStep(3);
      fadeIn.start();
    }, 20);
  
    const navigateTimer = setTimeout(() => {
      // fadeOut.start(() => navigation.navigate("LoginVerification"));
      fadeOut.start(() => navigation.navigate("LoginVerification",{healthCardNumber}));
    }, 500);
  
    return () => {
      clearTimeout(showContentTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigation,healthCardNumber]);
  


  return (
    <View style={styles.container}>
              <View style={styles.whiteBackground}>

      {/* Header */}
      <AuthHeader
        navigation={navigation}
        currentStep={currentStep} // You can dynamically set this value based on your logic
        totalSteps={4} // Total steps in your process
      />
      {/* Background Image covering only bottom half */}
       <View style={styles.topImageWrapper}>
                 
              <ImageBackground source={require('../../../assets/bgimgrg2.jpg')} style={styles.topImage} />
             </View>
        <View style={styles.bottomImageWrapper}>

      <ImageBackground
        source={require("./image.jpg")}
        style={styles.imageBackground}
      >
        {/* Uniform Bottom Overlay */}
        <View style={styles.overlay}>
          {loading ? (
            // Show loading spinner for 2 seconds
            <ActivityIndicator size="large" color="#32CD32" />
          ) : showContent ? (
            // Show actual content after loading is complete for 5 seconds
            <Animated.View
              style={{ opacity: fadeAnim, width: "100%", alignItems: "center" }}
            >
              <Svg
                width={50}
                height={30}
                style={{ marginBottom: 20, padding: 0 }}
                source={require("../../../assets/greenprofile.svg")}
              />
              <Text style={styles.title}>We Found You</Text>
              <Text style={styles.description}>
                We have found your health card number in our system as a current
                patient, now you'll be redirected to the log in screen.
              </Text>
            </Animated.View>
          ) : null}
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
    justifyContent: "flex-end",
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
    height: height*0.50, // 50% of screen height
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    position: "absolute",
    bottom: height *-0.1, // Overlaps 20% of the top image
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
    fontSize: 22,
    fontWeight: "normal",
    color: "#32CD32",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "300",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  header: {
    height: 100, // Increase height
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    position: "absolute", // Keep it fixed at the top
    top: 0,
    width: "100%",
    zIndex: 10, // Ensure it's above other elements
  },
  iconContainer: {
    width: 40, // Fixed width for icons
    alignItems: "center", // Center icons
  },
  centerTextContainer: {
    flex: 1, // Take up remaining space
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  centerText: {
    fontSize: 40,
    color: "black", // Make text visible
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: "white",
  },
});


export default WeFoundYou;
