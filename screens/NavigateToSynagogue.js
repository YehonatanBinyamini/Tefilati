import React from "react";
import { View, Text, StyleSheet, Linking} from 'react-native';
import MyButton from "../components/MyButton";

const NavigateToSynagogue = (props) => {
    const synagogue = props.navigation.getParam("synagogue");
    //const urlAddress = synagogue.address.replaceAll(" ","?")
   // console.log(urlAddress)
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
    }
})

export default NavigateToSynagogue;
