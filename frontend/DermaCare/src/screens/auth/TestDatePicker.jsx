import React, { useState } from "react";
import { View, TextInput,StyleSheet } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

const TestDatePicker = ({dob,setDob}) => {

  return (
    <View>
      <MaskedTextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        keyboardType="numeric"
        value={dob}
        onChangeText={(formatted) => setDob(formatted)}
        mask={"9999-99-99"}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    input: {
        width: 315,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        color: 'black',
        marginBottom: 40,
        borderWidth: 1,
        borderColor: 'gray',
      },
})
export default TestDatePicker;
