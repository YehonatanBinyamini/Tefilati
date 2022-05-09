import React from "react";
import {StyleSheet, FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import Category from "../../models/others/category";
import CategoryGridTile from "../../components/CategoryGridTile";

const CATEGORIES = [
    new Category('c9','זמנים בהלכה','#f54242', 'HalachaScreen'),
    new Category('c10','זמני תפילות','#aa123d', 'TefilotTimesScreen'),
]

const ChooseTime = (props) => {
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



ChooseTime.navigationOptions = {
    headerTitle: "זמנים",
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

export default ChooseTime;