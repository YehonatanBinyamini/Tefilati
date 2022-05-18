import React, {useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Modal, TouchableWithoutFeedback, TextInput, Keyboard, Alert} from 'react-native'
import NoteComponent from "../components/Note";
import Note from "../models/others/Note";
import { doc, setDoc, collection, getDoc, getDocs, deleteDoc } from "firebase/firestore"; 
import { db } from "../db/firebase";
import Gabay from "../models/users/Gabay"
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButtons from "../components/HeaderButton";
import MyButton from "../components/MyButton";

const deleteNoteFromFirestore = (user, subject) => {
    deleteDoc(doc(db, "Synagogues", user.synagogue, "NotesBoard", subject))
    .then((res) => {
        console.log(`Note ${subject} was deleted`)
    })
    .catch((err) => {
        console.log("err is:\n", err)

    })
}

const addNewNoteToFirestore = (user, note) => {
    
    const ref = doc(db, "Synagogues", user.synagogue, "NotesBoard", note.subject);
    const a = setDoc(ref, {
        gabay: note.gabay,
        date: note.date,
        body: note.body,
    });
}


const NotesBoard = (props) => {
    
    const user = props.navigation.getParam('user');
    
    const renderNoteItem = (itemData) => {
        return (
          <NoteComponent 
            title = {itemData.item.subject} 
            date = {itemData.item.date}
            gabay = {itemData.item.gabay}
            body =  {itemData.item.body}
            onSelect = {() => {
                Alert.alert(itemData.item.subject, "בחר את האפשרות המתאימה", 
                    [ {text: "ערוך", onPress: () => {
                                    setModalTitle("עריכת מודעה")
                                    setShowModal(true)
                                    setSubject(itemData.item.subject)
                                    setBody(itemData.item.body)
                                    setOldSubject(itemData.item.subject)
                                    setOldBody(itemData.item.body)
                                    }
                      }, 
                      {text: "ביטול"}, {text: "מחק", style: "destructive", onPress: () => {
                                    Alert.alert("האם למחוק את המודעה?", null, [ {text: "לא"}, {text: "כן", onPress: () => {
                                        deleteNoteFromFirestore(user, itemData.item.subject) 
                                        Alert.alert("המודעה נמחקה", null, [ {text: "בסדר"}])
                                                }
                                            }])
                        }}, ]
                      )
                
            }}
          />
        
        );
      };
    
    const [NOTES, setNOTES] = useState ([])
    const [noData, setNoData] = useState (true)
    const [showModal, setShowModal] = useState (false)
    const [subject, setSubject] = useState ("")
    const [oldSubject, setOldSubject] = useState ("")
    const [body, setBody] = useState ("")    
    const [oldBody, setOldBody] = useState ("")
    const [modalTitle, setModalTitle] = useState ("מודעה חדשה")

    //TODO:: find a way to refresh the useEffect/flatlist after editing or deleting
    
    useEffect(() => {
        const col = collection(db, "Synagogues", user.synagogue , "NotesBoard");
        const asy =  async () => {
            const data = await getDocs(col)
            .then((querySnapshot) => {querySnapshot.forEach((note) => {
                // doc.data() is never undefined for query doc snapshots
                setNoData(false)

                NOTES.push(new Note(note.data().gabay, note.data().date, note.id, note.data().body))
            });
        })
    }
    asy()
    .catch((err) => {
        console.log(err.message)
    })
}   ,[]);
//upload notes to firestore:

    //const ref = doc(db, "users", user.uid);
    //const a = setDoc(ref,{})
    return (
         <View style={styles.container}>
             
             { noData &&<Text style={styles.text}>אין מודעות</Text>}
       {user.isGabay && <MyButton text="מודעה חדשה" onSelect={() => {
                setModalTitle("מודעה חדשה"); 
                setSubject("")
                setBody("")
                setShowModal(true);
            }}/>
        }
            <Modal
                            animationType= {"slide"}
                            transparent= {false}
                            visible={showModal}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={styles.ModalContainer}>
                        <Text style={styles.ModalTitle}>{modalTitle}</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="כותרת"
                                    value={subject}
                                    onChangeText={(text) => {
                                        setSubject(text);
                                    //setErrorMessage("");
                                    }}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="כתוב כאן את הודעתך"
                                    value={body}
                                    multiline={true}
                                    onChangeText={(text) => {
                                        setBody(text);
                                    //setErrorMessage("");
                                    }}
                                    style={styles.inputBody}
                                />
                            </View>
                            <View style={styles.modalButtons}>
            <MyButton text="ביטול" onSelect={() => { setShowModal(!showModal)}} changeWidth="50%"/>
            <MyButton text="אישור" onSelect={() => {
              setNoData(false)
              if ((subject !== oldSubject || body !== oldBody) && (oldSubject !== "" && oldBody !== "" )) {
                deleteNoteFromFirestore(user, oldSubject)
              }
                const now = new Date(Date.now()).toLocaleDateString()
                const note = new Note(user.firstName+" "+user.lastName, now, subject, body)
                console.log(note, user)
                addNewNoteToFirestore(user, note);
                NOTES.push(note)
                setShowModal(!showModal)
            }} 
                  changeWidth="50%" />
                  </View>
                        </View>
                    </TouchableWithoutFeedback>
              </Modal>      
        <FlatList  
        data={NOTES} renderItem={renderNoteItem} 
        keyExtractor={item => item.body}
        contentContainerStyle={{ paddingBottom: 60, padding: 20, alignItems: 'center' }}
        
        />
        </View>
    )
}

NotesBoard.navigationOptions = (navData) => {
    return {
        headerTitle: 'לוח מודעות',
        headerBackTitle: "מסך הבית",      
    };
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
    ModalContainer: {
        flex: 1,
        
        //justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffd0",
        padding: 80,
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
      inputBody: {
        textAlign: "right",
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        height: "60%",
        textAlignVertical: "top",
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
})

export default NotesBoard;

{/* <Modal
        animationType= {"slide"}
        transparent= {false}
        visible={showModal}

      >
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          
          <View style={styles.ModalContainer}>
          <Text style={styles.ModalTitle}>בית כנסת חדש</Text>
          <View style={styles.inputContainer}>
          <TextInput
            placeholder="שם בית הכנסת"
            value={synagogueName}
            onChangeText={(text) => {
              setSynagogueName(text);
              setErrorMessage("");
            }}
            style={styles.input}
          />
          </View>
          <View style={styles.inputContainer}>
          <TextInput
            placeholder="כתובת"
            value={synagogueAddress}
            onChangeText={(text) => {
              setSynagogueAddress(text);
              setErrorMessage("");
            }}
            style={styles.input}
          />
          </View>
          <View style={styles.inputContainer}>
          <TextInput
            placeholder="מספר מקומות ישיבה"
            value={synagogueSeats}
            onChangeText={(num) => {
              setSynagogueSeats(num);
              setErrorMessage("");
            }}
            style={styles.input}
          />
          </View>
          <View style={styles.inputContainer}>
          <TextInput
            placeholder="שחרית (ניתן לכתוב מספר זמני תפילות)"
            value={shacharit}
            onChangeText={(text) => {
              setShacharit(text);
              setErrorMessage("");
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
              setErrorMessage("");
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
              setErrorMessage("");
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
              setErrorMessage("");
            }}
            style={styles.input}
          />
          </View>
          <View style={styles.modalButtons}>
            <MyButton text="ביטול" onSelect={() => {setShowModal(!showModal)}} changeWidth="50%"/>
            <MyButton text="אישור" onSelect={() => {
              //const newSynagogue = new Synagogue(synagogueName,synagogueAddress, synagogueSeats, shacharit, mincha, arvit, dafYomi)
              //console.log(newSynagogue)
              Alert.alert("פרטי בית הכנסת נשמרו", "יש לאשר את פרטי המשתמש", [{text: "הבנתי"}])
              setShowModal(!showModal)}} 
              changeWidth="50%" />
          </View>
          </View>
          </TouchableWithoutFeedback>
          
        </Modal> */}