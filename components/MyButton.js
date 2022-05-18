import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Colors from "../constants/colors";

const MyButton = (props) => {
    
    return (
        <View style={{
            width: props.changeWidth || "60%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: props.changeMarginTop || 40,
            marginBottom: 15,}}>
        <TouchableOpacity style={styles.button} onPress={props.onSelect}>
            
            <Text style={styles.buttonText} >{props.text}</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
   // buttonContainer: {
        
    //  },
      button: {
        backgroundColor: Colors.myBlue,
        width: "80%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
      },
      buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 19,
        textAlign: "center",
      },
})

export default MyButton;