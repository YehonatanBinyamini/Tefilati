import React, {useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Empty} from 'react-native'
import SynagogueDetails from "../../components/SynagogueDetails";
import Request from "../../models/others/Request"
import { doc, setDoc, collection, getDoc, getDocs, deleteDoc, snapshotEqual, query, where } from "firebase/firestore"; 
import { db } from "../../db/firebase"
import Gabay from "../../models/users/Gabay";


const deleteSynagogueFromFirestore = (item) => {
    deleteDoc(doc(db, "Synagogues", item.synagogueName))
    .then((res) => {
        console.log("res is:\n", res)
    })
    .catch((err) => {
        console.log("err is:\n", err)

    })
}

const Synagogues = (props) => {
    const [synagogues, setSynagogues] = useState ([])
    const [noData, setNoData] = useState (true)

    const renderRequestItem = (itemData) => {
        return (
          <SynagogueDetails 
            onSelect = {() => {
                Alert.alert("בית כנסת " + itemData.item.synagogueName, "בחר את האפשרות המתאימה", 
                    [ {text: "ביטול"}, {text: "מחק", style: "destructive", onPress: () => {
                                    Alert.alert("האם למחוק את בית הכנסת מהמאגר?", null, [ {text: "לא"}, {text: "כן", onPress: () => {
                                        deleteSynagogueFromFirestore(itemData.item) 
                                        const index = synagogues.indexOf(itemData.item);
                                        if (index > -1) {
                                            synagogues.splice(index, 1); // 2nd parameter means remove one item only
                                        }
                                        setSynagogues([...synagogues])
                                        Alert.alert(`בית כנסת ${itemData.item.synagogueName} נמחק`, null, [ {text: "סגור"}])
                                                }
                                            }])
                        }}, ]
                      )
                
            }}
            synagogueName = {itemData.item.synagogueName} 
            synagogueAddress = {itemData.item.synagogueAddress}
            synagogueSeats = {itemData.item.synagogueSeats.length}
            // synagogueSeats = {23}
            fullName = {itemData.item.firstName + " " + itemData.item.lastName}
            phone =  {itemData.item.phone}
            email = {itemData.item.email}
            password = {itemData.item.password}
          />
    
    
    
    );
      };
    let users = {};

    useEffect(() => {

        const q = query(collection(db, "users"), where("isGabay", "==", true));
        const getGabais = async () => {
        const querySnapshot = await getDocs(q)
        .then((querySnapshot) => { querySnapshot.forEach((doc) => {
            const info = doc.data()
            users[info.uid] = new Gabay(info.firstName, info.lastName, info.uid, info.phone, info.email, info.password, info. synagogue)
            //console.log("sada")doc.id, " => ", doc.data())
        })
        })
    }
        getGabais()
        .catch((err) => {
            console.log(err.message)
        })
    },[]);
    
    useEffect(() => {
        
        const col = collection(db, "Synagogues");
        const asy =  async () => {
            const data = await getDocs(col)
            .then((querySnapshot) => {querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setNoData(false)
                //(synagogueName, address, seats, fullName, phone, email, password)
                const info = doc.data()
                const i = info.uidGabay;
                synagogues.push(new Request(doc._document.key.path.segments[6], info.address, info.seatsArray, users[i].firstName, users[i].lastName, users[i].phoneNumber, users[i].email, users[i].password, info.uidGabay, info.shacharit, info.mincha, info.arvit, info.dafYomi))
                
            })
        })
        
    }
    
    asy()
    .catch((err) => {
        console.log(err.message)
    });
    console.log(users)
}   ,[]);

    return (
         <View style={styles.container}>
             
             { noData &&<Text style={styles.text}>אין מידע</Text>}
                
        <FlatList  
        data={synagogues} renderItem={renderRequestItem} 
        keyExtractor={item => item.synagogueName}
        contentContainerStyle={{ paddingBottom: 60, padding: 20, alignItems: 'center' }}
        //extraData={synagogues}
        //ListEmptyComponent={<Empty message="No data found." />}
        />
        </View>
    )
}

Synagogues.navigationOptions = {
    headerTitle: "בתי כנסת פעילים",
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

export default Synagogues;