import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 4552fdd4648e9ff3d0f2900a1c218803efc7fccd
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../../theme/colors';

const HoursScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hours Screen</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.text}>Hours Page...</Text>
      </View>
    </SafeAreaView>
<<<<<<< HEAD
>>>>>>> 4552fdd4648e9ff3d0f2900a1c218803efc7fccd
=======
>>>>>>> 4552fdd4648e9ff3d0f2900a1c218803efc7fccd
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 4552fdd4648e9ff3d0f2900a1c218803efc7fccd
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
<<<<<<< HEAD
>>>>>>> 4552fdd4648e9ff3d0f2900a1c218803efc7fccd
=======
>>>>>>> 4552fdd4648e9ff3d0f2900a1c218803efc7fccd
  },
});

export default HoursScreen; 