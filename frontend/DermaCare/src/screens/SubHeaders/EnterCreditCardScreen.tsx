// EnterCreditCardScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_HOME } from '../auth/config';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface CreditCardProps {
  route: {
    params: {
      healthCardNumber: string;
      serialNumber: string;
      price: string;
      name: string;
      quantity: string
    };
  };
  navigation: any;
}

const EnterCreditCardScreen = ({ route, navigation }: CreditCardProps) => {
  
  const { healthCardNumber, serialNumber, price, name,quantity } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const finalPrice = Number(quantity) * Number(price)

  const handleSubmit = async () => {
    if (cardNumber && expiryDate && cvv) {
      // Process the credit card payment here
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
            finalPrice
          }),
        });
  
        const result = await response.json();
        if (response.ok) {
          Alert.alert('Success', 'Item bought');
          // Alert.alert(result);

          // navigation.replace('Products')

          navigation.dispatch(
            CommonActions.reset({
              index: 0,  // Set to 0 because 'Home' should be the first screen in the stack
              routes: [{ name: 'MainTabs' }], // 'Home' is your home screen name
            })
          );

        } else {
          Alert.alert('Error', result.message || 'Failed to remove item');
        }
} catch (error) {
  console.log(error);
}


      Alert.alert('Payment Success', `Payment for ${name} was successful.`);
      navigation.navigate(); // Navigate back after successful payment
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Credit Card Details</Text>
      <Text>Name: {name}</Text>
      <Text>Price: ${finalPrice}</Text>

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
  },
});

export default EnterCreditCardScreen;
