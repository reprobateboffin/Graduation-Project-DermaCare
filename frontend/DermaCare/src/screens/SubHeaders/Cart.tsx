
import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { API_HOME } from '../auth/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../../store/useAuthStore';
import { RootStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface JwtPayload {
  healthCardNumber: string;
}

const Cart = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [healthCardNumber, setHealthCardNumber] = useState('');
  const token = useAuthStore((state) => state.token);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState('0.00');



   useEffect(() => {
      if (cartItems.length > 0) {
        const total = cartItems.reduce((sum, item) => {
          return sum + (Number(item.serialNumber.price) * Number(item.quantity));
        }, 0);
        setTotalPrice(total.toFixed(2));
      } else {
        setTotalPrice('0.00');
      }
    }, [cartItems]);
  
  useEffect(() => {
    const decodeToken = async () => {
      try {
        const storedToken = token || (await AsyncStorage.getItem('jwt_token'));
        if (storedToken) {
          const decoded = jwtDecode<JwtPayload>(storedToken);
          const extractedHealthCardNumber = decoded.healthCardNumber;
          console.log('Decoded HealthCardNumber:', extractedHealthCardNumber);
          setHealthCardNumber(extractedHealthCardNumber);
          fetchData(extractedHealthCardNumber);
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
        fetchData(healthCardNumber);
      } else {
        Alert.alert('Error', result.message || 'Failed to remove item');
      }
    } catch (error) {
      console.log('Remove Error:', error);
    }
  };

  const updateQuantity = async (serialNumber: string, healthCardNumber: string, op: string) => {
    try {
      const response = await fetch(`${API_HOME}/api/update-cart-item/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          healthCardNumber,
          serialNumber,
          op: op,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', `Quantity ${op === 'inc' ? 'increased' : 'decreased'}`);
        fetchData(healthCardNumber);
      } else {
        Alert.alert('Error', result.message || `Failed to ${op === 'inc' ? 'increase' : 'decrease'} quantity`);
      }
    } catch (error) {
      console.log(`${op === 'inc' ? 'Increase' : 'Decrease'} Quantity Error:`, error);
      Alert.alert('Error', `Failed to ${op === 'inc' ? 'increase' : 'decrease'} quantity`);
    }
  };

  const handleBuyAll = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Error', 'Cart is empty');
      return;
    }

    // try {
    //   const response = await fetch(`${API_HOME}/api/buy-all-cart-items/`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       healthCardNumber:healthCardNumber,
    //     }),
    //   });

    //   const result = await response.json();
    //   if (response.ok) {
    //     Alert.alert('Success', 'All items purchased');
    //     fetchData(healthCardNumber); // Refresh cart
    //   } else {
    //     Alert.alert('Error', result.message || 'Failed to purchase all items');
    //   }
    // } catch (error) {
    //   console.log('Buy All Error:', error);
    //   Alert.alert('Error', 'Failed to purchase all items');
    // }
    navigation.navigate('EnterCreditCardBuyAll',{healthCardNumber})
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: API_HOME + item.serialNumber.image }}
        style={styles.image}
        onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
        onLoad={() => console.log('Image loaded:', item.image)}
        resizeMode="contain"
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.serialNumber.name}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.serialNumber.serialNumber, healthCardNumber, 'dec')}>
            <Ionicons name="remove-circle-outline" size={24} color="#555" />
          </TouchableOpacity>
          <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.serialNumber.serialNumber, healthCardNumber, 'inc')}>
            <Ionicons name="add-circle-outline" size={24} color="#555" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.actions}>
        <Button
          title="Buy"
          onPress={() =>
            navigation.navigate('EnterCreditCardScreen', {
              healthCardNumber: healthCardNumber,
              serialNumber: item.serialNumber.serialNumber,
              price: item.serialNumber.price,
              name: item.serialNumber.name,
              quantity: item.quantity,
            })
          }
        />
        <Button title="Remove" onPress={() => handleRemoveItem(item.serialNumber.serialNumber)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Cart</Text>
        <Text style={{marginLeft:100,    fontWeight: 'bold', fontSize:20, }}>{totalPrice} $</Text>

        <Button title="Buy All" onPress={handleBuyAll} />
      </View>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop:30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default Cart;

// import React, { useEffect, useState } from 'react';
// import { View, Text, Alert, FlatList, Image, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
// import { API_HOME } from '../auth/config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { jwtDecode } from 'jwt-decode';
// import { useAuthStore } from '../../store/useAuthStore';
// import { RootStackParamList } from '../../navigation/types';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';

// interface JwtPayload {
//   healthCardNumber: string;
// }

// interface Invoice {
//   serial_number: string;
//   quantity: number;
//   price: number;
//   name?: string; // Optional for product name
// }

// const Cart = () => {
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
//   const [healthCardNumber, setHealthCardNumber] = useState('');
//   const token = useAuthStore((state) => state.token);
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [invoices, setInvoices] = useState<Invoice[]>([]);
//   const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

//   useEffect(() => {
//     const decodeToken = async () => {
//       try {
//         const storedToken = token || (await AsyncStorage.getItem('jwt_token'));
//         if (storedToken) {
//           const decoded = jwtDecode<JwtPayload>(storedToken);
//           const extractedHealthCardNumber = decoded.healthCardNumber;
//           console.log('Decoded HealthCardNumber:', extractedHealthCardNumber);
//           setHealthCardNumber(extractedHealthCardNumber);
//           fetchData(extractedHealthCardNumber);
//         } else {
//           console.log('No token found');
//         }
//       } catch (error) {
//         console.error('Failed to decode token:', error);
//       }
//     };

//     decodeToken();
//   }, []);

//   const fetchData = async (hcNumber: string) => {
//     try {
//       const response = await fetch(`${API_HOME}/api/get-cart-items/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           healthCardNumber: hcNumber,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setCartItems(data);
//         console.log(data);
//       } else {
//         console.error('Failed to fetch cart:', data);
//         Alert.alert('Error', data.message || 'Failed to get cart items');
//       }
//     } catch (error) {
//       console.log('Error fetching cart items:', error);
//     }
//   };

//   const handleRemoveItem = async (serialNumber: string) => {
//     try {
//       const response = await fetch(`${API_HOME}/api/remove-cart-item/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           healthCardNumber,
//           serialNumber,
//         }),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         Alert.alert('Success', 'Item removed');
//         fetchData(healthCardNumber);
//       } else {
//         Alert.alert('Error', result.message || 'Failed to remove item');
//       }
//     } catch (error) {
//       console.log('Remove Error:', error);
//     }
//   };

//   const updateQuantity = async (serialNumber: string, healthCardNumber: string, op: string) => {
//     try {
//       const response = await fetch(`${API_HOME}/api/update-cart-item/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           healthCardNumber,
//           serialNumber,
//           op: op,
//         }),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         Alert.alert('Success', `Quantity ${op === 'inc' ? 'increased' : 'decreased'}`);
//         fetchData(healthCardNumber);
//       } else {
//         Alert.alert('Error', result.message || `Failed to ${op === 'inc' ? 'increase' : 'decrease'} quantity`);
//       }
//     } catch (error) {
//       console.log(`${op === 'inc' ? 'Increase' : 'Decrease'} Quantity Error:`, error);
//       Alert.alert('Error', `Failed to ${op === 'inc' ? 'increase' : 'decrease'} quantity`);
//     }
//   };

//   const handleBuyAll = async () => {
//     if (cartItems.length === 0) {
//       Alert.alert('Error', 'Cart is empty');
//       return;
//     }

//     try {
//       const response = await fetch(`${API_HOME}/api/buy-all-cart-items/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           healthCardNumber: healthCardNumber,
//         }),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         Alert.alert('Success', 'All items purchased');
//         // Map invoices with product names from cartItems
//         const enrichedInvoices = (result.invoices || []).map((invoice: Invoice) => {
//           const cartItem = cartItems.find(
//             (item) => item.serialNumber.serialNumber === invoice.serial_number
//           );
//           return {
//             ...invoice,
//             name: cartItem?.serialNumber.name || invoice.serial_number,
//           };
//         });
//         setInvoices(enrichedInvoices);
//         setModalVisible(true);
//         fetchData(healthCardNumber);
//       } else {
//         Alert.alert('Error', result.message || 'Failed to purchase all items');
//       }
//     } catch (error) {
//       console.log('Buy All Error:', error);
//       Alert.alert('Error', 'Failed to purchase all items');
//     }
//   };

//   const generatePdf = async () => {
//     if (invoices.length === 0) {
//       Alert.alert('Error', 'No invoices to print');
//       return;
//     }

//     setIsGeneratingPdf(true);
//     try {
//       const totalPrice = invoices.reduce((sum, item) => sum + item.price, 0);
//       const html = `
//         <html>
//           <head>
//             <style>
//               body { font-family: Arial; padding: 20px; }
//               .header { text-align: center; margin-bottom: 30px; }
//               .invoice-title { font-size: 24px; font-weight: bold; color: #333; }
//               .invoice-details { margin-bottom: 30px; }
//               .details-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
//               .section-title { font-size: 18px; font-weight: bold; margin: 20px 0 10px; }
//               table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
//               th { background-color: #f2f2f2; text-align: left; padding: 10px; }
//               td { padding: 10px; border-bottom: 1px solid #ddd; }
//               .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
//               .thank-you { text-align: center; margin-top: 30px; font-style: italic; }
//             </style>
//           </head>
//           <body>
//             <div class="header">
//               <div class="invoice-title">INVOICE</div>
//               <div>Order #${Math.floor(Math.random() * 100000)}</div>
//             </div>
            
//             <div class="invoice-details">
//               <div class="details-row">
//                 <div>
//                   <strong>Date:</strong> ${new Date().toLocaleDateString()}
//                 </div>
//                 <div>
//                   <strong>Health Card #:</strong> ${healthCardNumber}
//                 </div>
//               </div>
//             </div>
            
//             <div class="section-title">Order Details</div>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Item</th>
//                   <th>Quantity</th>
//                   <th>Unit Price</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${invoices
//                   .map(
//                     (item) => `
//                       <tr>
//                         <td>${item.name || item.serial_number}</td>
//                         <td>${item.quantity}</td>
//                         <td>$${item.price ? (item.price / item.quantity).toFixed(2) : '0.00'}</td>
//                         <td>$${item.price ? item.price.toFixed(2) : '0.00'}</td>
//                       </tr>
//                     `
//                   )
//                   .join('')}
//               </tbody>
//             </table>
            
//             <div class="total">
//               Total: $${totalPrice.toFixed(2)}
//             </div>
            
//             <div class="thank-you">
//               Thank you for your purchase!
//             </div>
//           </body>
//         </html>
//       `;

//       // Generate PDF
//       const { uri } = await Print.printToFileAsync({ html });

//       // Create a unique filename
//       const newUri = `${FileSystem.documentDirectory}invoice_${Date.now()}.pdf`;
//       await FileSystem.moveAsync({
//         from: uri,
//         to: newUri,
//       });

//       // Share the PDF
//       await Sharing.shareAsync(newUri, {
//         mimeType: 'application/pdf',
//         dialogTitle: 'Download Invoice',
//         UTI: 'com.adobe.pdf',
//       });
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       Alert.alert('Error', 'Failed to generate PDF');
//     } finally {
//       setIsGeneratingPdf(false);
//     }
//   };

//   const renderItem = ({ item }: any) => (
//     <View style={styles.cartItem}>
//       <Image
//         source={{ uri: API_HOME + item.serialNumber.image }}
//         style={styles.image}
//         onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
//         onLoad={() => console.log('Image loaded:', item.image)}
//         resizeMode="contain"
//       />
//       <View style={styles.details}>
//         <Text style={styles.name}>{item.serialNumber.name}</Text>
//         <View style={styles.quantityContainer}>
//           <TouchableOpacity onPress={() => updateQuantity(item.serialNumber.serialNumber, healthCardNumber, 'dec')}>
//             <Ionicons name="remove-circle-outline" size={24} color="#555" />
//           </TouchableOpacity>
//           <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
//           <TouchableOpacity onPress={() => updateQuantity(item.serialNumber.serialNumber, healthCardNumber, 'inc')}>
//             <Ionicons name="add-circle-outline" size={24} color="#555" />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.actions}>
//         <Button
//           title="Buy"
//           onPress={() =>
//             navigation.navigate('EnterCreditCardScreen', {
//               healthCardNumber: healthCardNumber,
//               serialNumber: item.serialNumber.serialNumber,
//               price: item.serialNumber.price,
//               name: item.serialNumber.name,
//               quantity: item.quantity,
//             })
//           }
//         />
//         <Button title="Remove" onPress={() => handleRemoveItem(item.serialNumber.serialNumber)} />
//       </View>
//     </View>
//   );

//   const renderInvoiceItem = ({ item }: { item: Invoice }) => (
//     <View style={styles.invoiceItem}>
//       <Text style={styles.invoiceText}>Product: {item.name || item.serial_number}</Text>
//       <Text style={styles.invoiceText}>Quantity: {item.quantity}</Text>
//       <Text style={styles.invoiceText}>Price: ${item.price.toFixed(2)}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.header}>Your Cart</Text>
//         <Button title="Buy All" onPress={handleBuyAll} />
//       </View>
//       <FlatList
//         data={cartItems}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.serialNumber.serialNumber}
//         ListEmptyComponent={<Text>No items in cart.</Text>}
//       />
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalHeader}>Purchase Summary</Text>
//             <FlatList
//               data={invoices}
//               renderItem={renderInvoiceItem}
//               keyExtractor={(item) => item.serial_number}
//               ListEmptyComponent={<Text>No invoice details available.</Text>}
//             />
//             <View style={styles.modalActions}>
//               <Button
//                 title={isGeneratingPdf ? 'Generating...' : 'Print'}
//                 onPress={generatePdf}
//                 disabled={isGeneratingPdf}
//               />
//               <Button title="Close" onPress={() => setModalVisible(false)} />
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   cartItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     marginBottom: 10,
//     borderRadius: 10,
//   },
//   image: {
//     width: 50,
//     height: 50,
//     marginRight: 12,
//     borderRadius: 8,
//   },
//   details: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   quantity: {
//     fontSize: 14,
//     color: '#555',
//     marginHorizontal: 10,
//   },
//   actions: {
//     flexDirection: 'row',
//     gap: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//     maxHeight: '80%',
//   },
//   modalHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   invoiceItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   invoiceText: {
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   modalActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
// });

// export default Cart;