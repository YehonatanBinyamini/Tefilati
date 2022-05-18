import React from "react";
import {  StyleSheet, Text, View, TouchableOpacity } from "react-native";

const ZmanItem = props => {
    return (
    <View style={styles.listItem}>
        <Text>{props.name}{props.value}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        backgroundColor: 'silver',
        borderColor: 'black',
        borderWidth: 1,
        marginVertical: 10
      }
})

export default ZmanItem;