import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

const MyHeader = (props) => {
  return (
      <Header
      backgroundColor={Colors.myBlue}
      height= {50}
        style= {styles.header}
        leftComponent={{
          icon: "menu",
          color: "#fff",
          iconStyle: { color: "#fff" },
          onPress: props.onSelect,
          size: 22
          }}
        centerComponent={{ text: props.title, style: styles.headerTitle }}
        //rightComponent={{ icon: "home", color: "#fff" }}
        />
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    paddingTop: 36,
    backgroundColor: "red",//Colors.myBlue,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    justifyContent: "flex-end",
    alignItems: "center",
    fontWeight: "bold",
  },
});

export default MyHeader;
