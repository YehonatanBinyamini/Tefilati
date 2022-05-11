import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, LogBox } from "react-native";
import { Input, Button } from "react-native-elements";
import MyInput from "../../components/MyInput";
import  auth  from "../../db/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Colors from "../../constants/colors";
import Loading from "../../components/Loading";
import { doc, setDoc, collection, getDoc, getDocs } from "firebase/firestore"; 
import { db } from "../../db/firebase"
import Prayer from "../../models/users/Prayer";
import Gabay from "../../models/users/Gabay";
import Synagogue from "../../models/others/Synagogue";
//import Icon from 'react-native-vector-icons/FontAwesome';

const getSynagogueFromFirestore = async (props, user) => {
  const docRef = doc(db, "Synagogues", user.synagogue);
          await getDoc(docRef)
          .then((doc)=> {
            if (doc.exists()){
              const info = doc.data()
              console.log(info)
              const synagogue = new Synagogue(doc.id, info.address, info.seatsArray, info.shacharit, info.mincha, info.arvit, info.dafYomi, info.uidGabay)
              props.navigation.replace("HomeScreen", {user: user, synagogue: synagogue});  
            }
            else{
              console.log("there is no synagogue for this user")
            }
          })
          .catch((err) => {
            console.log("doc err", err)
          })

}

const getFirestoreUser = (props, uid) => {
  const docRef = doc(db, "users", uid);
          getDoc(docRef)
          .then((doc)=> {
            if (doc.exists()){
              const info = doc.data()
              if (info.isGabay){
                const user = new Gabay(info.firstName, info.lastName, info.uid, info.phone, info.email, info.password, info.synagogue)
                user.setIsGabay(true)
                getSynagogueFromFirestore(props, user)
              }
              else {
                const user = new Prayer(info.firstName, info.lastName, info.uid, info.phone, info.email, info.password, info.synagogue)
                getSynagogueFromFirestore(props, user)
              }
            }
            else{
              CheckIfWaiting(props, uid)
            }
          })
          .catch((err) => {
            console.log("doc err", err)
          })
}

const CheckIfWaiting = (props, uid) => {
  const docRef = doc(db, "requests", uid);
          getDoc(docRef)
          .then((doc)=> {
            if (doc.exists()){
              props.navigation.replace("WaitingScreen");
            }
            else{
              //error page
              console.log("in Login >> the doc doesn't exist at users or requests")
            }
          })
          .catch((err) => {
            console.log("doc err", err)
          })
}

const Login = (props) => {
    LogBox.ignoreAllLogs();
    //const auth = getAuth();
    //console.log('auth is:', auth);
    
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    let user
    /*useEffect(() => {
      
    },[])*/

    const handleLogin = () => {
      setIsLoading(true)



      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          user = userCredential.user;
          if (user.uid === "pA2BhYysL2hOemPYT1sp0uwKd8C2"){
            props.navigation.replace("AdminScreen")
          } else {
            getFirestoreUser(props, user.uid)          
          }
        })
        .catch((error) => {
          setIsLoading(false)
          const errorCode = error.code;
          console.log(errorCode)
          setErrorMessage(error.code.replaceAll("-", " "));
        });
        
    };

    return (

      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      backgroundColor="#eaf0f4"
      >
      { isLoading ? <View style={styles.loading}><Loading/></View> : 
      <View style={styles.container2}>  
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="דואר אלקטרוני"
            value={email}
            onChangeText={text => {setEmail(text.replace(' ','')); setErrorMessage('')}}
            style={styles.input}
            keyboardType='email-address'
          />
          <TextInput
            placeholder="סיסמה"
            value={password}
            onChangeText={text => {setPassword(text); setErrorMessage('')}}
            style={styles.input}
            secureTextEntry
          />
          {errorMessage.length > 0 && <Text style={styles.error}>{errorMessage.slice(5)}</Text>}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
            >
            <Text style={styles.buttonText}>התחבר</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {props.navigation.navigate("NewUserScreen")}}
            style={[styles.button, styles.buttonOutline]}
            >
            <Text style={styles.buttonOutlineText}>הרשמה</Text>
          </TouchableOpacity>
        </View>
      </View>
      }
      </KeyboardAvoidingView>
   )
}

Login.navigationOptions = {
  headerTitle: 'ברוכים הבאים',
};

const styles = StyleSheet.create({
  loading: {
    marginTop: 0,
    padding: 0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  container2: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: Colors.myBlue,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 19,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 19,
  },
  error: {
    color: 'red',
    textAlign: "right",
  }
})

export default Login;
