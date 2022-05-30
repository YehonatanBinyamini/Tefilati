import React, {useRef, useEffect, useState} from "react";
import { View, StyleSheet, Alert, FlatList, Animated, TouchableWithoutFeedback } from "react-native";
import { Text, Input, Button, Chip } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { CATEGORIES } from "../data/categories";
import CategoryGridTile from "../components/CategoryGridTile";
import CustomHeaderButtons from "../components/HeaderButton";
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../db/firebase";
import Gabay from "../models/users/Gabay";
import Prayer from "../models/users/Prayer";
import MyButton from "../components/MyButton";
import Category from "../models/others/category";


const Home = (props) => {
  const [isComing, setIsComing] = useState(false)
  const [numOfComings, setNumOfComings] = useState(0);
  const [textButton, setTextButton] = useState("לחץ לאישור הגעה")
  const [touching, setTouching] = useState(false)
  const [counterType, setCounterType] = useState("")
  const [prayers, setPrayers] = useState([])
  
  const user = props.navigation.getParam('user');
  const synagogue = props.navigation.getParam('synagogue');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const turnedOff = () => {
    updateCounter()
    setIsComing(false)
  }
  
  useEffect(() => {
    updateCounter()
  },[])

  const updateCounter = () => {
    const docRef = doc(db, "Synagogues", user.synagogue, "Counter", "counter");
    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
            synagogue.counterOn = doc.data().counterOn;
            setCounterType(doc.data().type)
            setNumOfComings(doc.data().numOfComings)
            setPrayers(doc.data().prayers)
            const index = doc.data().prayers.indexOf(user.uid);
            if (index > -1){
              setIsComing(true)
              setTextButton("לחץ לביטול הגעה")
            } else {
              setTextButton("לחץ לאישור הגעה")
            }
        } else {
          console.log("doesn't exists")
        }
      });
    }

    useEffect(() => {
    if (!isComing) {
        Animated.timing(fadeAnim, {
          useNativeDriver: true,
          toValue: 0,
          duration: 4000
        }).start();

        setTimeout(() => {
          Animated.timing(fadeAnim, {
            useNativeDriver: true,
            toValue: 1,
            duration: 4000
          }).start();
        }, 3000);  
      }
  },[])

  useEffect(() => {
      if (!isComing) {
          Animated.timing(fadeAnim, {
            useNativeDriver: true,
            toValue: 0,
            duration: 3000
          }).start();

          setTimeout(() => {
            Animated.timing(fadeAnim, {
              useNativeDriver: true,
              toValue: 1,
              duration: 4000
            }).start();
          }, 2000);  
    }
  },[touching])
 
  const icons = {"זמנים": "schedule", "מצפן": "explore", "לימוד יומי": "menu-book", "יזכור": "portrait", "תשלומים ותרומות": "credit-card", "לוח מודעות": "content-paste", "פורום": "question-answer", "ניווט לבית הכנסת": "place"}
  
  
  const renderGridItem = (itemData) => {
    
    return (
      <CategoryGridTile 
        title= {itemData.item.title} 
        color={itemData.item.color}
        onSelect={() => {props.navigation.navigate(itemData.item.nextScreen, {user: user, synagogue: synagogue, turnedOff: turnedOff})}}
        icon={icons[itemData.item.title]}
      />
    
    );
    
  };

  const isComingHandler = () => {
    setTouching(!touching)
    setIsComing(!isComing)
    if (isComing){
      const index = prayers.indexOf(user.uid)
      if (index > -1){
        prayers.splice(index, 1)
      }
      const ref = doc(db, "Synagogues", user.synagogue, "Counter", "counter");
      updateDoc(ref, {
        prayers: prayers,
        numOfComings: numOfComings-1,
      });
      setNumOfComings(numOfComings-1)
      setTextButton("לחץ לאישור הגעה")
    } else {
      prayers.push(user.uid)
      const ref = doc(db, "Synagogues", user.synagogue, "Counter", "counter");
      updateDoc(ref, {
        prayers: prayers,
        numOfComings: numOfComings+1,
      });
      setNumOfComings(numOfComings+1)
      setTextButton("לחץ לביטול הגעה")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={()=>{setTouching(!touching)}}>
    <View style={{flex: 1, }}>
     { synagogue.counterOn &&
    (<View style={{alignItems: "center"}}>
      <Animated.View
        style={[
        styles.fadingContainer,
        {
          // Bind opacity to animated value
          opacity: fadeAnim
        }
      ]}
    >
      <Text style={styles.fadingText}>{`${numOfComings} אשרו הגעה ל${counterType}`}</Text>
      <MyButton text={textButton} onSelect={isComingHandler}/>
    </Animated.View>
    </View>)}
    <FlatList data={CATEGORIES} numColumns={2} renderItem={renderGridItem} contentContainerStyle={{ paddingBottom: 20 }}/>
    </View>
    </TouchableWithoutFeedback>
    );
};

Home.navigationOptions = (navData) => {
  const user = navData.navigation.getParam('user');
  const header = "שלום " + user.firstName  + ", בית כנסת " + user.synagogue
   return {
      headerTitle: header,
      //headerTitle: navData.navigation.getParam('user').synagogue,
      headerLeft:() => (<HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
          navData.navigation.toggleDrawer();
        }}/>
      </HeaderButtons>
      ),
      headerRight: () => ( <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
        <Item title="LogOff" iconName="exit-outline" onPress={() => {
          navData.navigation.replace("LoginScreen", {user: null });
        }}/>
      </HeaderButtons>)
    };
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 2,
    margin: 15,
    height: 190,
    fontSize: 30
  },
  chip: {
    width: 200,
    height: 200,
    left: 200,
  },
  buttons: {
    width: 200,
    height: 200,
    left: 110,
    justifyContent: "space-around",
  },
  fadingContainer: {
    backgroundColor: "powderblue",
        width: "100%",
        padding: 10,
        //borderRadius: 10,
        alignItems: "center",
  },
  fadingText: {
    fontSize: 28,
    color: "black",
    fontWeight: "bold",

  },
});

export default Home;
