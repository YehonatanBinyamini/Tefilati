import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Category from '../../models/others/category';
import CategoryGridTile from '../../components/CategoryGridTile';
import CustomHeaderButtons from "../../components/HeaderButton";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';


const CATEGORIES = [
    new Category('c11','בקשות הרשמה','#67bbe7', 'RequestsScreen'),
    new Category('c12','רשימת בתי כנסת','#89cff0', 'SynagoguesScreen'),
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


Admin.navigationOptions = (navData) => {
    return { 
    headerTitle: "ניהול מערכת תפילתי",
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