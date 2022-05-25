import React, {useEffect, useState} from "react";
import {StyleSheet, FlatList, View, Text, ImageBackground, Modal, TouchableWithoutFeedback, Keyboard, TextInput} from 'react-native';
import Category from "../models/others/category";
import CategoryGridTile from "../components/CategoryGridTile";
import Candle from "../pictures/candle.jpg"
import YzkorComponent from "../components/YzkorComponent";
import Niftar from "../models/others/Niftar";
import { doc, setDoc, collection, getDoc, getDocs, deleteDoc } from "firebase/firestore"; 
import { db } from "../db/firebase";
import MyButton from "../components/MyButton";
import { Alert } from "react-native";

const addNewNameToFirestore = (user, name) => {
    const ref = doc(db, "Synagogues", user.synagogue, "Yzkor", name.fullName);
    const a = setDoc(ref, {
        date: name.date,
    });
}

const deleteNameFromFirestore = (user, fullName) => {
    deleteDoc(doc(db, "Synagogues", user.synagogue, "Yzkor", fullName))
    .then((res) => {
        console.log(`Name ${fullName} was deleted`)
    })
    .catch((err) => {
        console.log("err is:\n", err)

    })
}

const Yzkor = (props) => {
    const [NAMES, setNAMES] = useState([])
    const [showModal, setShowModal] = useState (false)
    const [fullName, setFullName] = useState("")
    const [date, setDate] = useState("")
    const [noData, setNoData] = useState (true)


    const user = props.navigation.getParam('user');
    const synagogue = props.navigation.getParam('synagogue');

    useEffect(() => {
        const col = collection(db, "Synagogues", user.synagogue , "Yzkor");
        const asy =  async () => {
            const data = await getDocs(col)
            .then((querySnapshot) => {querySnapshot.forEach((person) => {
                // doc.data() is never undefined for query doc snapshots
                setNoData(false)
                NAMES.push(new Niftar(person.id, person.data().date))
            });
        })
    }
    asy()
    .catch((err) => {
        console.log(err.message)
    })
    },[]);

    const renderNamesItem = (itemData) => {
      

        return (
          <YzkorComponent 
            fullName= {itemData.item.fullName} 
            date={itemData.item.date}
            onSelect= {() => { if (user.isGabay){
                Alert.alert(itemData.item.fullName, "בחר את האפשרות המתאימה", 
                [{text: "ביטול"}, {text: "הסר", style: "destructive", onPress: () => {
                                Alert.alert("האם להסיר את השם?", null, [ {text: "לא"}, {text: "כן", onPress: () => {
                                    deleteNameFromFirestore(user, itemData.item.fullName)
                                    const index = NAMES.indexOf(itemData.item);
                                        if (index > -1) {
                                            NAMES.splice(index, 1); // 2nd parameter means remove one item only
                                        } 
                                    Alert.alert("השם הוסר", null, [ {text: "בסדר"}])
                                            }
                                        }])
                    }}, ]
                  )
                }
            }}
          />
        
        
        );
      };
    
      return (
          <View style={styles.screen}> 
            { noData && (<View><Text>טקסט</Text></View>)}
            <Modal
                            animationType= {"slide"}
                            transparent= {false}
                            visible={showModal}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={styles.ModalContainer}>
                        <Text style={styles.ModalTitle}>שם חדש</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="שם מלא"
                                    value={fullName}
                                    onChangeText={(text) => {
                                        setFullName(text);
                                    //setErrorMessage("");
                                    }}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="תאריך פטירה"
                                    value={date}
                                    onChangeText={(text) => {
                                        setDate(text);
                                    //setErrorMessage("");
                                    }}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.modalButtons}>
            <MyButton text="ביטול" onSelect={() => { setShowModal(!showModal)}} changeWidth="50%"/>
            <MyButton text="אישור" onSelect={() => {
                if (fullName.length > 0 && date.length > 0) {
                const newName = new Niftar(fullName, date)
                console.log(newName, user)
                addNewNameToFirestore(user, newName);
                NAMES.push(newName)
                setShowModal(!showModal)
            }
            }} 
                  changeWidth="50%" />
                  </View>
                        </View>
                    </TouchableWithoutFeedback>
              </Modal>
            <ImageBackground source={Candle} resizeMode="stretch" style={styles.image}>
                <Text style={styles.text}>"וְנָתַתִּי לָהֶם בְּבֵיתִי וּבְחוֹמֹתַי יָד וָשֵׁם..."</Text>
                {user.isGabay && <View style={{alignItems: "center"}}>
                    <MyButton text="הוסף שם" 
                        changeMarginTop= {5}
                        changeWidth= "40%"
                        onSelect={() => {
                        setShowModal(true);}}
                    />
                </View>
        }       
                <FlatList
                    data={NAMES} numColumns={2} renderItem={renderNamesItem}
                    contentContainerStyle={{ paddingBottom: 20, alignItems: "center", justifyContent: "space-around" }}
                    keyExtractor={item => item.fullName}
                />
            </ImageBackground>
        </View>
      );
};



Yzkor.navigationOptions = {
    headerTitle: "יזכור",
    headerBackTitle: "מסך הבית"
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems:'center',
        fontWeight: "bold",
      },
    text: {
        fontSize: 24,
        padding: 30,
        color: "white",
        textAlign: "center"
    },
    image: {
        flex: 1,
        width: "100%"
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: "white",
        
      },
      ModalContainer: {
        flex: 1,
        
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffd0",
        padding: 80,
      },
    ModalTitle: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        width: "100%",
        //backgroundColor: "white",
        //height: "40%"
      },
      input: {
        textAlign: "right",
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        
      },
    modalButtons: {
        alignItems: 'center',
        flexDirection: "row", 
        justifyContent: "space-around"
    },
});

export default Yzkor;