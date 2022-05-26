import React, {useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import PaymentDetails from "../../components/PaymentDetails";
import { doc, setDoc, collection, getDoc, getDocs, deleteDoc, snapshotEqual, query, where } from "firebase/firestore"; 
import { db } from "../../db/firebase";
import Payment from "../../models/others/Payment";

const deletePaymentFromFirestore = (user, item) => {
    deleteDoc(doc(db, "Synagogues", user.synagogue, "Payments", item.docId))
    .then((res) => {
        console.log("donation "+item.docId+" was deleted")
    })
    .catch((err) => {
        console.log("err is:\n", err)

    })
}



const Details = (props) => {
    const [cards, setCards] = useState ([])
    const [noData, setNoData] = useState (true)
    
    const user = props.navigation.getParam('user');
    const synagogue = props.navigation.getParam('synagogue');
    
    const renderPaymentItem = (itemData) => {
        return (
          <PaymentDetails 
            onSelect = {() => {if (user.isGabay) {
                Alert.alert(itemData.item.subject, "בחר את האפשרות המתאימה",
                            [ {text: "ביטול"}, {text: "מחק", style: "destructive", onPress: () => {
                                    Alert.alert("האם למחוק את התיעוד מהמאגר?", null, [ {text: "לא"}, {text: "כן", onPress:() => {
                                        deletePaymentFromFirestore(user, itemData.item)
                                        const index = cards.indexOf(itemData.item);
                                        if (index > -1) {
                                            cards.splice(index, 1); // 2nd parameter means remove one item only
                                        } 
                                        setCards([...cards])
                                        Alert.alert(`התיעוד ${itemData.item.subject} נמחק`, null, [ {text: "בסדר"}])
                                                }
                                            }])
                        }} ]
                      )
                
            }}}
            subject = {itemData.item.subject} 
            date = {itemData.item.date}
            price = {itemData.item.type === "תשלום" ?  "על סך "+itemData.item.price+' ש"ח' : "\0" }
            type = {itemData.item.type}
            fullName = {itemData.item.fullName}
            hakdasha = {itemData.item.type === "תרומה" ? itemData.item.hakdasha : "\0"}
          />
            
        );
      };

    useEffect(() => {

        const q = query(collection(db, "Synagogues", synagogue.name, "Payments" ), where("fullName", "==", user.firstName+" "+user.lastName));
        const forPrayer = async () => {
        const querySnapshot = await getDocs(q)
        .then((querySnapshot) => { querySnapshot.forEach((doc) => {
            setNoData(false)
            const info = doc.data()
            cards.push(new Payment(doc._document.key.path.segments[6], info.subject, info.date, info.fullName, info.price, info.type, info.hakdasha))
        })
        })
        }
        const col = collection(db, "Synagogues", user.synagogue , "Payments");
        const forGabay =  async () => {
            const data = await getDocs(col)
            .then((querySnapshot) => {querySnapshot.forEach((pay) => {
                // doc.data() is never undefined for query doc snapshots
                setNoData(false)
                const info = pay.data()
                cards.push(new Payment(pay._document.key.path.segments[8], info.subject, info.date, info.fullName, info.price, info.type, info.hakdasha))
            });
        })
        }
        if (user.isGabay){
            forGabay()
            .catch((err) => {
                console.log("error:", err.message)
            })
        } else {
            forPrayer()
            .catch((err) => {
                console.log(err.message)
            })
        }
    },[]);

    return (
         <View style={styles.container}>
             
             { noData && <Text style={styles.text}>אין מידע</Text>}

                 <FlatList 
                    data={cards}
                    renderItem={renderPaymentItem}
                    keyExtractor={item => item.docId}
                    contentContainerStyle= {{paddingBottom: 60, padding: 20, alignItems: "center"}}
                    extraData={cards}
                 />
        </View>
    )
}

Details.navigationOptions = {
    headerTitle: "תיעוד",
    headerBackTitle: "הקודם",
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
    },
})

export default Details;