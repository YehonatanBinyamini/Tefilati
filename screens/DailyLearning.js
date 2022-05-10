import React from "react";
import {View, StyleSheet, Text, FlatList, ImageBackground, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import Avot from "../data/MasechetAvot";
import RedBoard from "../pictures/Red-Cork-board.jpg"
import BrownBoard from "../pictures/Brown-Cork-board.jpg"

var i = 0;
const indexHandler = () => {
    if (i >= Avot.length)
         i = 0;
    return Avot[i++];
}


const DailyLearning = (props) => {

    return <View style={styles.container}>
            <ImageBackground source={RedBoard} resizeMode="stretch" style={styles.image}>
            <View style={styles.textContainer}> 
              <Text style={styles.text}>{indexHandler()}</Text>
            </View>
            </ImageBackground>
            </View>
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    width: '100%',
    justifyContent: "center",
    alignItems: 'center'
  },
  textContainer: {
      flex: 1,
      width: '80%',
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 30,
      maxHeight: '98%'
    
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    height: '97.2%'
  },
  text: {
    color: "white",
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "center",
    //backgroundColor: "#000000c0"
  }
});

DailyLearning.navigationOptions = {
    headerTitle: "לימוד יומי",
    headerBackTitle: "מסך הבית"
  };

export default DailyLearning;