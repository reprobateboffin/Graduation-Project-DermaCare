import { useRoute } from '@react-navigation/native';
import React from 'react'
import { View,Text } from 'react-native';
import TestDatePicker from './TestDatePicker';
const DummyScreen = ({navigation}) => {
const route = useRoute();
     const { 
      preference,email,phoneNumber, firstName,lastName,healthCardNumber,dob,selectedClinic
 } 
    = route.params || {};
  return (
    <View>
        <Text style={{alignSelf:'center', fontSize:30,marginTop:40}}>Hi {firstName}</Text>
        <Text style={{alignSelf:'center', fontSize:30,}}>{firstName}</Text>
        <Text style={{alignSelf:'center', fontSize:30,}}>{lastName}</Text>
        

    </View>
  )
}

export default DummyScreen