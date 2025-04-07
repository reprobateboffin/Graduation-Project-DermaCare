
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { API_HOME } from '../auth/config';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import SubHeader from './SubHeader';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

interface Product {
  id: string;
  image: string;
  name: string;
  description: string;
  quantity: string;
  type: string;
  price: string;
  serialNumber: string;
}

interface JwtPayload {
  healthCardNumber: string;
}

const BASE_URL = 'http://192.168.1.106:8000';

// const renderProductItem = ({ item }: { item: Product }) => {
//   console.log('Rendering product:', item.name, 'Image URL:', item.image);
//   const handleAddToCart = () => {
//     setCartItems(prev => prev + 1);
//     Alert.alert('Added to Cart', `${item.name} was added to your cart`);
//   };

//   return (
//     <View style={styles.card}>
//       <Image
//         source={{ uri: item.image }}
//         style={styles.image}
//         onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
//         onLoad={() => console.log('Image loaded:', item.image)}
//         resizeMode="contain"
//       />
//       <Text style={styles.name}>{item.name}</Text>
//       <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
//       <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => Alert.alert('Added to Cart', `Product ID: ${item.id}`)}
//       >
//         <Text style={styles.buttonText}>Add to Cart</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

const Products = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [products, setProducts] = useState<Product[]>([]);
  const token = useAuthStore((state) => state.token);
  const [healthCardNumber, setHealthCardNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<number>(0);

  const renderProductItem = ({ item }: { item: Product }) => {
    console.log('Rendering product:', item.name, 'Image URL:', item.image);
    const handleAddToCart = async () => {
    //   setCartItems(prev => prev + 1);
    //   Alert.alert('Added to Cart', `${item.name} was added to your cart`);

    try {
        const response = await fetch(`${API_HOME}/api/add-to-cart/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            healthCareNumber: healthCardNumber,
            serialNumber: item.serialNumber, // Make sure item.id matches product.serialNumber
            quantity: '1',
          }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          setCartItems(prev => prev + 1);
          Alert.alert('Added to Cart', `${item.name} was added to your cart`);
        } else {
          console.error('Failed to add to cart:', data);
          Alert.alert('Error', data.message || 'Failed to add product to cart');
        }
      } catch (error) {
        console.error('Error in Add to Cart:', error);
        Alert.alert(`Error', 'Something went wrong while adding to cart, hcn is  ${healthCardNumber}`);
      }


    };
  
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
          onLoad={() => console.log('Image loaded:', item.image)}
          resizeMode="contain"
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <Text style={{fontStyle: 'italic'}}>Price: {item.price} $</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddToCart}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };
  


  useEffect(() => {
    const decodeToken = async () => {
      try {
        const storedToken = token || (await AsyncStorage.getItem('jwt_token'));
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
        const response = await fetch(`${API_HOME}/api/get-products/`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log('Fetched products:', JSON.stringify(data, null, 2));
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    const focusListener = navigation.addListener('focus', fetchData);
    return () => focusListener();
  }, [navigation, token]);
  const handleCartPress = () => {
    // Add navigation to cart screen or show cart alert
navigation.navigate('Cart',{healthCardNumber})    // If you have a cart screen, you can uncomment this:
    // navigation.navigate('Cart');
  };
  return (
    <ImageBackground
      source={require('../../../assets/images/doctor-patient.png')}
      style={styles.container}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <SubHeader />
        <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
        <Text style={styles.cartIcon}>🛒</Text>
        {cartItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItems}</Text>
          </View>
        )}
      </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Cleansers</Text>
          <FlatList
            data={products.filter((product) => product.type === 'Cleanser')}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderProductItem}
          />

          <Text style={styles.title}>Cerums</Text>
          <FlatList
            data={products.filter((product) => product.type === 'Serum')}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderProductItem}
          />

          <Text style={styles.title}>Sunscreens</Text>
          <FlatList
            data={products.filter((product) => product.type === 'Sunscreen')}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderProductItem}
          />
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
  scrollContent: {
    padding: 20,
    paddingTop:0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical:5,
  },
  card: {
    padding: 15,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 200,
    height: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 8,
    marginBottom: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    borderRadius: 8,
    height: 40,
    width: 120,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },cartButton: {
    padding: 10,
    marginLeft:310,
  },
  cartIcon: {
    fontSize: 45,
  },
   badge: {
    position: 'absolute',
    right: 7,
    top: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Products;