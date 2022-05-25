import React, {useState, useEffect} from "react";
import { StyleSheet, FlatList, TouchableOpacity, Text, View, StatusBar, TextInput, Linking, Alert,  } from "react-native";
import { doc, setDoc, collection, getDoc, getDocs, updateDoc } from "firebase/firestore"; 
import { db } from "../../db/firebase"
import Colors from "../../constants/colors";
import MyButton from "../../components/MyButton";
import SaleComponent from "../../components/Sale";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import Sale from "../../models/others/Sale";

const Sales = (props) => {

    const [DATA, setDATA] = useState([])
    const [title, setTitle] = useState("כותרת")
    const [showInput, setShowInput] = useState(false)
    const [titleTextButton, setTitleTextButton] = useState("ערוך כותרת")
    const [typeTextButton, setTypeTextButton] = useState("הוסף קטגוריה")
    const [showInput2, setShowInput2] = useState(false)
    const [type, setType] = useState("")
    const [price, setPrice] = useState("")


    const user = props.navigation.getParam('user');

    const renderSaleItem = (itemData) => {

        return (
            <SaleComponent kind={itemData.item.kind} price={itemData.item.price} fullName={itemData.item.fullName}
                color={itemData.item.isSold ? "red" : "#7cb342"}
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
                    showInput ? setTitleTextButton("ערוך כותרת") : setTitleTextButton("אשר כותרת")
                }}/>
                <MyButton text={typeTextButton} changeWidth= "50%" changeMarginTop={10} onSelect={() => {
                    setShowInput2(!showInput2)
                    if (showInput2)  {
                        setTypeTextButton("הוסף קטגוריה")
                        const theDoc = doc(db, "Synagogues", user.synagogue, "Sales", "sales");
                        getDoc(theDoc)
                        .then((doc)=> {
                        if (doc.exists()){
                            updateDoc(theDoc, {
                                title: title,
                                data: DATA,
                            });
                        } else {
                            //setTheDoc
                        }
                        })
                        .catch((err) => {
                            console.log("doc err", err)
                          })
                        

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
                keyboardType="default"
            />
            </View>}
            <FlatList
            data={DATA}
            renderItem={renderSaleItem}
            keyExtractor={(item) => item.kind}
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