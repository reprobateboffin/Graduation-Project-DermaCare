import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, ImageBackground, SafeAreaView, Animated } from 'react-native';
import SubHeader from './SubHeader';
import { Ionicons } from '@expo/vector-icons';
import Prediction from '../../components/Prediction';

const SkinCancerConcern = () => {
  const [fadeAnim] = useState(new Animated.Value(1)); // Start fully visible
  useEffect(() => {
    const loopAnimation = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true })
      ]).start(() => loopAnimation());
    };

    loopAnimation(); // Start the animation loop
  }, [fadeAnim]);
  return (
    <ImageBackground 
      source={require('../../../assets/images/doctor-patient.png')} 
      style={styles.container}
    >
      <View style={styles.overlay} />
      <SubHeader />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Skin Cancer Concern</Text>
          <View style={styles.predictionContainer}>
            <Prediction />
            {/* Optional: Keep this button if you want a separate trigger */}
            {/* <Pressable style={styles.button} onPress={() => console.log('Camera Pressed')}>
              <Ionicons name="camera-outline" size={30} color="white" />
            </Pressable> */}
          </View>
          <Animated.Text style={{ color: "red", fontSize: 18, fontWeight: "bold", opacity: fadeAnim }}>
        Warning! Only scan if you have visual signs of cancer, this isn't a detection software but a prediction one.
      </Animated.Text>       
      
         <Text style={styles.sectionTitle}>What is Skin Cancer?</Text>
          <Text style={styles.paragraph}>
            Skin cancer is the abnormal growth of skin cells, often triggered by exposure to ultraviolet (UV) radiation. 
            It is one of the most common types of cancer worldwide and can be classified into different types.
          </Text>

          <Text style={styles.sectionTitle}>Types of Skin Cancer</Text>
          <Text style={styles.paragraph}>
            1️⃣ **Basal Cell Carcinoma (BCC):** The most common type, appearing as a pearly or waxy bump.
          </Text>
          <Text style={styles.paragraph}>
            2️⃣ **Squamous Cell Carcinoma (SCC):** Can appear as a scaly red patch, open sore, or wart-like growth.
          </Text>
          <Text style={styles.paragraph}>
            3️⃣ **Melanoma:** The deadliest form, often developing from existing moles or as new dark spots on the skin.
          </Text>
          <Text style={styles.paragraph}>
            4️⃣ **Merkel Cell Carcinoma:** A rare but aggressive type that grows quickly and spreads rapidly.
          </Text>

          <Text style={styles.sectionTitle}>7 Classes in HAM10000 Dataset</Text>
          <Text style={styles.paragraph}>
            The HAM10000 dataset contains images of **7 types of skin lesions**, essential for training deep learning models.
          </Text>

          <Text style={styles.listItem}>🔹 **akiec (Actinic Keratoses and Intraepithelial Carcinoma):** Precancerous lesions that may turn into SCC.</Text>
          <Text style={styles.listItem}>🔹 **bcc (Basal Cell Carcinoma):** The most common, slow-growing skin cancer.</Text>
          <Text style={styles.listItem}>🔹 **bkl (Benign Keratosis-like Lesions):** Non-cancerous, may resemble malignant tumors.</Text>
          <Text style={styles.listItem}>🔹 **df (Dermatofibroma):** A benign skin tumor appearing as a firm, reddish-brown nodule.</Text>
          <Text style={styles.listItem}>🔹 **mel (Melanoma):** Highly aggressive and dangerous; early detection is critical.</Text>
          <Text style={styles.listItem}>🔹 **nv (Melanocytic Nevus):** Commonly known as moles, usually harmless but some may develop into melanoma.</Text>
          <Text style={styles.listItem}>🔹 **vasc (Vascular Lesions):** Blood vessel abnormalities, including angiomas and hemorrhages.</Text>

         
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure ImageBackground fills the screen
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#016C9D",
    opacity: 0.8,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20, // Move padding here for scrollable content
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // White text to contrast with overlay
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'black', // White text
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    color: 'cyan', // White text
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    color: '#fff', // White text
    marginBottom: 5,
  },
  predictionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    marginTop: 10,
  },
});

export default SkinCancerConcern;