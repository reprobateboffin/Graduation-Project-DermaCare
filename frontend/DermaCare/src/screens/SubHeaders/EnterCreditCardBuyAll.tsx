

// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, Modal, TouchableOpacity, ScrollView } from 'react-native';
// import { API_HOME } from '../auth/config';
// import { CommonActions, useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';
// import { FlatList } from 'react-native-gesture-handler';

// interface CreditCardProps {
//   route: {
//     params: {
//       healthCardNumber: string;
    
//     };
//   };
//   navigation: any;
// }

// interface InvoiceData {
//   id: number;
//   health_card_number: string;
//   serial_number: string;
//   quantity: string;
//   price: string;
//   created_at: string;
//   product_name?: string; // We'll add this from frontend
// }

// const EnterCrediCardBuyAll = ({ route, navigation }: CreditCardProps) => {
//   const { healthCardNumber } = route.params;
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
//   const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
//   const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [totalPrice, setTotalPrice] = useState('')
// //   const finalPrice = Number(quantity) * Number(price);

// useEffect(() => {
//     if (cartItems.length > 0) {
//       const total = cartItems.reduce((sum, item) => {
//         return sum + (Number(item.serialNumber.price) * Number(item.quantity))
//       }, 0);
//       setTotalPrice(total.toFixed(2));
//     } else {
//       setTotalPrice('0.00');
//     }
//   }, [cartItems]);

//  useEffect(()=>{
//      const fetchData = async (hcNumber: string) => {
//         try {
//           const response = await fetch(`${API_HOME}/api/get-cart-items/`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               healthCardNumber: hcNumber,
//             }),
//           });
    
//           const data = await response.json();
//           if (response.ok) {
//             setCartItems(data);
//             console.log(data);
//           } else {
//             console.error('Failed to fetch cart:', data);
//             Alert.alert('Error', data.message || 'Failed to get cart items');
//           }
//         } catch (error) {
//           console.log('Error fetching cart items:', error);
//         }
//       };
//       fetchData(healthCardNumber);
//  },[])


//   const handleSubmit = async () => {
//     if (!cardNumber || !expiryDate || !cvv) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     try {
//       const response = await fetch(`${API_HOME}/api/buy-all-cart-items/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           healthCardNumber:healthCardNumber,
      
//         }),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         // Add product name to invoice data before displaying
//         const invoiceWithProductName = {
//           ...result,
//         //   product_name: name
//         };
//         setInvoiceData(invoiceWithProductName);
//         setShowInvoiceModal(true);
//       } else {
//         Alert.alert('Error', result.error || 'Failed to process payment');
//       }
//     } catch (error) {
//       console.log(error);
//       Alert.alert('Error', 'Network error. Please try again.');
//     }
//   };

//   const generatePdf = async () => {
//     if (!invoiceData) return;
    
//     setIsGeneratingPdf(true);
//     try {
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
//               <div>Order #${invoiceData.id}</div>
//             </div>
            
//             <div class="invoice-details">
//               <div class="details-row">
//                 <div>
//                   <strong>Date:</strong> ${new Date(invoiceData.created_at).toLocaleDateString()}
//                 </div>
//                 <div>
//                   <strong>Health Card #:</strong> ${invoiceData.health_card_number}
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
//                 <tr>
//                   <td>${invoiceData.product_name || 'Product'}</td>
//                   <td>${invoiceData.quantity}</td>
//                   <td>$${Number(invoiceData.price).toFixed(2)}</td>
//                   <td>$${(Number(invoiceData.quantity) * Number(invoiceData.price)).toFixed(2)}</td>
//                 </tr>
//               </tbody>
//             </table>
            
//             <div class="total">
//               Total: $${(Number(invoiceData.quantity) * Number(invoiceData.price)).toFixed(2)}
//             </div>
            
//             <div class="thank-you">
//               Thank you for your purchase!
//             </div>
//           </body>
//         </html>
//       `;

//       // Generate PDF
//       const { uri } = await Print.printToFileAsync({ html });
      
//       // Create a more user-friendly filename
//       const newUri = FileSystem.documentDirectory + `invoice_${invoiceData.id}.pdf`;
//       await FileSystem.moveAsync({
//         from: uri,
//         to: newUri
//       });
      
//       // Share the PDF (this will allow user to save or share)
//       await Sharing.shareAsync(newUri, {
//         mimeType: 'application/pdf',
//         dialogTitle: 'Save Invoice',
//         UTI: 'com.adobe.pdf'
//       });
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       Alert.alert('Error', 'Failed to generate PDF');
//     } finally {
//       setIsGeneratingPdf(false);
//     }
//   };

//   const closeModalAndNavigate = () => {
//     setShowInvoiceModal(false);
//     navigation.dispatch(
//       CommonActions.reset({
//         index: 0,
//         routes: [{ name: 'MainTabs' }],
//       })
//     );
//   };
//   const renderItem = ({ item }: any) => (
//     <View style={styles.itemContainer}>
//       <Text style={styles.itemName}>{item.serialNumber.name}</Text>
//       <View style={styles.itemDetails}>
//         <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
//         <Text style={styles.itemText}>Price: {item.serialNumber.price} $</Text>
//       </View>
 
//     </View>
//   );
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Enter Credit Card Details</Text>
//       {/* <Text>Product: {name}</Text>
//       <Text>Quantity: {quantity}</Text>
//       <Text>Price per item: ${Number(price).toFixed(2)}</Text>
//       <Text>Total: ${finalPrice.toFixed(2)}</Text> */}
//  <FlatList
//         data={cartItems}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.serialNumber.serialNumber}
//         ListEmptyComponent={<Text>No items in cart.</Text>}
//         ListFooterComponent={
//             <View style={styles.totalContainer}>
//               <Text style={styles.totalText}>Total: ${totalPrice}</Text>
//             </View>
//           }
        
//       />
//       <TextInput
//         placeholder="Card Number"
//         value={cardNumber}
//         onChangeText={setCardNumber}
//         style={styles.input}
//         keyboardType="numeric"
//       />
//       <TextInput
//         placeholder="Expiry Date (MM/YY)"
//         value={expiryDate}
//         onChangeText={setExpiryDate}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="CVV"
//         value={cvv}
//         onChangeText={setCvv}
//         style={styles.input}
//         secureTextEntry
//         keyboardType="numeric"
//       />

//       <Button title="Submit Payment" onPress={handleSubmit} />

//       {/* Invoice Modal */}
//       <Modal
//         visible={showInvoiceModal}
//         animationType="slide"
//         transparent={false}
//       >
//         <View style={styles.modalContainer}>
//           {/* Close button at top right */}
//           <TouchableOpacity 
//             style={styles.closeButton} 
//             onPress={closeModalAndNavigate}
//           >
//             <Ionicons name="close" size={24} color="black" />
//           </TouchableOpacity>

//           <ScrollView style={styles.invoiceContent}>
//             <Text style={styles.invoiceTitle}>INVOICE</Text>
            
//             <View style={styles.detailsRow}>
//               <View>
//                 <Text style={styles.detailLabel}>Order #:</Text>
//                 <Text>{invoiceData?.id}</Text>
//               </View>
//               <View>
//                 <Text style={styles.detailLabel}>Date:</Text>
//                 <Text>{invoiceData?.created_at ? new Date(invoiceData.created_at).toLocaleDateString() : ''}</Text>
//               </View>
//             </View>
            
//             <View style={styles.detailsRow}>
//               <View>
//                 <Text style={styles.detailLabel}>Health Card #:</Text>
//                 <Text>{invoiceData?.health_card_number}</Text>
//               </View>
//             </View>

//             <Text style={styles.sectionTitle}>Order Details</Text>
            
//             <View style={styles.table}>
//               <View style={styles.tableRow}>
//                 <Text style={[styles.tableHeader, styles.tableCell]}>Item</Text>
//                 <Text style={[styles.tableHeader, styles.tableCell]}>Qty</Text>
//                 <Text style={[styles.tableHeader, styles.tableCell]}>Unit Price</Text>
//                 <Text style={[styles.tableHeader, styles.tableCell]}>Total</Text>
//               </View>
              
//               <View style={styles.tableRow}>
//                 <Text style={styles.tableCell}>{invoiceData?.product_name || 'Product'}</Text>
//                 <Text style={styles.tableCell}>{invoiceData?.quantity}</Text>
//                 <Text style={styles.tableCell}>${invoiceData?.price ? Number(invoiceData.price).toFixed(2) : '0.00'}</Text>
//                 <Text style={styles.tableCell}>
//                   ${invoiceData?.price && invoiceData?.quantity 
//                     ? (Number(invoiceData.price) * Number(invoiceData.quantity)).toFixed(2) 
//                     : '0.00'}
//                 </Text>
//               </View>
//             </View>
            
//             <Text style={styles.total}>
//               Total: ${invoiceData?.price && invoiceData?.quantity 
//                 ? (Number(invoiceData.price) * Number(invoiceData.quantity)).toFixed(2) 
//                 : '0.00'}
//             </Text>
            
//             <Text style={styles.thankYou}>Thank you for your purchase!</Text>
//           </ScrollView>

//           <TouchableOpacity 
//             style={styles.printButton} 
//             onPress={generatePdf}
//             disabled={isGeneratingPdf}
//           >
//             <Text style={styles.printButtonText}>
//               {isGeneratingPdf ? 'Generating PDF...' : 'Download Invoice as PDF'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 8,
//     borderRadius: 4,
//   },
//   modalContainer: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   closeButton: {
//     alignSelf: 'flex-end',
//     margin: 10,
//   },
//   invoiceContent: {
//     flex: 1,
//     marginTop: 20,
//   },
//   invoiceTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#333',
//   },
//   detailsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//   },
//   detailLabel: {
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//     color: '#333',
//   },
//   table: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 4,
//     marginBottom: 20,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   tableHeader: {
//     fontWeight: 'bold',
//     backgroundColor: '#f2f2f2',
//   },
//   tableCell: {
//     flex: 1,
//     padding: 10,
//   },
//   total: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'right',
//     marginTop: 20,
//     color: '#333',
//   },
//   thankYou: {
//     textAlign: 'center',
//     marginTop: 30,
//     fontStyle: 'italic',
//     color: '#666',
//   },
//   printButton: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   printButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },  itemContainer: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     marginBottom: 5, // Reduced margin
//   },
//   itemName: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   itemDetails: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   itemText: {
//     fontSize: 14,
//     color: '#666',
//   },  // ... your existing styles
//   totalContainer: {
//     padding: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#eee',
//     marginTop: 10,
//     alignItems: 'flex-end',
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default EnterCrediCardBuyAll;


import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { API_HOME } from '../auth/config';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { FlatList } from 'react-native-gesture-handler';

interface CreditCardProps {
  route: {
    params: {
      healthCardNumber: string;
    };
  };
  navigation: any;
}

interface InvoiceData {
  id: number;
  health_card_number: string;
  created_at: string;
  items: {
    product_name: string;
    quantity: number;
    price: number;
    serial_number: string;
  }[];
  total: number;
}

interface CartItem {
  serialNumber: {
    serialNumber: string;
    name: string;
    price: string;
  };
  quantity: string;
}

const EnterCrediCardBuyAll = ({ route, navigation }: CreditCardProps) => {
  const { healthCardNumber } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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
        } else {
          console.error('Failed to fetch cart:', data);
          Alert.alert('Error', data.message || 'Failed to get cart items');
        }
      } catch (error) {
        console.log('Error fetching cart items:', error);
      }
    };
    fetchData(healthCardNumber);
  }, []);

  const handleSubmit = async () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${API_HOME}/api/buy-all-cart-items/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          healthCardNumber: healthCardNumber,
          cardNumber,
          expiryDate,
          cvv
        }),
      });

      const result = await response.json();
      if (response.ok) {
        // Create invoice data with all items
        const invoiceItems = cartItems.map(item => ({
          product_name: item.serialNumber.name,
          quantity: Number(item.quantity),
          price: Number(item.serialNumber.price),
          serial_number: item.serialNumber.serialNumber
        }));

        const invoiceTotal = invoiceItems.reduce((sum, item) => 
          sum + (item.price * item.quantity), 0);

        const invoiceWithItems = {
          id: result.id || Math.floor(Math.random() * 10000),
          health_card_number: healthCardNumber,
          created_at: new Date().toISOString(),
          items: invoiceItems,
          total: invoiceTotal
        };
        
        setInvoiceData(invoiceWithItems);
        setShowInvoiceModal(true);
      } else {
        Alert.alert('Error', result.error || 'Failed to process payment');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  const generatePdf = async () => {
    if (!invoiceData) return;
    
    setIsGeneratingPdf(true);
    try {
      // Generate HTML for all items in the invoice
      const itemsHtml = invoiceData.items.map(item => `
        <tr>
          <td>${item.product_name}</td>
          <td>${item.quantity}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `).join('');

      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .invoice-title { font-size: 24px; font-weight: bold; color: #333; }
              .invoice-details { margin-bottom: 30px; }
              .details-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
              .section-title { font-size: 18px; font-weight: bold; margin: 20px 0 10px; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th { background-color: #f2f2f2; text-align: left; padding: 10px; }
              td { padding: 10px; border-bottom: 1px solid #ddd; }
              .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
              .thank-you { text-align: center; margin-top: 30px; font-style: italic; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="invoice-title">INVOICE</div>
              <div>Order #${invoiceData.id}</div>
            </div>
            
            <div class="invoice-details">
              <div class="details-row">
                <div>
                  <strong>Date:</strong> ${new Date(invoiceData.created_at).toLocaleDateString()}
                </div>
                <div>
                  <strong>Health Card #:</strong> ${invoiceData.health_card_number}
                </div>
              </div>
            </div>
            
            <div class="section-title">Order Details</div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            <div class="total">
              Total: $${invoiceData.total.toFixed(2)}
            </div>
            
            <div class="thank-you">
              Thank you for your purchase!
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      const newUri = FileSystem.documentDirectory + `invoice_${invoiceData.id}.pdf`;
      await FileSystem.moveAsync({ from: uri, to: newUri });
      await Sharing.shareAsync(newUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Save Invoice',
        UTI: 'com.adobe.pdf'
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const closeModalAndNavigate = () => {
    setShowInvoiceModal(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      })
    );
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.serialNumber.name}</Text>
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
        <Text style={styles.itemText}>Price: ${item.serialNumber.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Credit Card Details</Text>
      
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.serialNumber.serialNumber}
        ListEmptyComponent={<Text>No items in cart.</Text>}
        ListFooterComponent={
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${totalPrice}</Text>
          </View>
        }
      />
      
      <TextInput
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        onChangeText={setExpiryDate}
        style={styles.input}
      />
      <TextInput
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        style={styles.input}
        secureTextEntry
        keyboardType="numeric"
      />

      <Button title="Submit Payment" onPress={handleSubmit} />

      {/* Invoice Modal */}
      <Modal visible={showInvoiceModal} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModalAndNavigate}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          <ScrollView style={styles.invoiceContent}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            
            <View style={styles.detailsRow}>
              <View>
                <Text style={styles.detailLabel}>Order #:</Text>
                <Text>{invoiceData?.id}</Text>
              </View>
              <View>
                <Text style={styles.detailLabel}>Date:</Text>
                <Text>{invoiceData?.created_at ? new Date(invoiceData.created_at).toLocaleDateString() : ''}</Text>
              </View>
            </View>
            
            <View style={styles.detailsRow}>
              <View>
                <Text style={styles.detailLabel}>Health Card #:</Text>
                <Text>{invoiceData?.health_card_number}</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Order Details</Text>
            
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, styles.tableCell]}>Item</Text>
                <Text style={[styles.tableHeader, styles.tableCell]}>Qty</Text>
                <Text style={[styles.tableHeader, styles.tableCell]}>Unit Price</Text>
                <Text style={[styles.tableHeader, styles.tableCell]}>Total</Text>
              </View>
              
              {invoiceData?.items.map((item, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableCell}>{item.product_name}</Text>
                  <Text style={styles.tableCell}>{item.quantity}</Text>
                  <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
                  <Text style={styles.tableCell}>${(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.total}>
              Total: ${invoiceData?.total.toFixed(2) || '0.00'}
            </Text>
            
            <Text style={styles.thankYou}>Thank you for your purchase!</Text>
          </ScrollView>

          <TouchableOpacity 
            style={styles.printButton} 
            onPress={generatePdf}
            disabled={isGeneratingPdf}
          >
            <Text style={styles.printButtonText}>
              {isGeneratingPdf ? 'Generating PDF...' : 'Download Invoice as PDF'}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 4,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 10,
  },
  invoiceContent: {
    flex: 1,
    marginTop: 20,
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
    color: '#333',
  },
  thankYou: {
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
    color: '#666',
  },
  printButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  printButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 5,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 14,
    color: '#666',
  },
  totalContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 10,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EnterCrediCardBuyAll;