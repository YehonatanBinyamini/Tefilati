import React from "react";
import { View, StyleSheet, Alert, FlatList, TouchableOpacity } from "react-native";
import { Text, Input, Button, Chip } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { CATEGORIES } from "../data/categories";
import CategoryGridTile from "../components/CategoryGridTile";
import CustomHeaderButtons from "../components/HeaderButton";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../db/firebase";
import Gabay from "../models/users/Gabay";
import Prayer from "../models/users/Prayer";


const Home = (props) => {
  
  //if (user instanceof Prayer)

  /*console.log(user.email)
  const docRef = doc(db, "users", user.uid, "err");
  const go = async () => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().firstName);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  go()  
  */
 

  const user = props.navigation.getParam('user');
  const synagogue = props.navigation.getParam('synagogue');

  
  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile 
        title= {itemData.item.title} 
        color={itemData.item.color}
        onSelect={() => {props.navigation.navigate(itemData.item.nextScreen, {user: user, synagogue: synagogue})}}
      />
    
    );
  };

  return (
    <FlatList data={CATEGORIES} numColumns={2} renderItem={renderGridItem} contentContainerStyle={{ paddingBottom: 20 }}/>
    );
};

Home.navigationOptions = (navData) => {
   return {
      
      headerTitle: navData.navigation.getParam('user').synagogue,
      headerLeft:() => (<HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
          navData.navigation.toggleDrawer();
        }}/>
      </HeaderButtons>
      )
    };
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 2,
    margin: 15,
    height: 190,
    fontSize: 30
  },
  chip: {
    width: 200,
    height: 200,
    left: 200,
  },
  buttons: {
    width: 200,
    height: 200,
    left: 110,
    justifyContent: "space-around",
  },
  
});

export default Home;
