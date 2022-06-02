import React, {useState, useEffect} from "react";
import { StyleSheet, FlatList, TouchableOpacity, Text, View, StatusBar, TextInput, Linking, Alert,  } from "react-native";
import { doc, setDoc, collection, getDoc, getDocs, updateDoc } from "firebase/firestore"; 
import { db } from "../../db/firebase"
import Colors from "../../constants/colors";
import MyButton from "../../components/MyButton";
import SaleComponent from "../../components/Sale";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import Sale from "../../models/others/Sale";

class FirestoreSale {
    constructor(title, data){
        this.title = title;
        this.data = data;
    }
}

const saleConverter = {
    toFirestore: function(sale) {
        return {
            fullName: sale.fullName,
            price: sale.price,
            type: sale.type,
            isSold: sale.isSold
        }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Sale(data.questionStr, data.type, data.options)
    }
}
const FSConverter = {
    toFirestore: function(FS) {
        return {
            title: FS.title,
            data: FS.data.map(sale => saleConverter.toFirestore(sale))
        }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new FirestoreSale(data.title, data.data)
    }
}

const Sales = (props) => {

    const [DATA, setDATA] = useState([])
    const [title, setTitle] = useState("אין מידע")
    const [showInput, setShowInput] = useState(false)
    const [titleTextButton, setTitleTextButton] = useState("ערוך כותרת")
    const [typeTextButton, setTypeTextButton] = useState("הוסף קטגוריה")
    const [showInput2, setShowInput2] = useState(false)
    const [type, setType] = useState("")
    const [price, setPrice] = useState("")
    const [selectedId, setSelectedId] = useState(null);

    const user = props.navigation.getParam('user');

    const setDataInFirestore = () => {
        const ref = doc(db, "Synagogues", user.synagogue, "Sales", "sales").withConverter(FSConverter);
        const a = setDoc(ref, new FirestoreSale(title, DATA));
    }

    useEffect(() => {
        const docRef = doc(db, "Synagogues", user.synagogue, "Sales", "sales");
        getDoc(docRef)
        .then((doc)=> {
          if (doc.exists()){
            setTitle(doc.data().title)
            setDATA(doc.data().data)
        }
          else{
            console.log("there is no synagogue for this user")
          }
        })
        .catch((err) => {
          console.log("doc err", err)
        })
    },[])

    const renderSaleItem = (itemData) => {

        return (
            <SaleComponent type={itemData.item.type} price={itemData.item.price} fullName={itemData.item.fullName}
                color={itemData.item.isSold ? "#ef9a9a" : "#7cb342"}
                onSelect = {() => { 
                    
                    Alert.alert(itemData.item.type, !itemData.item.isSold ? "בחר את האפשרות המתאימה" : `נקנה ע"י ${itemData.item.fullName}`, 
                    itemData.item.isSold ? [{text: "סגור"}, user.isGabay && {text: "מחק", style: "destructive", onPress: () => {
                        Alert.alert("האם למחוק את המודעה?", null, [ {text: "לא"}, {text: "כן", onPress: () => {
                            //deleteNoteFromFirestore(user, itemData.item.subject) 
                            const index = DATA.indexOf(itemData.item);
                            if (index > -1) {
                                DATA.splice(index, 1); // 2nd parameter means remove one item only
                            }
                            setDATA([...DATA])
                            setDataInFirestore()
                            Alert.alert("המודעה נמחקה", null, [ {text: "סגור"}])
                                    }
                                }])
            }}] : [ {text: "ביטול", style: "cancel"}, {text: "קנה",style:"destructive", onPress: () => {
                                        Alert.alert(`האם ברצונך לקנות את  ${itemData.item.type}?`, "עבור אל אפליקציית ביט", [ {text: "לא"}, {text: "כן", onPress: () => {
                                            Linking.openURL("https://www.bitpay.co.il/app/");
                                            itemData.item.isSold = true;
                                            setDATA([...DATA])
                                            itemData.item.fullName=user.firstName+" "+user.lastName;
                                            setDataInFirestore()

                                            //new payment in firestore:
                                            const date = new Date(Date.now()).toLocaleDateString();
                                            const ref = doc(db, "Synagogues", user.synagogue, "Payments", `קניית ${itemData.item.type}`);
                                            const a = setDoc(ref, {
                                            fullName: itemData.item.fullName,
                                            price: itemData.item.price,
                                            type: "תשלום",
                                            date: date,
                                            subject: `קניית ${itemData.item.type}`,
                                            });
                                        } }])
                                        }
                          }, 
                           user.isGabay && {text: "מחק", style: "destructive", onPress: () => {
                                        Alert.alert("האם למחוק את המודעה?", null, [ {text: "לא"}, {text: "כן", onPress: () => {
                                            //deleteNoteFromFirestore(user, itemData.item.subject) 
                                            const index = DATA.indexOf(itemData.item);
                                            if (index > -1) {
                                                DATA.splice(index, 1); // 2nd parameter means remove one item only
                                            }
                                            setDATA([...DATA])
                                            setDataInFirestore()
                                            Alert.alert("המודעה נמחקה", null, [ {text: "סגור"}])
                                                    }
                                                }])
                            }}, ]
                          )
                        
                }}
            /> 
        );
    }

    return (
        <View style={styles.container}>
            { !showInput ?<Text style={styles.title}>{title}</Text> :
            <TextInput
                placeholder="כתוב כאן"
                value={title}
                onChangeText={text => {setTitle(text)}}
                style={styles.input2}
                keyboardType="default"
            />}
            {user.isGabay && (<View style={{flexDirection: "row", justifyContent:"space-around", }}>
                <MyButton text={titleTextButton} changeWidth= "50%" changeMarginTop={10} onSelect={() => {
                    setShowInput(!showInput)
                    setDataInFirestore()
                    showInput ? setTitleTextButton("ערוך כותרת") : setTitleTextButton("אשר כותרת")
                }}/>
                <MyButton text={typeTextButton} changeWidth= "50%" changeMarginTop={10} onSelect={() => {
                    setShowInput2(!showInput2)
                    if (showInput2)  {
                        setTypeTextButton("הוסף קטגוריה")
                        DATA.push(new Sale("", price, type, false))
                        setType("")
                        setPrice("")
                        setDataInFirestore()
                        
                    } else { setTypeTextButton("אשר קטגוריה") }
                }}/>
            </View>)}
           { showInput2 && <View style={styles.inputContainer} >
            <TextInput
                placeholder="שם המצוה"
                value={type}
                onChangeText={text => {setType(text)}}
                style={styles.input}
                keyboardType="default"
            />
            <TextInput
                placeholder="מחיר"
                value={price}
                onChangeText={text => {setPrice(text)}}
                style={styles.input}
                keyboardType="numeric"
            />
            <View style={{alignItems: "center"}}>
            <MyButton text="ביטול" onSelect={()=> {setShowInput2(!showInput2); setTypeTextButton("הוסף קטגוריה")} }/>
            </View>
            </View>}
            <FlatList
                data={DATA}
                renderItem={renderSaleItem}
                keyExtractor={(item) => item.type}
                style={{ width: "100%", }}
                extraData={DATA}

            />
          </View>
      

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        marginVertical: 10,
        fontWeight: "bold",
        marginTop: 20,
    },
    input: {
        textAlign: "right",
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
      },
      input2: {
        textAlign: "right",
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        width: "50%"
      },
    inputContainer: {
        width: '50%',
  },
})

Sales.navigationOptions = {
    headerTitle: "מכירות",
    headerBackTitle: "הקודם"
  };

export default Sales;