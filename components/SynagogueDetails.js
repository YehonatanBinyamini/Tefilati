import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const SynagogueDetails = (props) => {
    
    return (
        <TouchableOpacity style={styles.container} onPress= {props.onSelect}>
            <Text style={styles.title} >בית כנסת {props.synagogueName}</Text>
            <Text style={styles.body} >כתובת: {props.synagogueAddress}</Text>
            <Text style={styles.body} >מקומות ישיבה: {props.synagogueSeats}</Text>
            <Text style={styles.title} >גבאי: {props.fullName}</Text>
            <Text style={styles.body} >טלפון: {props.phone}</Text>
            <Text style={styles.body} >דואר אלקטרוני: {props.email}</Text>
            <Text style={styles.body} >סיסמת מערכת: {props.password}</Text>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        //height: 200,
        maxWidth: "95%",
        shadowColor: 'black',
        shadowOffset:{width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 5,
        padding: 20,
        alignItems: 'center',
        backgroundColor: "#bdeeff",
        borderRadius: 14,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        marginVertical: 10,
        fontWeight: "bold",
    },
    gabayAndDate: {
        textAlign: "right",
        color: "blue"
    },
    body: {
        padding: 20,
        fontSize: 18,
        textAlign: "right",
    }
})

export default SynagogueDetails;