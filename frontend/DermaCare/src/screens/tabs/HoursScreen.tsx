import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Platform, StatusBar } from 'react-native';
import  colors  from '../../theme/colors';

const HoursScreen = () => {
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
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <Text style={styles.title}>Hours of Service</Text>
            <View style={styles.cardContainer}>

            <View style={styles.locationCard}>
              <Text style={styles.locationTitle}>Manhattan</Text>
              <Text style={styles.locationHours}>Monday to Friday 9 a.m. to 5 p.m.</Text>
            </View>

            <View style={styles.locationCard}>
              <Text style={styles.locationTitle}>Walmart DownTown</Text>
              <Text style={styles.locationHours}>Monday to Friday 9 a.m. to 9 p.m.</Text>
              <Text style={styles.locationHours}>Sat from 10 a.m. to 6 p.m.</Text>
            </View>
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
    transform: [{ scale: 1.2 }],
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    top:55,
    fontWeight: 'bold',
    color: colors.base.white,
    paddingBottom: 149,
    marginTop: 20,
  },
  cardContainer:{
    gap:95,
    alignItems:'center',
  },
  locationCard: {
    marginBottom: 30,
    gap:22,
    alignItems:'center',
  },
  locationTitle: {
    fontSize: 30.2,
    fontWeight: 'bold',
    color: colors.base.white,
    marginBottom: 8,
    justifyContent:'center',
  },
  locationHours: {
    fontSize: 19.5,
    fontWeight: 'regular',
    color: colors.base.white,
    opacity: 0.9,
    lineHeight: 19.5,
  },
});

export default HoursScreen; 