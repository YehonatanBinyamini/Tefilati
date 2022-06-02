import React from "react";
import {Text, View, StyleSheet, } from 'react-native';
import MyHeader from "../components/MyHeader";

const PrayersList = props => {
    
    return (

    <View style={styles.screen}>
        <MyHeader title="הנחיות קורונה" onSelect={() => {
                 props.navigation.toggleDrawer();
             }}/>
         <Text style={styles.title}>אין הגבלות התקהלות</Text>
        <Text style={styles.text}>בשורות טובות!</Text>
    </View>
    );
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignContent: "center",
        backgroundColor: "white"
    },
    title: {      
        marginTop: 30,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#fff0e1",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
      },
    //   title: {
    //     fontSize: 22,
    //     marginVertical: 10,
    //     fontWeight: "bold",
    // },

      text: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 30,
      }
});

PrayersList.navigationOptions = {
    headerTitle: "vbjhu",
  };
  
export default PrayersList;