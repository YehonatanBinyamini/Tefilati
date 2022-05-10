import React, {useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Modal} from 'react-native'
import NoteComponent from "../components/Note";
import Note from "../models/others/Note";
import { doc, setDoc, collection, getDoc, getDocs } from "firebase/firestore"; 
import { db } from "../db/firebase";
import Gabay from "../models/users/Gabay"
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButtons from "../components/HeaderButton";
let newNote = null;

const addNewNote = () => {
    newNote = <Modal
                animationType= {"slide"}
                transparent= {false}
                visible={true}>
              </Modal>
    console.log("Noting")


      
}

const renderNoteItem = (itemData) => {
    return (
      <NoteComponent 
        title = {itemData.item.subject} 
        date = {itemData.item.date}
        gabay = {itemData.item.gabay}
        body =  {itemData.item.body}
      />
    
    );
  };

const NotesBoard = (props) => {
    
    const [NOTES, setNOTES] = useState ([])
    const [noData, setNoData] = useState (true)
    const [nn, setNn] = useState([])
    const user = props.navigation.getParam('user');
    
    //if (user instanceof Gabay)
    useEffect(() => {
        nn.push(newNote)
    }, [newNote])
    
    
    useEffect(() => {
        const col = collection(db, "synagogue", user.synagogue , "NotesBoard");
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
        {nn}        
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
         
        headerRight:() => navData.navigation.getParam('user').isGabay ? 
        (<HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
            <Item title="Plus" iconName="add" onPress={() => {
                addNewNote()
            }}/>
        </HeaderButtons>
        ) : null
        
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
    }
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