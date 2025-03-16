<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { Picker } from "@react-native-picker/picker";
import { FlatList } from 'react-native-gesture-handler';
interface Appointments {
  id: string,
  time: string,
  doctor: string
}

const BookAppointmentScreen = () => {
  const [selectedClinic,setSelectedClinic] = useState('Down Town')
  const [appointments,setAppointments] = useState<Appointments[]>([
    {
      id:'1',
      time: '9:00',
      doctor: 'John Doe'
    }, {
      id:'2',
      time: '10:00',
      doctor: 'John Doe'
    }, {
      id:'3',
      time: '11:00',
      doctor: 'John Doe'
    }, {
      id:'4',
      time: '12:00',
      doctor: 'John Doe'
    }, {
      id:'5',
      time: '13:00',
      doctor: 'John Doe'
    },
    
  ])
  return (
      <ImageBackground source={require('../../../assets/images/doctor-patient.png')} style={styles.container}>
      <View style={styles.overlay}></View>
           <SafeAreaView style={styles.innerContainer}>     
             <View style={styles.titleContainer}>
               <Text style={styles.title}>Book Appointment</Text>
             </View>
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

  <FlatList data={appointments}     
  keyExtractor={(item)=>item.id}
 renderItem={({item})=>{
return (
  <View style={styles.appointmentRow}>
  {/* ID & Doctor's Name */}
  <Text style={styles.appointmentText}>{item.id}. {item.doctor}</Text>

  {/* Time */}
  <Text style={styles.timeText}>{item.time}</Text>

  {/* Book Appointment Button */}
  <TouchableOpacity style={styles.bookButton}>
    <Text style={styles.buttonText}>Book</Text>
  </TouchableOpacity>
</View>
)
 }}/>
  <View>


  </View>

           </SafeAreaView>
         </ImageBackground>


  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.base.white,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#016C9D",
//     opacity: 0.8,
//   },
//   innerContainer: {
//     flex: 1,
//     width: '100%',
//   },
//   header: {
//     padding: 16,
//     backgroundColor: colors.primary.green,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: colors.base.white,
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//     color: colors.base.black,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items to the top
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#016C9D",
    opacity: 0.8,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center', // Center content horizontally
    paddingTop: 50, // Adjust padding to move content downward
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center', // Center title horizontally
    marginBottom: 20, // Space between title and Picker
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  pickerContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden',
    height: 50, // Increase height for better UI
  },
  picker: {
    width: '100%',
    height: '100%',
    color: 'gray',
  },
  appointmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent', // Make the row transparent
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)', // Light white separator
  },
  appointmentText: {
    fontSize: 16,
    color: 'white',
    flex: 1, // Pushes time & button to the right
  },
  timeText: {
    fontSize: 16,
    color: 'lightgray',
    flex: 1, // Allow spacing between doctor name and button
    textAlign: 'center',
  },
  bookButton: {
    backgroundColor: '#3CB043', // Parrot green color
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
=======
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';

const BookAppointmentScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BookAppointmentScreen</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.text}>BookAppointment Page...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.white,
  },
  header: {
    padding: 16,
    backgroundColor: colors.primary.green,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.base.white,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.base.black,
>>>>>>> 4552fdd4648e9ff3d0f2900a1c218803efc7fccd
  },
});

export default BookAppointmentScreen; 