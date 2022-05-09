import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Category from '../../models/others/category';
import CategoryGridTile from '../../components/CategoryGridTile';


const CATEGORIES = [
    new Category('c11','בקשות הרשמה','#f54242', 'RequestsScreen'),
    new Category('c12','רשימת בתי כנסת','#aa123d', 'TefilotTimesScreen'),
]

const Admin = (props) => {
    
    const renderGridItem = (itemData) => {
    
        return (
            <CategoryGridTile 
            title= {itemData.item.title} 
            color={itemData.item.color}
            onSelect={() => {props.navigation.navigate(itemData.item.nextScreen)}}
            />
        
        );
    };
        
    return (
        <FlatList data={CATEGORIES} numColumns={2} renderItem={renderGridItem} />
    );
};


Admin.navigationOptions = {
    headerTitle: "ניהול מערכת תפילתי",
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center',
    },
    
    title: {
        flexDirection: "row",
        padding: 20,
        fontSize: 30,
        marginBottom: 50,
      },
  });

export default Admin;