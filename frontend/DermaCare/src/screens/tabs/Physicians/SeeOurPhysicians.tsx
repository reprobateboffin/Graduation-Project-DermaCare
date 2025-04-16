import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { BottomTabParamList } from '../../../navigation/BottomTabs';
// import { colors } from '../../../theme/colors';
import DoctorCard from '../../../components/DoctorCard';
import SubHeader from '../../SubHeaders/SubHeader';
import BackgroundShape from '../../../components/BackgroundShape';
import { API_HOME } from '../../auth/config';

interface Doctor {
  id: string;
  name: string;
  title: string;
  ssn: string;
  image: string;
  bio?: string;
  specialties?: string[];
}

const SeeOurPhysicians = () => {
  const navigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_HOME}/api/get-doctors/`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color='blue' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Background Shape */}
        <View style={styles.backgroundContainer}>
          <BackgroundShape />
        </View>

        {/* Sub Header */}
        <SubHeader />

        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Our Physicians</Text>
          <Text style={styles.subtitle}>Meet our team of specialists</Text>
        </View>

        {/* Doctors List */}
        <View style={styles.content}>
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              title={doctor.title}
              imageUrl={doctor.image}
            //   onPress={() => navigation.navigate('PhysicianDetail', { doctor })}
            />
          ))}

          {/* Contact Section */}
          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Need help choosing?</Text>
            <Text style={styles.sectionDescription}>
              Our reception team can help you select the right physician for your needs.
            </Text>
            
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => Linking.openURL('tel:3069222002')}
            >
              {/* <Image 
                source={require('../../../assets/icons/phone.png')}
                style={styles.contactIcon}
              /> */}
              <Text style={styles.contactButtonText}>Call Reception</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 800,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 24,
    alignItems: 'center',
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  contactSection: {
    marginTop: 32,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'blue',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionDescription: {
    fontSize: 16,
    color: 'blue',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  contactIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});

export default SeeOurPhysicians;