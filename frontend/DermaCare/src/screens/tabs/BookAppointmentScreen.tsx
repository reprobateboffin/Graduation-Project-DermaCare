
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FlatList } from 'react-native-gesture-handler';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { API_HOME } from '../auth/config';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../../store/useAuthStore';

type BottomTabParamList = {
  BookAppointment: { healthCardNumber?: string };
};

interface Appointments {
  id: string;
  time: string;
  doctor: string;
  booked: boolean;
  date: Date;
  clinic_name: string;
  healthCardNumber: string | null;
}
interface JwtPayload {
  healthCardNumber: string; // Add this to match your token structure
  // Add other fields if your token has them
}

type BookAppointmentScreenProps = {
  route: RouteProp<BottomTabParamList, 'BookAppointment'>;
};

const BookAppointmentScreen: React.FC<BookAppointmentScreenProps> = ({ route }) => {
  const params = route?.params || {};
  // const { healthCardNumber } = params;
  const navigation = useNavigation();
  const [healthCardNumber,setHealthCardNumber] = useState('')
  const [selectedClinic, setSelectedClinic] = useState('Down Town');
  const [appointments, setAppointments] = useState<Appointments[]>([]);
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token); // Get token from store

  useEffect(() => {
    const decodeToken = async () => {
      try {
        const storedToken = token || (await AsyncStorage.getItem('jwt_token')); // Use store token or fetch from AsyncStorage
        if (storedToken) {
          const decoded = jwtDecode<JwtPayload>(storedToken);
          const extractedHealthCardNumber = decoded.healthCardNumber;
          console.log('Decoded HealthCardNumber:', extractedHealthCardNumber);
          setHealthCardNumber(extractedHealthCardNumber);
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    };


decodeToken();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_HOME}/api/appointments/`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log('Fetched appointments:', JSON.stringify(data, null, 2));
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    const focusListener = navigation.addListener('focus', fetchData);
    return () => focusListener();
  }, [navigation,token]);

  const handleAppointmentPress = async (id: number) => {
    if (loading) return;
    setLoading(true);

    console.log('Booking appointment with ID:', id);
    console.log('Payload:', { healthCardNumber, appointment_id: id });

    try {
      const response = await fetch(`${API_HOME}/api/book-appointment/${id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          healthCardNumber: healthCardNumber,
          appointment_id: id,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Booking failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Booking response:', data);

      setAppointments((prev) =>
        prev.map((appt) =>
          parseInt(appt.id) === id ? { ...appt, booked: true } : appt
        )
      );
      alert(data.message || 'Appointment booked successfully');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert(`Failed to book: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const renderAppointment = ({ item }: { item: Appointments }) => (
    <View style={styles.appointmentRow}>
      <Text style={[styles.appointmentText, item.booked && styles.strikedThrough]}>
        {item.id }. {item.doctor}
      </Text>
      <Text style={[styles.timeText, item.booked && styles.strikedThrough]}>
        {item.time}
      </Text>
      {item.booked ? (
        <TouchableOpacity style={[styles.bookButton, styles.disabledButton]} disabled>
          <Text style={styles.buttonText}>Booked</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.bookButton, loading && styles.disabledButton]}
          onPress={() => handleAppointmentPress(Number(item.id))}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Booking...' : 'Book'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const bookedAppointments = appointments.filter((item) => item.booked && item.healthCardNumber==healthCardNumber);
  const availableAppointments = appointments.filter((item) => !item.booked && selectedClinic === item.clinic_name);

  return (
    <ImageBackground
      source={{ uri: 'https://via.placeholder.com/500' }}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.innerContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Book Appointment</Text>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedClinic}
              onValueChange={(itemValue) => setSelectedClinic(itemValue as string)}
              style={styles.picker}
              dropdownIconColor="gray"
            >
              <Picker.Item label="Choose Your Clinic" value="" />
              <Picker.Item label="Down Town" value="Down Town" />
              <Picker.Item label="Manhattan" value="Manhattan" />
            </Picker>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Your Booked Appointments</Text>
            {loading ? (
              <Text style={styles.loadingText}>Loading...</Text>
            ) : bookedAppointments.length > 0 ? (
              <FlatList
                data={bookedAppointments}
                keyExtractor={(item) => item.id}
                renderItem={renderAppointment}
                scrollEnabled={false}
              />
            ) : (
              <Text style={styles.noDataText}>No booked appointments</Text>
            )}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Available Appointments</Text>
            {loading ? (
              <Text style={styles.loadingText}>Loading...</Text>
            ) : availableAppointments.length > 0 ? (
              <FlatList
                data={availableAppointments}
                keyExtractor={(item) => item.id}
                renderItem={renderAppointment}
                scrollEnabled={false}
              />
            ) : (
              <Text style={styles.noDataText}>No available appointments for selected clinic</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#016C9D',
    opacity: 0.8,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
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
    height: 50,
  },
  picker: {
    width: '100%',
    height: '100%',
    color: 'gray',
  },
  sectionContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  appointmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  appointmentText: {
    fontSize: 16,
    color: 'white',
    flex: 1,
  },
  strikedThrough: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
  },
  timeText: {
    fontSize: 16,
    color: 'lightgray',
    flex: 1,
    textAlign: 'center',
  },
  bookButton: {
    backgroundColor: '#3CB043',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  noDataText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BookAppointmentScreen;