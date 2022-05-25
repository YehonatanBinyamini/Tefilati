import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const PaymentDetails = (props) => {
    
    return (
        <TouchableOpacity style={styles.container} onPress= {props.onSelect}>
            <Text style={styles.title} >{props.type+" "+props.price}</Text>
            <Text style={styles.body} >{props.subject}</Text>
            <Text style={styles.title} >התקבל מ{props.fullName}</Text>
            <Text style={styles.body} >בתאריך {props.date}</Text>
            <Text style={styles.body} >{props.hakdasha}</Text>
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

export default PaymentDetails;