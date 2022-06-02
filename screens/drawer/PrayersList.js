import React, { useEffect, useState } from "react";
import {Text, View, StyleSheet, Alert, FlatList, TextInput} from 'react-native';
import { doc, setDoc, query, where, collection, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import auth from "../../db/firebase";
import { db } from "../../db/firebase";
import Prayer from "../../models/users/Prayer";
import UserDetails from "../../components/UserDetails";
import MyButton from "../../components/MyButton";
import Loading from "../../components/Loading";

const deleteUserFromSynagogues = (user) => {
  const ref = doc(db, "users", user.uid);
      updateDoc(ref, {
        synagogue: "",
      });
}

const PrayersList = props => {
    
    const [USERS, setUSERS] =useState([]);
    const [addUser, setAddUser] = useState(false)
    const [textButtonAdd, setTextButtonAdd] = useState("הוסף משתמש קיים")
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const [wasCalled, setWasCalled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const user = props.navigation.getParam('user');
    const synagogue = props.navigation.getParam('synagogue');  
       

    useEffect(() => {

      

            const asy = async () => {
            const usersRef = collection(db, "users")
            const q = query(usersRef, where("synagogue", "==", user.synagogue ));

            const querySnapshot = await getDocs(q)
            .then((querySnapshot) => { querySnapshot.forEach((doc) => {
                const info = doc.data()
                  USERS.push(new Prayer(info.firstName, info.lastName, info.uid, info.phone, info.email, info.password, info.synagogue))
                  setUSERS([...USERS])                
              })
            })
          }
          asy()
          .catch((err) => {
            console.log(err.message)
          })
    },[])

    const updateUserSynagogue = (info, synagogueName) => {
      
      const newUser = new Prayer(info.firstName, info.lastName, info.uid, info.phone, info.email, info.password, info.synagogue)
      const result = USERS.filter(user => user.uid == newUser.uid);
      if (result.length != 0){
        Alert.alert(`המשתמש ${info.firstName+" "+info.lastName} כבר משוייך לבית הכנסת`, null, [{text: "סגור"}])
      } else {
        const ref = doc(db, "users", info.uid);
        updateDoc(ref, {
            synagogue: synagogueName,
        });
        USERS.push(newUser)
        setUSERS([...USERS])
        Alert.alert(`המשתמש ${info.firstName+" "+info.lastName} נוסף בהצלחה`, null, [{text: "סגור"}])
      }
    }
      
    const renderUserItem = (itemData) => {
      return (
        <UserDetails
          synagogueName = {itemData.item.synagogue} 
          fullName = {itemData.item.firstName + " " + itemData.item.lastName}
          phone =  {itemData.item.phoneNumber}
          email = {itemData.item.email}
          onSelect = {() => { if (user.isGabay || user.uid == itemData.item.uid){
            const userName = itemData.item.firstName + " " + itemData.item.lastName;
            if (user.isGabay){
              Alert.alert(userName, "בחר את האפשרות המתאימה", 
                [{text: "ביטול", style: "cancel"}, 
                 {text: "מנה לגבאי", onPress: ()=>{
                                    const ref = doc(db, "users", itemData.item.uid);
                                    updateDoc(ref, {
                                        isGabay: true,
                                    });
                                    Alert.alert(`המשתמש ${userName} מונה לגבאי`, null, [{text: "סגור"}])          
                 }} ,
                 {text: "הסר", style: "destructive", onPress: () => {
                                    Alert.alert(`האם להסיר את ${userName} ממאגר בית הכנסת?`, "הגישה לנתוני בית הכנסת תיחסם", [ {text: "לא"}, {text: "כן", onPress: () => {
                                    deleteUserFromSynagogues(itemData.item) 
                                    const index = USERS.indexOf(itemData.item);
                                    if (index > -1) {
                                        USERS.splice(index, 1); // 2nd parameter means remove one item only
                                    }
                                    setUSERS([...USERS])
                                    Alert.alert("המשתמש הוסר", null, [ {text: "סגור"}])
                                            }
                                        }])
                    }}, ]
                  )}
                  else {
                    Alert.alert(userName, "בחר את האפשרות המתאימה", 
                [{text: "ביטול", style: "cancel"}, 
                 {text: "הסר", style: "destructive", onPress: () => {
                                    Alert.alert(`האם להסיר את ${userName} ממאגר בית הכנסת?`, "הגישה לנתוני בית הכנסת תיחסם", [ {text: "לא"}, {text: "כן", onPress: () => {
                                    deleteUserFromSynagogues(itemData.item) 
                                    const index = USERS.indexOf(itemData.item);
                                    if (index > -1) {
                                        USERS.splice(index, 1); // 2nd parameter means remove one item only
                                    }
                                    setUSERS([...USERS])
                                    Alert.alert("המשתמש הוסר", null, [ {text: "סגור"}])
                                            }
                                        }])
                    }}, ]
                  )
                  }
                }  
        }}
        />
      );
    };
    
    return (

    <View style={styles.screen}>
         {addUser && (
           isLoading ? <View style={styles.loading}><Loading/></View> :
           <View  style={styles.inputContainer}>
            <Text style={styles.text}>הוסף משתמשים קיימים בלבד</Text>
            <TextInput
              placeholder="דואר אלקטרוני"
              value={email}
              onChangeText={text => {setEmail(text.replace(' ','')); setErrorMessage('') 
            }}
              style={styles.input}
              keyboardType='email-address'
            />
            {(errorMessage.length > 0) && <Text style={styles.error}>{errorMessage}</Text>}
            
          <View style={{flexDirection: "row"}}>
            <MyButton text="ביטול" onSelect={() => { setAddUser(false); setEmail("")}} changeWidth="50%"/>
            <MyButton text="אישור" onSelect={() => {
              console.log(wasCalled)
              let called = false;
            setIsLoading(true)  
            const usersRef = collection(db, "users")
            const q = query(usersRef, where("email", "==", email ));
            const querySnapshot = getDocs(q)
            .then((querySnapshot) => { querySnapshot.forEach((doc) => {
              const info = doc.data()
              called = true;
              //setWasCalled(true)
              updateUserSynagogue(info, user.synagogue)
              setAddUser(false)
              setIsLoading(false)
              setEmail("")              
            })
          })
          .catch((err) => {
            console.log(err.message)      
          })
          if (email.length == 0) {
            setAddUser(false)
            setIsLoading(false)
          } else {
          setTimeout(() => {
            if (!called){
              setErrorMessage("דואר אלקטרוני לא קיים")
              setIsLoading(false)
            }
            }, 2500);
          }
            }} 
                  changeWidth="50%" />
        </View>
          </View>
         )}
         { user.isGabay && (!addUser && <MyButton text={textButtonAdd} onSelect={()=>{
            setAddUser(true)
          }}/>)}
         <FlatList
            data={USERS}
            renderItem={renderUserItem}
            keyExtractor={item => item.uid}
            contentContainerStyle={{ paddingBottom: 60, padding: 20, alignItems: 'center' }}
            extraData={USERS}
            />
    </View>
    );
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
    },
    loading: {
        marginTop: 20,
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
        marginTop: 10,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: "bold",
      },
      inputContainer: {
        width: '80%'
      },
      input: {
        textAlign: "right",
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
      },
      error: {
        color: 'red',
        textAlign: "right",
      }
});

PrayersList.navigationOptions = {
    headerTitle: "רשימת מתפללים",
    headerBackTitle: "מסך הבית"
  };
  
export default PrayersList;