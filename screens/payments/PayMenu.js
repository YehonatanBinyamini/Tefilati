import React from "react";
import {StyleSheet, FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import Category from "../../models/others/category";
import CategoryGridTile from "../../components/CategoryGridTile";

const CATEGORIES = [
    new Category('c14','קניית מושב','#f54242', 'PaySeatScreen'),
    new Category('c15','תרום','#aa123d', 'TefilotTimesScreen'),
    new Category('c16','קניית מצוות','#f5d142', 'TefilotTimesScreen'),
]

const PayMenu = (props) => {
    const renderGridItem = (itemData) => {
      
      const user = props.navigation.getParam('user');
      const synagogue = props.navigation.getParam('synagogue');

        return (
          <CategoryGridTile 
            title= {itemData.item.title} 
            color={itemData.item.color}
            onSelect={() => {props.navigation.navigate(itemData.item.nextScreen, {user: user, synagogue: synagogue})}}
          />
        
        );
      };
    
      return (
        <FlatList data={CATEGORIES} numColumns={2} renderItem={renderGridItem} />
      );
};



PayMenu.navigationOptions = {
    headerTitle: "תרומות ותשלומים",
  };

const styles = StyleSheet.create({
    screen: {
        width: 200,
        height: 200,
        left: 110,
        alignItems:'center',
        justifyContent: 'space-evenly'
      }
});

export default PayMenu;