import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const MyInput = props => {
  return <TextInput {...props} style={{ ...styles.input, ...props.styles}}/>
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: '60%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
    left: 200,
    
  }
});

export default MyInput;