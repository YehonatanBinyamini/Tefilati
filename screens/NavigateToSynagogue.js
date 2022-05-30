import React, {useRef} from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet, Linking, Animated, TouchableWithoutFeedback} from 'react-native';
import MyButton from "../components/MyButton";

const NavigateToSynagogue = (props) => {
    const synagogue = props.navigation.getParam("synagogue");
    

       
    
    return (
                <View style={styles.container}>
            <MyButton text="נווט לבית הכנסת שלי" onSelect={() => {
                Linking.openURL(`https://waze.com/ul?q=${synagogue.address.replaceAll(" ","?")}`)
            }}
            />
        </View>
    );

}

NavigateToSynagogue.navigationOptions = {
    headerTitle: "ניווט לבית הכנסת",
    headerBackTitle: "מסך הבית"
  };

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 20,
    },
    fadingContainer: {
        padding: 20,
        backgroundColor: "powderblue",
        borderRadius: 10,
        width: 300,
    }
})

export default NavigateToSynagogue;
