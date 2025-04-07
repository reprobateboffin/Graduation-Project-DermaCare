import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Text, FlatList, Image, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import SubHeader from './SubHeader';
import { API_HOME } from '../auth/config';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Blog {
  id: string;
  title: string;
  image_url: string;
  subText: string;
  body: string;
  bookmarked?: boolean;
}

interface BlogScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const Blogs: React.FC<BlogScreenProps> = () => {
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
        setBlogs(data.blogs || []);
        console.log(data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleBookmark = (id: string) => {
    const updatedBlogs = blogs.map(blog =>
      blog.id === id ? { ...blog, bookmarked: !blog.bookmarked } : blog
    );
    setBlogs(updatedBlogs);

    const blogToUpdate = updatedBlogs.find(blog => blog.id === id);
    if (blogToUpdate) {
      fetch(`${API_HOME}/api/blogs/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookmarked: blogToUpdate.bookmarked }),
      })
        .then(response => {
          if (!response.ok) throw new Error(`Failed to update bookmark: ${response.status}`);
          return response.json();
        })
        .then(data => {
          console.log('Bookmark updated:', data);
          setBlogs(prevBlogs =>
            prevBlogs.map(blog =>
              blog.id === id ? { ...blog, bookmarked: data.bookmarked } : blog
            )
          );
        })
        .catch(error => {
          console.error('Error updating bookmark:', error);
          setBlogs(prevBlogs => prevBlogs.map(blog =>
            blog.id === id ? { ...blog, bookmarked: !blogToUpdate.bookmarked } : blog
          ));
          alert('Failed to update bookmark. Please try again.');
        });
    }
  };

  const handlePress = (title: string, image_url: string, subText: string, body: string) => {
    console.log('Read More pressed:', { title, image_url, subText, body });
    navigation.navigate('BlogDetails', { title, image_url, subText, body });
  };

  const renderItem = ({ item }: { item: Blog }) => (
    <View style={styles.blogItem}>
      <Pressable
        onPress={() => toggleBookmark(item.id)}
        style={styles.bookmarkIcon}
      >
        <Ionicons
          name={item.bookmarked ? 'bookmark' : 'bookmark-outline'}
          size={24}
          color={item.bookmarked ? '#016C9D' : '#999'}
        />
      </Pressable>
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
        <TouchableOpacity
          style={styles.bookmarkedButton}
          onPress={() => navigation.navigate('BookmarkedBlogs')}
        >
          <Ionicons name="bookmark" size={20} color="#fff" />
          <Text style={styles.bookmarkedButtonText}>Bookmarked Blogs</Text>
        </TouchableOpacity>
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
  bookmarkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    padding: 5,
    width: 34,
    height: 34,
  },
  bookmarkedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0288D1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 10,
  },
  bookmarkedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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

export default Blogs;