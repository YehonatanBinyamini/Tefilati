import React from "react";
import { Text, StyleSheet, TouchableOpacity} from 'react-native'

const YzkorComponent = (props) => {
    
    return (
        <TouchableOpacity style={styles.container} onPress= {props.onSelect} >
            <Text style={styles.title} >{props.fullName}</Text>
            <Text style={styles.title} >נלב"ע ב{props.date}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 180,
        //height: 200,
        //maxWidth: "70%",
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
               
    },
    title: {
        fontSize: 18,
        marginVertical: 10,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    },
    body: {
        padding: 10,
        fontSize: 18,
        textAlign: "right",
        color: "white",
    }
})

export default YzkorComponent;