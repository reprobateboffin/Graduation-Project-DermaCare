import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Text, FlatList, Image, SafeAreaView, ImageBackground } from 'react-native';
import colors from '../../theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import SubHeader from './SubHeader';

interface Blog {
  id: string;
  title: string;
  imageUrl: string;
  subText: string;
}

interface BlogScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Blogs: React.FC<BlogScreenProps> = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://192.168.1.106:8000/api/blogs')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch blogs');
        return response.json();
      })
      .then((data) => {
        setBlogs(data.blogs || []); // Fallback to empty array if 'blogs' key is missing
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: Blog }) => (
    <Pressable style={styles.blogItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.blogImage} />
      <Text style={styles.blogTitle}>{item.title}</Text>
      <Text style={styles.blogSubText}>{item.subText}</Text>
    </Pressable>
  );

  return (
    <ImageBackground
      source={require('../../../assets/images/doctor-patient.png')} // Reuse same image as SkinCancerConcern
      style={styles.container}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <SubHeader />
        <Text style={styles.title}>Health Blogs</Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading blogs...</Text>
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : blogs.length === 0 ? (
          <Text style={styles.noDataText}>No blogs available</Text>
        ) : (
          <FlatList
            data={blogs}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the screen
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#016C9D',
    opacity: 0.8,
  },
  safeArea: {
    flex: 1,
  },
  flatListContent: {
    padding: 20, // Padding for content
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast with overlay
    textAlign: 'center',
    marginVertical: 20,
  },
  blogItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  blogSubText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  blogImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#ff4444',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Blogs;