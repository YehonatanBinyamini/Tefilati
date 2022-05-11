import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Waiting = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>בקשתך התקבלה!</Text>
            <Text style={styles.body}>בקשתך לרישום בית כנסת חדש התקבלה</Text> 
            <Text style={styles.body}>המערכת תיצור איתך קשר בימים הקרובים</Text>
        </View>
    )
};

Waiting.navigationOptions = {
    headerTitle: "גבאי יקר",
    headerBackTitle: "התחברות",
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