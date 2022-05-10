import React, {useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Empty} from 'react-native'
import SynagogueDetails from "../../components/SynagogueDetails";
import Request from "../../models/others/Request"
import { doc, setDoc, collection, getDoc, getDocs, deleteDoc } from "firebase/firestore"; 
import { db } from "../../db/firebase"

const deleteRequestFromFirestore = (user) => {
    deleteDoc(doc(db, "requests", user.uid))
    .then((res) => {
        console.log("res is:\n", res)
    })
    .catch((err) => {
        console.log("err is:\n", err)

    })
}

const addSynagogueToFirestore = (synagogue) => {
    const seatsArray = []
    for (let i=0; i < synagogue.synagogueSeats; i++){
        seatsArray.push("פנוי")
    } 
    const ref = doc(db, "Synagogues", synagogue.synagogueName);
            const a = setDoc(ref, {
              address: synagogue.synagogueAddress,
              seatsArray: seatsArray,
              shacharit: synagogue.shacharit, 
              mincha: synagogue.mincha,
              arvit: synagogue.arvit,
              dafYomi: synagogue.dafYomi,
              uidGabay: synagogue.uid, // synagogue.uid its the uid of itemData.item
            });
}

const addUserToFirestore = (user) => {
    const ref = doc(db, "users", user.uid);
            const a = setDoc(ref, {
              firstName: user.firstName,
              lastName: user.lastName,
              uid: user.uid,
              phone: user.phone,
              email: user.email,
              password: user.password,
              synagogue: user.synagogueName,
              isGabay: true,
            });
}

const renderRequestItem = (itemData) => {
    return (
      <SynagogueDetails 
        onSelect = {() => {
            Alert.alert("בית כנסת " + itemData.item.synagogueName, "האם לאשר את הבקשה?", 
                [ {text: "אשר", onPress: () => {
                                Alert.alert("האם לאשר את הבקשה?", null, [ {text: "לא"}, {text: "כן", onPress: () => {
                                    addUserToFirestore(itemData.item) // users 
                                    addSynagogueToFirestore(itemData.item) //synagogues
                                    deleteRequestFromFirestore(itemData.item) //requests
                                    Alert.alert("הבקשה אושרה", null, [ {text: "בסדר"}])
                                             }
                                        }])
                                }
                  }, 
                  {text: "ביטול"}, {text: "דחה", style: "destructive", onPress: () => {
                                Alert.alert("האם לדחות את הבקשה?", null, [ {text: "לא"}, {text: "כן", onPress: () => {
                                    deleteRequestFromFirestore(itemData.item) //requests
                                    Alert.alert("הבקשה נדחתה", null, [ {text: "בסדר"}])
                                            }
                                        }])
                    }}, ]
                  )
            
        }}
        synagogueName = {itemData.item.synagogueName} 
        synagogueAddress = {itemData.item.synagogueAddress}
        synagogueSeats = {itemData.item.synagogueSeats}
        fullName = {itemData.item.firstName + " " + itemData.item.lastName}
        phone =  {itemData.item.phone}
        email = {itemData.item.email}
        password = {itemData.item.password}
      />
    
    );
  };

const Requests = (props) => {
    const [synagogues, setSynagogues] = useState ([])
    const [noData, setNoData] = useState (true)
    
    
    //if (user instanceof Gabay)
    
    useEffect(() => {
        const col = collection(db, "requests");
        const asy =  async () => {
            const data = await getDocs(col)
            .then((querySnapshot) => {querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setNoData(false)
                console.log(doc.data())
                //(synagogueName, address, seats, fullName, phone, email, password)
                const info = doc.data()
                synagogues.push(new Request(info.synagogueName, info.synagogueAddress, info.synagogueSeats, info.firstName, info.lastName, info.phone, info.email, info.password, info.uid, info.shacharit, info.mincha, info.arvit, info.dafYomi))
            });
        })
    }
    asy()
    .catch((err) => {
        console.log(err.message)
    })
    //setSynagogues(false)
}   ,[]);
//upload notes to firestore:

    //const ref = doc(db, "users", user.uid);
    //const a = setDoc(ref,{})
    return (
         <View style={styles.container}>
             
             { noData &&<Text style={styles.text}>אין מידע</Text>}
                
        <FlatList  
        data={synagogues} renderItem={renderRequestItem} 
        keyExtractor={item => item.body}
        contentContainerStyle={{ paddingBottom: 60, padding: 20, alignItems: 'center' }}
        //extraData={synagogues}
        //ListEmptyComponent={<Empty message="No data found." />}
        />
        </View>
    )
}

Requests.navigationOptions = {
    headerTitle: "בקשות הרשמה",
    headerBackTitle: "ניהול"
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
      
        justifyContent: 'center',
        alignItems: 'center',
        

    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 30,
    }
})

export default Requests;