// import React, { useState } from "react";
// import { View, Button, Image, Alert } from "react-native";
// import * as ImagePicker from "react-native-image-picker";
// import { API_HOME } from "../auth/config";
// const UploadProfilePicture = () => {
//   const [imageUri, setImageUri] = useState<string | null>(null);

//   const pickImage = () => {
//     ImagePicker.launchImageLibrary({ mediaType: "photo" }, (response) => {
//       if (response.didCancel) {
//         console.log("User cancelled image picker");
//         return;
//       }

//       if (response.errorMessage) {
//         console.error("Image Picker Error:", response.errorMessage);
//         Alert.alert("Error", "Failed to pick image!");
//         return;
//       }

//       if (response.assets && response.assets.length > 0) {
//         const selectedImage = response.assets[0];
//         setImageUri(selectedImage.uri ?? null);
//         uploadImage(selectedImage);
//       }
//     });
//   };

//   const uploadImage = async (imageAsset: ImagePicker.Asset) => {
//     if (!imageAsset.uri) {
//       Alert.alert("Error", "Invalid image selected.");
//       return;
//     }

//     let formData = new FormData();
//     formData.append("profile_picture", {
//       uri: imageAsset.uri,
//       name: "profile.jpg",
//       type: imageAsset.type || "image/jpeg",
//     } as any);

//     try {
//       let res = await fetch(`${API_HOME}/api/upload-pfp/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Add token if needed
//         },
//         body: formData,
//       });

//       let data = await res.json();
//       if (res.ok) {
//         Alert.alert("Success", "Profile picture uploaded!");
//         console.log("Image URL:", data.image_url);
//       } else {
//         Alert.alert("Error", "Upload failed!");
//       }
//     } catch (err) {
//       console.error("Upload Error:", err);
//       Alert.alert("Error", "An error occurred while uploading.");
//     }
//   };

//   return (
//     <View>
//       {imageUri && (
//         <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, borderRadius: 50 }} />
//       )}
//       <Button title="Pick an Image" onPress={pickImage} />
//     </View>
//   );
// };

// export default UploadProfilePicture;
