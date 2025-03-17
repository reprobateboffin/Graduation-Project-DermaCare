// import React, { useState, useEffect, useRef } from "react";
// import { View, Text, Pressable, Image, Alert } from "react-native";
// import { CameraView, Camera } from "expo-camera"; // Import CameraView and Camera

// export default function Prediction() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [imageUri, setImageUri] = useState(null);
//   const [base64Image, setBase64Image] = useState(null);
//   const [message, setMessage] = useState("");
//   const [cameraOpen, setCameraOpen] = useState(false);
//   const cameraRef = useRef(null);

//   const label_mapping = {
//     0: "nv",
//     1: "mel",
//     2: "bkl",
//     3: "bcc",
//     4: "akiec",
//     5: "vasc",
//     6: "df",
//   };

//   // Request camera permissions on component mount
//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//       if (status !== "granted") {
//         Alert.alert("Permission Denied", "Camera access is required to capture images.");
//       }
//     })();
//   }, []);

//   // Function to send image to backend
//   const sendImageToBackend = async (base64Image) => {
//     if (!base64Image) {
//       Alert.alert("Error", "No image captured!");
//       return;
//     }

//     try {
//       const response = await fetch("http://192.168.1.106:8000/api/image/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: base64Image }),
//       });

//       const data = await response.json();
//       Alert.alert("Backend Response", JSON.stringify(data));
//       setMessage(label_mapping[data?.message] || "Error processing image");
//       console.log("Response from server:", data);
//     } catch (error) {
//       console.error("Error sending image:", error);
//       setMessage("Error: Could not process image");
//     }
//   };

//   // Open the camera and capture an image
//   const takePicture = async () => {
//     if (!cameraRef.current) {
//       Alert.alert("Error", "Camera not available!");
//       return;
//     }

//     try {
//       const photo = await cameraRef.current.takePictureAsync({ base64: true });
//       if (photo) {
//         setImageUri(photo.uri);
//         setBase64Image(photo.base64);
//         setCameraOpen(false); // Close camera after capturing
//         sendImageToBackend(photo.base64); // Automatically send image
//       }
//     } catch (error) {
//       console.error("Error capturing image:", error);
//       Alert.alert("Error", "Failed to capture image.");
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
//         Skin Cancer Detection
//       </Text>

//       {/* Open Camera Button */}
//       {!cameraOpen && (
//         <Pressable
//           style={{
//             backgroundColor: "#007AFF",
//             padding: 15,
//             borderRadius: 10,
//             margin: 10,
//           }}
//           onPress={() => setCameraOpen(true)}
//         >
//           <Text style={{ color: "white", fontWeight: "bold" }}>Open Camera</Text>
//         </Pressable>
//       )}

//       {/* Camera View */}
//       {cameraOpen && hasPermission && (
//         <CameraView
//           style={{ width: 300, height: 400 }}
//           facing="back" // Use 'facing' prop instead of 'type'
//           ref={(ref) => (cameraRef.current = ref)} // Ensure ref is assigned
//         >
//           <Pressable
//             style={{
//               position: "absolute",
//               bottom: 20,
//               left: "50%",
//               transform: [{ translateX: -25 }],
//               backgroundColor: "white",
//               padding: 10,
//               borderRadius: 50,
//             }}
//             onPress={takePicture}
//           >
//             <Text>📸</Text>
//           </Pressable>
//         </CameraView>
//       )}

//       {/* Show Captured Image */}
//       {imageUri && (
//         <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />
//       )}

//       {/* Show Response Message */}
//       {message && (
//         <View style={{ marginTop: 20 }}>
//           <Text style={{ fontSize: 18, color: "green" }}>{message}</Text>
//         </View>
//       )}
//     </View>
//   );
// }



import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
import { CameraView, Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator"; // Add this for resizing
import { Ionicons } from '@expo/vector-icons';

export default function Prediction() {
  const [hasPermission, setHasPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [message, setMessage] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);
  const cameraRef = useRef(null);

  const label_mapping = {
    0: "nv",
    1: "mel",
    2: "bkl",
    3: "bcc",
    4: "akiec",
    5: "vasc",
    6: "df",
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Camera access is required to capture images.");
      }
    })();
  }, []);

  const sendImageToBackend = async (base64Image) => {
    if (!base64Image) {
      Alert.alert("Error", "No image captured!");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.106:8000/api/image/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: base64Image }),
      });

      const data = await response.json();
      Alert.alert("Backend Response", JSON.stringify(data)); // Debug response
      setMessage(label_mapping[data?.message] || "Error processing image");
    } catch (error) {
      Alert.alert("Fetch Error", error.message);
      setMessage("Error: Could not process image");
    }
  };

  const takePicture = async () => {
    if (!cameraRef.current) {
      Alert.alert("Error", "Camera not available!");
      return;
    }

    try {
      // Capture the image
      const photo = await cameraRef.current.takePictureAsync();

      // Resize and compress the image
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 224, height: 224 } }], // Resize to 224x224 (adjust as needed)
        { compress: 0.7, format: "jpeg", base64: true } // Compress and get base64
      );

      if (manipulatedImage) {
        setImageUri(manipulatedImage.uri);
        setBase64Image(manipulatedImage.base64);
        setCameraOpen(false);
        sendImageToBackend(manipulatedImage.base64);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to capture or process image: " + error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
                  Having Symptoms of Cancer? See what kind of Disease you could possible have 
              </Text>

      {!cameraOpen && (
        <Pressable
          style={{
            backgroundColor: "#007AFF",
            padding: 15,
            borderRadius: 10,
            margin: 10,
          }}
          onPress={() => setCameraOpen(true)}
        >
              <Ionicons name="camera-outline" size={30} color="white" />
              </Pressable>
      )}

      {cameraOpen && hasPermission && (
        <CameraView
          style={{ width: 300, height: 400 }}
          facing="back"
          ref={(ref) => (cameraRef.current = ref)}
        >
          <Pressable
            style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: [{ translateX: -25 }],
              backgroundColor: "white",
              padding: 10,
              borderRadius: 50,
            }}
            onPress={takePicture}
          >
            <Text>📸</Text>
          </Pressable>
        </CameraView>
      )}

      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />
      )}

      {message && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, color: "green" }}>{message}</Text>
        </View>
      )}
    </View>
  );
}