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
                    <Text style={styles.text}>{props.fullName}</Text>
                    <Text>{props.price}</Text>
                    <Text style={styles.text} >{props.kind}</Text>
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