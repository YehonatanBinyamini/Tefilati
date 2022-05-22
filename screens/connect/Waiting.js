import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeaderButtons from "../../components/HeaderButton";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

const Waiting = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>בקשתך התקבלה!</Text>
            <Text style={styles.body}>בקשתך לרישום בית כנסת חדש התקבלה</Text> 
            <Text style={styles.body}>המערכת תיצור איתך קשר בימים הקרובים</Text>
        </View>
    )
};

Waiting.navigationOptions= (navData) => {
  return {
      headerTitle: "גבאי יקר",
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