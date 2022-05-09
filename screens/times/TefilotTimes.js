import React, { useEffect, useState } from "react";
import {Text, View, StyleSheet} from 'react-native';
 
//TODO:: need to fix the getDoc, for that the synagogue's details will be zminim to the return 

const TefilotTimes = props => {
  const user = props.navigation.getParam('user');
  const synagogue = props.navigation.getParam('synagogue');
  

    //console.log(rashi)
    return (
        <View style={styles.item}>
            <View >
            <Text style={styles.title}>זמני תפילות בבית כנסת {synagogue.name}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.text}>שחרית: {synagogue.shacharit}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.text}>מנחה: {synagogue.mincha}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.text}>ערבית: {synagogue.arvit}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.text}>דף יומי: {synagogue.dafYomi}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        marginVertical: 8,
        alignContent: 'center',
       // alignItems: 'center',
        
      },
      title: {
          
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        
      },
      text: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: "bold",
      }
});

TefilotTimes.navigationOptions = {
    headerTitle: "זמני תפילות",
  };
  
export default TefilotTimes;