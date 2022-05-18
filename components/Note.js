import React from "react";
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const Note = (props) => {
    
    return (
        <TouchableOpacity style={styles.NoteContainer} onPress= {props.onSelect}>
            <Text style={styles.title} >{props.title}</Text>
            <Text style={styles.gabayAndDate} >   מאת {props.gabay} בתאריך {props.date}</Text>
            <Text style={styles.body} >{props.body}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    NoteContainer: {
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
        textAlign: "center",
    }
})

export default Note;