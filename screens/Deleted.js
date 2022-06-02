import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeaderButtons from "../components/HeaderButton";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

const Waiting = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>הוסרת מחשבון בית הכנסת</Text>
            <Text style={styles.body}>לחזרה לחשבון צור קשר עם הגבאי</Text> 
        </View>
    )
};

Waiting.navigationOptions= (navData) => {
  return {
      headerTitle: "משתמש יקר",
      headerBackTitle: "התחברות",
    headerRight: () => ( <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
      <Item title="LogOff" iconName="exit-outline" onPress={() => {
        navData.navigation.replace("LoginScreen", {user: null });
      }}/>
    </HeaderButtons>)
    }
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      //justifyContent: "center",
      alignItems: "center"
    },
    title: {
      flexDirection: "row",
      padding: 20,
      fontSize: 30,
      marginBottom: 50,
    },
    body: {
      padding: 10,
      fontSize: 20,

    }
  });

export default Waiting;