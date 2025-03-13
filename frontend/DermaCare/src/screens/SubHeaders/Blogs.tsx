import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View,Text, FlatList,Image } from 'react-native'
import colors from '../../theme/colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/BottomTabs';
import { RootStackParamList } from '../../navigation/types';
// const blogs = [
//   {
//     id: '1',
//     title: 'The Importance of Regular Checkups',
//     imageUrl: 'https://via.placeholder.com/150', // Replace with a real image URL
//     subText: 'Regular checkups are important to ensure that you stay healthy and catch any potential issues early.',
//   },
//   {
//     id: '2',
//     title: 'How to Stay Healthy During Flu Season',
//     imageUrl: 'https://via.placeholder.com/150', // Replace with a real image URL
//     subText: 'Flu season can be tough, but there are ways to protect yourself and stay healthy throughout the season.',
//   },
//   {
//     id: '3',
//     title: 'Mental Health: Coping Strategies',
//     imageUrl: 'https://via.placeholder.com/150', // Replace with a real image URL
//     subText: 'Mental health is just as important as physical health. Learn coping strategies to maintain mental well-being.',
//   },
// ];
interface Blog {
  id: string;
  title: string;
  imageUrl: string;
  subText: string;
}
interface BlogScreenProps  {
  navigation: StackNavigationProp<RootStackParamList>;
}


const Blogs : React.FC<BlogScreenProps>  = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        fetch('http://192.168.1.106:8000/api/blogs')
        .then((response)=> response.json())
        .then((data)=>{
          setBlogs(data.blogs)
        } )
    },[])

    // const navigation = useNavigation();
    const route = useRoute();
  return (
    <View style={styles.container}>
                  <View style={styles.headersub}>
              <Pressable onPress={()=>navigation.navigate('MainTabs')} >
                <Text style={[styles.subheading, route.name=='HomeScreen'&& styles.activesubheading]}>Home</Text>
              </Pressable>
              <Pressable>
                <Text style={[styles.subheading, route.name=='Blogs'&& styles.activesubheading]}>Blogs</Text>
              </Pressable>
            </View>

            <FlatList
        data={blogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.blogItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.blogImage} />
            <Text style={styles.blogTitle}>{item.title}</Text>
            <Text style={styles.blogSubText}>{item.subText}</Text>
          </Pressable>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
     container:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 800,
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
  
     headersub: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 5,
        marginTop: 30,
      },
      subheading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black', // Customize text color
      }, 
      activesubheading: {
        color: colors.primary.purple,
    
        fontSize: 18,
        fontWeight: 'bold',
      }, blogSubText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
      }, blogImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
      },

})

export default Blogs   