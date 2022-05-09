import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const CategoryGridTile = (props) => {
    return (
        <TouchableOpacity 
        style={styles.gridItem}
        onPress= {props.onSelect}
      >
        <View style={{...styles.container, ...{backgroundColor: props.color}} }>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 190,
        fontSize: 30
      },
    container:{
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 3,
        padding: 20,
        marginBottom: 10,  

    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default CategoryGridTile;