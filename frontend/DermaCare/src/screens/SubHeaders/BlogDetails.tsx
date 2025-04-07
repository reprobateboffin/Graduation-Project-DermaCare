import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import SubHeader from './SubHeader';

type BlogDetailsRouteProp = RouteProp<RootStackParamList, 'BlogDetails'>;
type BlogDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'BlogDetails'>;

interface BlogDetailsProps {
  route: BlogDetailsRouteProp;
  navigation: BlogDetailsNavigationProp;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ route }) => {
  // Extract parameters from route.params
  const { title, image_url, subText, body } = route.params;

  return (
    <ImageBackground
      source={require('../../../assets/images/doctor-patient.png')}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <SubHeader />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Image source={{ uri: image_url }} style={styles.image} />
          <Text style={styles.subText}>{subText}</Text>
          <Text style={styles.body}>{body}</Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#016C9D',
    opacity: 0.8,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40, // Extra padding at the bottom for scroll
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  subText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#fff',
    marginBottom: 15,
    lineHeight: 22,
  },
  body: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    textAlign: 'justify',
  },
});

export default BlogDetails;