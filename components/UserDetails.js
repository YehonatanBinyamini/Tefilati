import React from "react";
import { Text, StyleSheet, TouchableOpacity} from 'react-native'

const UserDetails = (props) => {
    
    return (
        <TouchableOpacity style={styles.container} onPress= {props.onSelect}>
            <Text style={styles.title} >בית כנסת {props.synagogueName}</Text>
            <Text style={styles.title} >שם: {props.fullName}</Text>
            <Text style={styles.body} >טלפון: {props.phone}</Text>
            <Text style={styles.body} >דואר אלקטרוני: {props.email}</Text>
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
        backgroundColor: "#2565ae",
        borderRadius: 14,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        marginVertical: 10,
        fontWeight: "bold",
        color: "white",
    },
    gabayAndDate: {
        textAlign: "right",
        color: "blue",
    },
    body: {
        padding: 10,
        fontSize: 18,
        textAlign: "right",
        color: "white",
    }
})

export default UserDetails;