import React from "react";
import { AppLoading } from 'expo';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  LogBox 
} from "react-native";
import MyHeader from "./components/MyHeader";
import Login from "./screens/connect/Login";
import Home from "./screens/Home";
import NewUser from "./screens/connect/NewUser";
import Images from "./constants/images";
import ChooseTime from './screens/times/ChooseTime';
import ScreensNavigator from "./navigation/ScreensNavigator"


export default function App() {
  
  const image = { uri: Images.backGroundImage};
  LogBox.ignoreAllLogs();
  const arr = [<Login />, <NewUser/>, <Home/>, <ChooseTime/>];
  console._errorOriginal = console.error.bind(console);
  console.error = () => {};

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
    <View style={styles.screen}>
      <SafeAreaView>
      </SafeAreaView>
        <ScreensNavigator />
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#bdeeff",
  },
  image: {
    
    width: "100%",
    height: "100%",
  },
});
