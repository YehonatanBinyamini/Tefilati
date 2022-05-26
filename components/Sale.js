import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const Sale = (props) => {
    
    return (
        <TouchableOpacity style={{
            backgroundColor: props.color,
            flex: 1,
            padding: 2,
            marginVertical: 3,
            justifyContent: "space-between",
            flexDirection: "row",
            height: 50,
            alignItems: 'center',
            paddingHorizontal: 15, 
        }} 
            onPress= {props.onSelect}>
                    <Text>{props.price+' ש"ח'}</Text>
                    <Text style={styles.text} >{props.type}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        padding: 2,
        marginVertical: 2,
        justifyContent: "center",
        flexDirection: "row",
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10
      },
      text: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        justifyContent: "space-between"
      },
})

export default Sale;