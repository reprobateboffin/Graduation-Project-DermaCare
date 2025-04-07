import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import SubHeader from './SubHeader';
import { API_HOME } from '../auth/config';

interface Blog {
  id: string;
  title: string;
  image_url: string;
  subText: string;
  body: string;
  bookmarked?: boolean;
}

interface BookmarkedBlogsScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const BookmarkedBlogs: React.FC<BookmarkedBlogsScreenProps> = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_HOME}/api/blogs/`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch blogs');
        return response.json();
      })
      .then((data) => {
        const bookmarkedBlogs = (data.blogs || []).filter((blog: Blog) => blog.bookmarked === true);
        setBlogs(bookmarkedBlogs);
        console.log('Bookmarked Blogs:', bookmarkedBlogs);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handlePress = (title: string, image_url: string, subText: string, body: string) => {
    console.log('Read More pressed:', { title, image_url, subText, body });
    navigation.navigate('BlogDetails', { title, image_url, subText, body });
  };

  const renderItem = ({ item }: { item: Blog }) => (
    <View style={styles.blogItem}>
      <Image source={{ uri: item.image_url }} style={styles.blogImage} />
      <Text style={styles.blogTitle}>{item.title}</Text>
      <Text style={styles.blogSubText}>{item.subText}</Text>
      <TouchableOpacity
        style={styles.readMoreButton}
        onPress={() => handlePress(item.title, item.image_url, item.subText, item.body)}
      >
        <Text style={styles.readMoreText}>Read More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../../assets/images/doctor-patient.png')}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <SubHeader />
        <Text style={styles.title}>Bookmarked Blogs</Text>

        {loading ? (
          <Text style={styles.loadingText}>Loading bookmarked blogs...</Text>
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : blogs.length === 0 ? (
          <Text style={styles.noDataText}>No bookmarked blogs available</Text>
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
  flatListContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
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
    marginBottom: 5,
  },
  blogSubText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
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
  readMoreButton: {
    backgroundColor: '#0288D1',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start', // Align to left or center as preferred
  },
  readMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BookmarkedBlogs;