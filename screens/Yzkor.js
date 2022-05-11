import React from "react";
import {StyleSheet, FlatList, View, Text, ImageBackground} from 'react-native';
import Category from "../models/others/category";
import CategoryGridTile from "../components/CategoryGridTile";
import Candle from "../pictures/candle.jpg"
const CATEGORIES = [
    new Category('c9','זמנים בהלכה','#f54242', 'HalachaScreen'),
    new Category('c10','זמני תפילות','#aa123d', 'TefilotTimesScreen'),
]

const Yzkor = (props) => {
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
        //<FlatList data={CATEGORIES} numColumns={2} renderItem={renderGridItem} />
        <View style={styles.screen}> 
        <ImageBackground source={Candle} resizeMode="stretch" style={styles.image}>
            <Text style={styles.text}>"וְנָתַתִּי לָהֶם בְּבֵיתִי וּבְחוֹמֹתַי יָד וָשֵׁם..."</Text>
            </ImageBackground>
        </View>
      );
};



Yzkor.navigationOptions = {
    headerTitle: "יזכור",
    headerBackTitle: "מסך הבית"
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems:'center',
        fontWeight: "bold",

       // justifyContent: 'center'
      },
    text: {
        fontSize: 24,
        padding: 30,
        color: "white",
    },
    image: {
        flex: 1,
        width: "100%"
    }
});

export default Yzkor;