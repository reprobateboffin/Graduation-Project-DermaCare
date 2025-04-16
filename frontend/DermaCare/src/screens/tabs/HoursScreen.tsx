import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Platform, StatusBar, ActivityIndicator } from 'react-native';
import colors from '../../theme/colors';
import { API_HOME } from '../auth/config';

interface HoursInfo {
  branchName: string;
  hours: string;
  hoursWeekend?: string;
}

const HoursScreen = () => {
  const [hoursData, setHoursData] = useState<HoursInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHoursData = async () => {
    try {
      const response = await fetch(`${API_HOME}/api/get-hours-info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setHoursData(data);
    } catch (error) {
      console.error('Error fetching hours data:', error);
      setError('Failed to fetch hours information');
      // Fallback to default data if API fails
      setHoursData([
        {
          branchName: "Manhattan",
          hours: "Manday to Friday 9 a.m. to 5 p.m."
        },
        {
          branchName: "Down Town",
          hours: "Monday to Friday 9 a.m. to 5 p.m.",
          hoursWeekend: "Sat from 10 a.m. to 6 p.m."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHoursData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (error && hoursData.length === 0) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground
        source={require('../../../assets/images/doctor-patient.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Text style={styles.title}>Hours of Service</Text>
            
            <View style={styles.cardContainer}>
              {hoursData.map((location, index) => (
                <View key={index} style={styles.locationCard}>
                  <Text style={styles.locationTitle}>{location.branchName}</Text>
                  <Text style={styles.locationHours}>{location.hours}</Text>
                  {location.hoursWeekend && (
                    <Text style={styles.locationHours}>{location.hoursWeekend}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.blue,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#016C9D",
    opacity: 0.8,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  backgroundImageStyle: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    top: 55,
    fontWeight: 'bold',
    color: colors.base.white,
    paddingBottom: 149,
    marginTop: 20,
  },
  cardContainer: {
    gap: 95,
    alignItems: 'center',
  },
  locationCard: {
    marginBottom: 30,
    gap: 22,
    alignItems: 'center',
  },
  locationTitle: {
    fontSize: 30.2,
    fontWeight: 'bold',
    color: colors.base.white,
    marginBottom: 8,
    justifyContent: 'center',
  },
  locationHours: {
    fontSize: 19.5,
    fontWeight: '400',
    color: colors.base.white,
    opacity: 0.9,
    lineHeight: 24,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
});

export default HoursScreen;