// import React, { useEffect, useState } from 'react'
// import { View ,Text, Alert} from 'react-native'
// import { API_HOME } from '../auth/config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { jwtDecode } from 'jwt-decode';
// import { useAuthStore } from '../../store/useAuthStore';

// interface JwtPayload {
//     healthCardNumber: string;
//   }
// const Cart = () => {
//     const [healthCardNumber,setHealthCardNumber] = useState('')
//     const token = useAuthStore((state) => state.token);
//     const [cartItems, setCartItems] = useState('')

//     useEffect(()=>{

// const decodeToken = async () => {
//       try {
//         const storedToken = token || (await AsyncStorage.getItem('jwt_token'));
//         if (storedToken) {
//           const decoded = jwtDecode<JwtPayload>(storedToken);
//           const extractedHealthCardNumber = decoded.healthCardNumber;
//           console.log('Decoded HealthCardNumber:', extractedHealthCardNumber);
//           setHealthCardNumber(extractedHealthCardNumber);
//         } else {
//           console.log('No token found');
//         }
//       } catch (error) {
//         console.error('Failed to decode token:', error);
//       }
//     };

//     decodeToken();
// const fetchData = async ()=>{

// try {
//       const response = await fetch(`${API_HOME}/api/get-cart-items/`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 healthCareNumber: healthCardNumber,
//                 quantity: '1',
//               }),
//             });
//               const data = await response.json();
//                 setCartItems(data.serialNumber)
//                     if (response.ok) {
//                         console.log(data);
//                     } else {
//                       console.error('Failed to add to cart:', data);
//                       Alert.alert('Error', data.message || 'Failed to add product to cart');
//                     }
// } catch (error) {
//     console.log(error);
// }}
//     },[])
//   return (
// <View><Text>Hello this is cart screen</Text></View>
// )
// }

// export default Cart



import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, Image, Button, StyleSheet } from 'react-native';
import { API_HOME } from '../auth/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../../store/useAuthStore';
import { RootStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

interface JwtPayload {
  healthCardNumber: string;
}

const Cart = () => {
      const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    
  const [healthCardNumber, setHealthCardNumber] = useState('');
  const token = useAuthStore((state) => state.token);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const decodeToken = async () => {
      try {
        const storedToken = token || (await AsyncStorage.getItem('jwt_token'));
        if (storedToken) {
          const decoded = jwtDecode<JwtPayload>(storedToken);
          const extractedHealthCardNumber = decoded.healthCardNumber;
          console.log('Decoded HealthCardNumber:', extractedHealthCardNumber);
          setHealthCardNumber(extractedHealthCardNumber);
          fetchData(extractedHealthCardNumber); // call fetchData here after setting number
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    };

    decodeToken();
  }, []);

  const fetchData = async (hcNumber: string) => {
    try {
      const response = await fetch(`${API_HOME}/api/get-cart-items/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          healthCardNumber: hcNumber,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems(data);
        console.log(data);
      } else {
        console.error('Failed to fetch cart:', data);
        Alert.alert('Error', data.message || 'Failed to get cart items');
      }
    } catch (error) {
      console.log('Error fetching cart items:', error);
    }
  };

  const handleRemoveItem = async (serialNumber: string) => {
    try {
      const response = await fetch(`${API_HOME}/api/remove-cart-item/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          healthCardNumber,
          serialNumber,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Item removed');
        fetchData(healthCardNumber); // refresh cart
      } else {
        Alert.alert('Error', result.message || 'Failed to remove item');
      }
    } catch (error) {
      console.log('Remove Error:', error);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.cartItem}>
      <Image source={{ uri:API_HOME+ item.serialNumber.image }} style={styles.image}
       onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
       onLoad={() => console.log('Image loaded:', item.image)}
       resizeMode="contain"
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.serialNumber.name}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      </View>
      <View style={styles.actions}>
        <Button title="Buy" onPress={() => navigation.navigate('EnterCreditCardScreen', {healthCardNumber:healthCardNumber, serialNumber:item.serialNumber.serialNumber, price: item.serialNumber.price, name: item.serialNumber.name,quantity:item.quantity,})} />
        <Button title="Remove" onPress={() => handleRemoveItem(item.serialNumber.serialNumber)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.serialNumber.serialNumber}
        ListEmptyComponent={<Text>No items in cart.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: 'row',  // Display items in row
    alignItems: 'center',  // Vertically align items
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: 50, // smaller image size
    height: 50, // smaller image size
    marginRight: 12,
    borderRadius: 8,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  quantity: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row', // Actions (Buy, Remove) in same row
    gap: 10, // space between buttons
  },
});

export default Cart;
