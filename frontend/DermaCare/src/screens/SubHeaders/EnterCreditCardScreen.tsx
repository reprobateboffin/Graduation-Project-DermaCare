// // EnterCreditCardScreen.tsx
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { API_HOME } from '../auth/config';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../navigation/types';
// import { CommonActions, useNavigation } from '@react-navigation/native';

// interface CreditCardProps {
//   route: {
//     params: {
//       healthCardNumber: string;
//       serialNumber: string;
//       price: string;
//       name: string;
//       quantity: string
//     };
//   };
//   navigation: any;
// }

// const EnterCreditCardScreen = ({ route, navigation }: CreditCardProps) => {
  
//   const { healthCardNumber, serialNumber, price, name,quantity } = route.params;
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCvv] = useState('');
//   const finalPrice = Number(quantity) * Number(price)

//   const handleSubmit = async () => {
//     if (cardNumber && expiryDate && cvv) {
//       // Process the credit card payment here
// try {
//    const response = await fetch(`${API_HOME}/api/buy-cart-item/`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             healthCardNumber,
//             serialNumber,
//             quantity,
//             finalPrice
//           }),
//         });
  
//         const result = await response.json();
//         if (response.ok) {
//           Alert.alert('Success', 'Item bought');
//           // Alert.alert(result);

//           // navigation.replace('Products')

//           navigation.dispatch(
//             CommonActions.reset({
//               index: 0,  // Set to 0 because 'Home' should be the first screen in the stack
//               routes: [{ name: 'MainTabs' }], // 'Home' is your home screen name
//             })
//           );

//         } else {
//           Alert.alert('Error', result.message || 'Failed to remove item');
//         }
// } catch (error) {
//   console.log(error);
// }


//       Alert.alert('Payment Success', `Payment for ${name} was successful.`);
//       navigation.navigate(); // Navigate back after successful payment
//     } else {
//       Alert.alert('Error', 'Please fill in all fields');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Enter Credit Card Details</Text>
//       <Text>Name: {name}</Text>
//       <Text>Price: ${finalPrice}</Text>

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
//   },
// });

// export default EnterCreditCardScreen;


import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { API_HOME } from '../auth/config';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

interface CreditCardProps {
  route: {
    params: {
      healthCardNumber: string;
      serialNumber: string;
      price: string;
      name: string;
      quantity: string;
    };
  };
  navigation: any;
}

interface InvoiceData {
  id: number;
  health_card_number: string;
  serial_number: string;
  quantity: string;
  price: string;
  created_at: string;
  product_name?: string; // We'll add this from frontend
}

const EnterCreditCardScreen = ({ route, navigation }: CreditCardProps) => {
  const { healthCardNumber, serialNumber, price, name, quantity } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const finalPrice = Number(quantity) * Number(price);

  const handleSubmit = async () => {
    if (!cardNumber || !expiryDate || !cvv) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${API_HOME}/api/buy-cart-item/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          healthCardNumber,
          serialNumber,
          quantity,
          finalPrice: price // Using original price per item as per your backend
        }),
      });

      const result = await response.json();
      if (response.ok) {
        // Add product name to invoice data before displaying
        const invoiceWithProductName = {
          ...result,
          product_name: name
        };
        setInvoiceData(invoiceWithProductName);
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
                <tr>
                  <td>${invoiceData.product_name || 'Product'}</td>
                  <td>${invoiceData.quantity}</td>
                  <td>$${Number(invoiceData.price).toFixed(2)}</td>
                  <td>$${(Number(invoiceData.quantity) * Number(invoiceData.price)).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            
            <div class="total">
              Total: $${(Number(invoiceData.quantity) * Number(invoiceData.price)).toFixed(2)}
            </div>
            
            <div class="thank-you">
              Thank you for your purchase!
            </div>
          </body>
        </html>
      `;

      // Generate PDF
      const { uri } = await Print.printToFileAsync({ html });
      
      // Create a more user-friendly filename
      const newUri = FileSystem.documentDirectory + `invoice_${invoiceData.id}.pdf`;
      await FileSystem.moveAsync({
        from: uri,
        to: newUri
      });
      
      // Share the PDF (this will allow user to save or share)
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Credit Card Details</Text>
      <Text>Product: {name}</Text>
      <Text>Quantity: {quantity}</Text>
      <Text>Price per item: ${Number(price).toFixed(2)}</Text>
      <Text>Total: ${finalPrice.toFixed(2)}</Text>

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
      <Modal
        visible={showInvoiceModal}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          {/* Close button at top right */}
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={closeModalAndNavigate}
          >
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
              
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{invoiceData?.product_name || 'Product'}</Text>
                <Text style={styles.tableCell}>{invoiceData?.quantity}</Text>
                <Text style={styles.tableCell}>${invoiceData?.price ? Number(invoiceData.price).toFixed(2) : '0.00'}</Text>
                <Text style={styles.tableCell}>
                  ${invoiceData?.price && invoiceData?.quantity 
                    ? (Number(invoiceData.price) * Number(invoiceData.quantity)).toFixed(2) 
                    : '0.00'}
                </Text>
              </View>
            </View>
            
            <Text style={styles.total}>
              Total: ${invoiceData?.price && invoiceData?.quantity 
                ? (Number(invoiceData.price) * Number(invoiceData.quantity)).toFixed(2) 
                : '0.00'}
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
});

export default EnterCreditCardScreen;