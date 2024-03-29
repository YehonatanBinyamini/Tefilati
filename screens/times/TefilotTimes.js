import React, { useEffect, useState } from "react";
import {Text, View, StyleSheet, Modal, TouchableWithoutFeedback, TextInput, Keyboard, Alert, ScrollView} from 'react-native';
import MyButton from "../../components/MyButton";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import Colors from "../../constants/colors";
import { db } from "../../db/firebase";
import Home from "../Home";

const TefilotTimes = props => {
  const user = props.navigation.getParam('user');
  const synagogue = props.navigation.getParam('synagogue');
  const turnedOff = props.navigation.getParam('turnedOff');

  const [showModal, setShowModal] = useState(false);
  //synagogue values:
  const [shacharit, setShacharit] = useState(synagogue.shacharit)
  const [mincha, setMincha] = useState(synagogue.mincha)
  const [arvit, setArvit] = useState(synagogue.arvit)
  const [dafYomi, setDafYomi] = useState(synagogue.dafYomi)
//second modal:
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [counterStatus, setCounterStatus] = useState("כבוי")
  const [colorStatus, setColorStatus] = useState("green")
  const [buttonCounter, setButtonCounter] = useState("הפעל מונה")
  const [type, setType] = useState("")


    return (
        <View style={styles.item}>
          <Modal
            animationType= {"slide"}
            transparent= {false}
            visible={showModal}

          >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        
          
          <View style={styles.ModalContainer}>
          <Text style={styles.ModalTitle}>עריכת זמני תפילות</Text>
          <View style={styles.inputContainer}>
          <TextInput
            placeholder="שחרית (ניתן לכתוב מספר זמני תפילות)"
            value={shacharit}
            onChangeText={(text) => {
              setShacharit(text);
            }}
            style={styles.input}
          />
          </View>
          <View style={styles.inputContainer}>
          <TextInput
            placeholder="מנחה (ניתן לכתוב מספר זמני תפילות)"
            value={mincha}
            onChangeText={(text) => {
              setMincha(text);
            }}
            style={styles.input}
          />
          </View>
          
          <View style={styles.inputContainer}>
          <TextInput
            placeholder="ערבית (ניתן לכתוב מספר זמני תפילות)"
            value={arvit}
            onChangeText={(text) => {
              setArvit(text);
            }}
            style={styles.input}
          />
          </View>

          <View style={styles.inputContainer}>
          <TextInput
            placeholder="דף יומי (ניתן להשאיר ריק)"
            value={dafYomi}
            onChangeText={(text) => {
              setDafYomi(text);
            }}
            style={styles.input}
          />
          </View>
          <View style={styles.modalButtons}>
            <MyButton text="ביטול" onSelect={() => {setShowModal(!showModal)}} changeWidth="50%"/>
            <MyButton text="אישור" onSelect={() => {
              //const newSynagogue = new Synagogue(synagogueName,synagogueAddress, synagogueSeats, shacharit, mincha, arvit, dafYomi)
              //console.log(newSynagogue)
              Alert.alert("פרטי בית הכנסת נשמרו",null , [{text: "סגור"}])
              synagogue.setShacharit(shacharit)
              synagogue.setMincha(mincha)
              synagogue.setArvit(arvit)
              synagogue.setDafYomi(dafYomi)
              setShowModal(false)
              const theDoc = doc(db, "Synagogues", synagogue.name);
              updateDoc(theDoc, {
                shacharit: shacharit,
                mincha: mincha,
                arvit: arvit,
                dafYomi: dafYomi
               });
            }} 
              changeWidth="50%" />
          </View>
          </View>
          </TouchableWithoutFeedback>
          
        </Modal>
      {/* second modal: PRAYERS COUNTER*/}
        <Modal
            animationType= {"slide"}
            transparent= {false}
            visible={showCounterModal}

          >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        
          
          <View style={styles.ModalContainer}>
          <Text style={styles.ModalTitle}>הפעלת מונה לבדיקת מנין</Text>
          <Text style={{fontSize: 20, color:colorStatus}}>{`המונה ${counterStatus} כעת`}</Text>
          { !synagogue.counterOn && (<View style={styles.inputContainer}>
          <TextInput
            placeholder="כתוב לאיזו תפילה המונה מופעל"
            value={type}
            onChangeText={(text) => {
              setType(text);
            }}
            style={styles.input}
          />
          </View>)}
          
          <View style={styles.modalButtons}>
            <MyButton text="ביטול" onSelect={() => {setShowCounterModal(!showCounterModal)}} changeWidth="50%"/>
            <MyButton text={buttonCounter} onSelect={() => {
              synagogue.counterOn = !synagogue.counterOn;              
              setShowCounterModal(false)
              const theDoc = doc(db, "Synagogues", synagogue.name);
              updateDoc(theDoc, {
                counterOn: synagogue.counterOn,
               });

               if (synagogue.counterOn){
                 
                 const ref = doc(db, "Synagogues", user.synagogue, "Counter", "counter");
                 const a = setDoc(ref, {
                  type: type,
                  counterOn: true,
                  prayers: [], //the prayers that will coming
                  numOfComings: 0,
                });
               } else {
                  setType("")
                  const ref = doc(db, "Synagogues", user.synagogue, "Counter", "counter");
                  const a = setDoc(ref, {
                  type: "",
                  counterOn: false,
                  prayers: [], //the prayers that will coming
                  numOfComings: 0,
                });
               }
               setTimeout(() => {
                 turnedOff()
              }, 1000);      
            }} 
              changeWidth="50%" />
          </View>
          </View>
          </TouchableWithoutFeedback>
          
        </Modal>


            <View >
            <Text style={styles.title}>זמני תפילות בבית כנסת {synagogue.name}</Text>
            </View>
            
            <View style={styles.item}>
            <Text style={styles.text}>שחרית: {synagogue.shacharit}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.text}>מנחה: {synagogue.mincha}</Text>
            </View>
            <View style={styles.item}>
            <Text style={styles.text}>ערבית: {synagogue.arvit}</Text>
            </View>
            {synagogue.dafYomi.length > 0 && (<View style={styles.item}>
            <Text style={styles.text}>דף יומי: {synagogue.dafYomi}</Text>
            </View>)}
            <View style={{alignItems: "center"}}>
            {user.isGabay &&  (
            <View style={{width: "80%", alignItems: "center"}}>
            <MyButton text="ערוך" changeMarginTop={10} onSelect={() => {
              setShowModal(true)
            }}/>
            <MyButton text="בדיקת מנין" changeMarginTop={10} onSelect={() => {
              setShowCounterModal(true)
              if (synagogue.counterOn){
                setCounterStatus("פועל")
                setButtonCounter("כבה מונה")
                setColorStatus("red")
              } else {
                setCounterStatus("כבוי")
                setButtonCounter("הפעל מונה")
                setColorStatus("green")
              }
            }}/>
            </View>
            )}
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        marginVertical: 8,
        alignContent: 'center',
       //alignItems: 'center',
        
      },
      title: {
          
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        
      },
      text: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: "bold",
      },
      inputContainer: {
        width: "80%",
      },
      input: {
        textAlign: "right",
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
      },
      buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
      },
      button: {
        backgroundColor: Colors.myBlue,
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
      },
      buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: Colors.myBlue,
        borderWidth: 2,
      },
      buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 19,
      },
      buttonOutlineText: {
        color: Colors.myBlue,
        fontWeight: "700",
        fontSize: 19,
      },
      error: {
        color: "red",
        textAlign: "right",
      },
      picker: {
        marginVertical: 30,
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#FFF",
      },
      ModalTitle: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30,
    },
    modalButtons: {
      alignItems: 'center',
      flexDirection: "row", 
      justifyContent: "space-around"
    },
    ModalContainer: {
      flex: 1,
      //justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffd0",
      padding: 50,
    }
});

TefilotTimes.navigationOptions = {
    headerTitle: "זמני תפילות",
  };
  
export default TefilotTimes;