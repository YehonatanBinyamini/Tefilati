import React, { useEffect, useState, useCallback } from "react";
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import  auth  from "../../db/firebase";
import { getAuth } from "firebase/auth";
import { doc, setDoc, query, where, collection, getDoc, getDocs } from "firebase/firestore"; 
import { db } from "../../db/firebase";
import Gabay from "../../models/users/Gabay";
import Prayer from "../../models/users/Prayer";
import Loading from "../../components/Loading";
import MyHeader from "../../components/MyHeader"
import UserDetails from "../../components/UserDetails";
import { RefreshControl } from "react-native";

const PrayersList = props => {
    
    const [USERS, setUSERS] =useState([]);
    const [hideUsers, setHideUsers] =useState([]);
    const [isLoading, setIsLoading] =useState(true)
    const [refreshing, setRefreshing] = React.useState(false);

    let user;
    const aaa = () => {
        setRefreshing(true)
        wait(2000).then(() => setRefreshing(false));
    }
       
    

    const findUsersInSynagogue = (synagogue) => {

            const q = query(collection(db, "users"), where("synagogue", "==", synagogue));

            const querySnapshot = getDocs(q)
            .then((querySnapshot) => { querySnapshot.forEach((doc) => {
                const info = doc.data()
                USERS.push(new Prayer(info.firstName, info.lastName, info.uid, info.phone, info.email, info.password, info. synagogue))
            })
            })
            .catch((err) => {

            })
            
    }


useEffect(() => {
        const auth = getAuth();
        console.log('auth is:', auth.currentUser.uid);
        const docRef = doc(db, "users", auth.currentUser.uid);
        getDoc(docRef)
        .then((doc)=> {
            if (doc.exists()){
              const info = doc.data()
              if (info.isGabay){
                user = new Gabay(info.firstName, info.lastName, info.uid, info.phone, info.email, info.password, info.synagogue)
                user.setIsGabay(true)
                console.log(user.synagogue)
                setIsLoading(false)
                //USERS.push(user)
                findUsersInSynagogue(user.synagogue)
              }
              else {
                user = new Prayer(info.firstName, info.lastName, info.uid, info.phone, info.email, info.password, info.synagogue)
            }
        }
        else{
            console.log("user is not found")
        }
    })
    .catch((err) => {
        console.log("doc err", err)
    })
},[])

const renderUserItem = (itemData) => {
    return (
      <UserDetails
        synagogueName = {itemData.item.synagogue} 
        fullName = {itemData.item.firstName + " " + itemData.item.lastName}
        phone =  {itemData.item.phoneNumber}
        email = {itemData.item.email}
      />
   );
  };

    //console.log(rashi)
    return (
    //     <View style={styles.screen}>
    //         

    //               { isLoading ? <View style={styles.loading}><Loading/></View> : (
    // <View>
    //     {/* <View style={styles.item}>
    //         <Text style={styles.title}>רשימת מתפללים</Text>
    //     </View> */}
    //         <View style={{justifyContent: "center"}}>
    //             {/* <Text>{USERS[0]}</Text> */}
    //         </View>
    
    
    // </View>) }
    //     </View>
    <View style={styles.screen}>
        <MyHeader title="רשימת מתפללים" onSelect={() => {
                 props.navigation.toggleDrawer();
                 setHideUsers(USERS)
                 setUSERS([])
             }}/>
         <FlatList
            // refreshControl={
            //     <RefreshControl 
            //     refreshing={refreshing}
            //     onRefresh={aaa}
            //   />
            // }
            data={USERS}
            renderItem={renderUserItem}
            keyExtractor={item => item.uid}
            contentContainerStyle={{ paddingBottom: 60, padding: 20, alignItems: 'center' }}
            />
    </View>
    );
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignContent: "center",
    },
    loading: {
        marginTop: 52,
        padding: 0
      },
    item: {
        padding: 15,
        marginVertical: 8,
        alignContent: 'center',
       // alignItems: 'center',
        
      },
      title: {
          
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#fff0e1",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        
      },
      text: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: "bold",
      }
});

PrayersList.navigationOptions = {
    headerTitle: "רשימת מתפללים",
  };
  
export default PrayersList;