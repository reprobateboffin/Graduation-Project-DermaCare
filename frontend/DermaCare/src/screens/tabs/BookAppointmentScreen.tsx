// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, TouchableOpacity } from 'react-native';
// import { colors } from '../../theme/colors';
// import { Picker } from "@react-native-picker/picker";
// import { FlatList } from 'react-native-gesture-handler';
// import { RouteProp } from '@react-navigation/native';
// import { BottomTabParamList } from '../../navigation/BottomTabs';
// import { API_HOME } from '../auth/config';
// interface Appointments {
//   id: string,
//   time: string,
//   doctor: string,
//   booked: boolean,
//   date: Date,
//   clinicName: string,
//   healthCareNumber: string | null;
// }
// type BookAppointmentScreenProps = {
//   route: RouteProp<BottomTabParamList, 'BookAppointment'>;
// };
// const BookAppointmentScreen: React.FC<BookAppointmentScreenProps> = ({ route }) => {

//   const params = route?.params || {};
//   const { healthCardNumber } = params;

//   const [selectedClinic,setSelectedClinic] = useState('Down Town')
  
//   const [appointments1,setAppointments1] = useState<Appointments[]>([]) ;
//   const [appointments2,setAppointments2] = useState<Appointments[]>([]);
  
//   useEffect(() => {
//     fetch(`${API_HOME}/api/appointments/`)
//       .then((response) => response.json())
//       .then((data) => {
//         setAppointments1(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching appointments:", error);
//         setLoading(false);
//       });
//   }, []);

//   const handleAppointmentPress = (id:number) =>{
//       fetch(`${API_HOME}/api/book-appointment/${id}/`,{
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           appointment_id: id,
//           healthCardNumber: healthCardNumber,
//         }),
//       })
//       .then((response)=> response.json())
//       .then((data)=>{console.log(data.message)
//         setAppointments1((prevAppointments) =>
//           prevAppointments.map((appointment) =>
//             parseInt(appointment.id) === id
//               ? { ...appointment, booked: true }
//               : appointment
//           )
//         );
        
//         }

//       )
//       .then((error)=>{
// console.log("error has occured")      })
//   }
//   return (
//     <ImageBackground source={require('../../../assets/images/doctor-patient.png')} style={styles.container}>
//       <View style={styles.overlay}></View>
//       <SafeAreaView style={styles.innerContainer}>
//         <View style={styles.titleContainer}>
//           <Text style={styles.title}>Book Appointment</Text>
//         </View>
//         <Text>{healthCardNumber ? `HealthCard: ${healthCardNumber}` : 'None provided'}</Text>
//         <View style={styles.pickerContainer}>
//           <Picker
//             selectedValue={selectedClinic}
//             onValueChange={(itemValue) => setSelectedClinic(itemValue)}
//             style={styles.picker}
//             dropdownIconColor="gray"
//           >
//             <Picker.Item label="Choose Your Clinic" value="" />
//             <Picker.Item label="Down Town" value="clinicA" />
//             <Picker.Item label="Manhattan" value="clinicB" />
//           </Picker>
//         </View>
  
//         {/* Debug Info */}
//         <View style={{ marginTop: 10 }}>
//           <Text style={{ color: 'white', fontSize: 14 }}>
//             Total Appointments: {appointments1.length}
//           </Text>
//           <Text style={{ color: 'white', fontSize: 14 }}>
//             Booked: {appointments1.filter(item => item.booked === true).length}
//           </Text>
//           <Text style={{ color: 'white', fontSize: 14 }}>
//             Unbooked: {appointments1.filter(item => item.booked === false).length}
//           </Text>
//         </View>
  
//         {/* Booked Appointments Section */}
//         {/* <View style={{ marginTop: 20 }}>
//           <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
//             Your Booked Appointments
//           </Text>
//           {appointments1.filter(item => item.booked === true).length > 0 ? (
//             <FlatList
//               data={appointments1.filter(item => item.booked === true)}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => (
//                 <View style={styles.appointmentRow}>
//                   <Text style={styles.appointmentText}>
//                     {item.id}. {item.doctor} at {item.clinicName}
//                   </Text>
//                   <Text style={styles.timeText}>{item.time}</Text>
//                 </View>
//               )}
//             />
//           ) : (
//             <Text style={{ color: 'white', fontSize: 16 }}>No booked appointments</Text>
//           )}
//         </View> */}
  
//         {/* Unbooked Appointments Section */}
//         <View style={{ marginTop: 20 }}>
//           <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
//             Available Appointments
//           </Text>
//           {appointments1.filter(item => !item.booked === false).length > 0 ? (
//             <FlatList
//               data={appointments1.filter(item => !item.booked == false)}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => (
//                 <View style={styles.appointmentRow}>
//                   <Text style={styles.appointmentText}>
//                     {item.id}. {item.doctor} at {item.clinicName}
//                   </Text>
//                   <Text style={styles.timeText}>{item.time}</Text>
//                   <TouchableOpacity
//                     style={styles.bookButton}
//                     onPress={() => handleAppointmentPress(Number(item.id))}
//                   >
//                     <Text style={styles.buttonText}>Book</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             />
//           ) : (
//             <Text style={{ color: 'white', fontSize: 16 }}>No available appointments</Text>
//           )}
//         </View>
//       </SafeAreaView>
//     </ImageBackground>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start', // Align items to the top
//     alignItems: 'center',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#016C9D",
//     opacity: 0.8,
//   },
//   innerContainer: {
//     flex: 1,
//     width: '100%',
//     alignItems: 'center', // Center content horizontally
//     paddingTop: 50, // Adjust padding to move content downward
//   },
//   titleContainer: {
//     width: '100%',
//     alignItems: 'center', // Center title horizontally
//     marginBottom: 20, // Space between title and Picker
//   },
//   title: {
//     color: 'white',
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   pickerContainer: {
//     width: '90%',
//     backgroundColor: 'white',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: 'white',
//     overflow: 'hidden',
//     height: 50, // Increase height for better UI
//   },
//   picker: {
//     width: '100%',
//     height: '100%',
//     color: 'gray',
//   },
//   appointmentRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: 'transparent', // Make the row transparent
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     width: '100%',
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255, 255, 255, 0.3)', // Light white separator
//   },
//   appointmentText: {
//     fontSize: 16,
//     color: 'white',
//     flex: 1, // Pushes time & button to the right
//   },
//   strikedThrough: {
//     textDecorationLine: 'line-through',  // Adds the strikethrough line
//     color: 'gray', // Optional: change the color of crossed-out items to gray
//   },
//   disabledButton: {
//     backgroundColor: '#D3D3D3', // Light gray color for the disabled button
//   },
//   timeText: {
//     fontSize: 16,
//     color: 'lightgray',
//     flex: 1, // Allow spacing between doctor name and button
//     textAlign: 'center',
//   },
//   bookButton: {
//     backgroundColor: '#3CB043', // Parrot green color
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });

// export default BookAppointmentScreen; 

// function setLoading(arg0: boolean) {
//   throw new Error('Function not implemented.');
// }




import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { Picker } from "@react-native-picker/picker";
import { FlatList } from 'react-native-gesture-handler';
import { BottomTabParamList } from '../../navigation/BottomTabs';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { API_HOME } from '../auth/config';
interface Appointments {
  id: string,
  time: string,
  doctor: string,
  booked: boolean,
  date: Date,
  clinicName: string,
  healthCardNumber: string | null;
}
type BookAppointmentScreenProps = {
  route: RouteProp<BottomTabParamList, 'BookAppointment'>;
};
const BookAppointmentScreen: React.FC<BookAppointmentScreenProps> = ({ route }) => {

  const params = route?.params || {};
  const { healthCardNumber } = params;

  const [selectedClinic,setSelectedClinic] = useState('Down Town')
  
  const [appointments1,setAppointments1] = useState<Appointments[]>([]) ;
  const [appointments2,setAppointments2] = useState<Appointments[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = ()=>{fetch(`${API_HOME}/api/appointments/`)
      .then((response) => response.json())
      .then((data) => {
        setAppointments1(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      });}
    
      const focusListener = navigation.addListener('focus', fetchData);

    // Clean up the listener when the component unmounts
    return () => {
      navigation.removeListener('focus', fetchData);
    };
  }, [navigation]);

  const handleAppointmentPress = (id:number) =>{
      fetch(`${API_HOME}/api/book-appointment/${id}/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          healthCardNumber: healthCardNumber,
        }),
      })
      .then((response)=> response.json())
      .then((data)=>{alert(data.message)
        setAppointments1((prevAppointments) =>
          prevAppointments.map((appointment) =>
            parseInt(appointment.id) === id
              ? { ...appointment, booked: true }
              : appointment
          )
        );
        
        }

      )
      .then((error)=>{
console.log("error has occured")      })
  }
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


  {/* <View>
  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
             Your Booked Appointments
           </Text>
           {appointments1.filter(item => item.healthCardNumber == healthCardNumber).length > 0 ? (
            <FlatList
              data={appointments1.filter(item => item.healthCardNumber == healthCardNumber)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.appointmentRow}>
                  <Text style={styles.appointmentText}>
                    {item.id}. {item.doctor} at {item.clinicName}
                  </Text>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={{ color: 'white', fontSize: 16 }}>No booked appointments</Text>
          )}

</View>
  */}


<View>
  <FlatList data={appointments1}     
  keyExtractor={(item)=>item.id}
 renderItem={({item})=>{
return !item.booked && selectedClinic==item.clinicName ?
  (<View style={styles.appointmentRow}>
  {/* ID & Doctor's Name */}
  <Text style={styles.appointmentText}>{item.id}. {item.doctor}</Text>

  {/* Time */}
  <Text style={styles.timeText}>{item.time}</Text>

  {/* Book Appointment Button */}
  <TouchableOpacity style={styles.bookButton} onPress={()=>{handleAppointmentPress(Number(item.id))}}>
    <Text style={styles.buttonText}>Book</Text>
  </TouchableOpacity>
</View>)
:(
  <View style={styles.appointmentRow}>
    {/* ID & Doctor's Name with Strikethrough */}
    <Text style={[styles.appointmentText, styles.strikedThrough]}>
      {item.id}. {item.doctor}
    </Text>

    {/* Time with Strikethrough */}
    <Text style={[styles.timeText, styles.strikedThrough]}>
      {item.time}
    </Text>

    {/* If booked, show "Appointment booked" */}
    <TouchableOpacity
          style={[styles.bookButton, styles.disabledButton]} // Disabled button style
          disabled={true} // Disable the button
        >
          <Text style={styles.buttonText}>Booked</Text>
        </TouchableOpacity>  </View>
);
 }}/>
 </View>
 
           </SafeAreaView>
         </ImageBackground>


  );
};


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
  strikedThrough: {
    textDecorationLine: 'line-through',  // Adds the strikethrough line
    color: 'gray', // Optional: change the color of crossed-out items to gray
  },
  disabledButton: {
    backgroundColor: '#D3D3D3', // Light gray color for the disabled button
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
  },
});

export default BookAppointmentScreen; 

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}