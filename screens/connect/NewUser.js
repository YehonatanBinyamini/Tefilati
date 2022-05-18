import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";
import auth from "../../db/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Loading from "../../components/Loading";
import Colors from "../../constants/colors";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../db/firebase";
import { Picker } from "@react-native-picker/picker";
import Prayer from "../../models/users/Prayer";
import Gabay from "../../models/users/Gabay";
import User from "../../models/users/User";
import MyButton from "../../components/MyButton";
import Synagogue from "../../models/others/Synagogue";

const NewUser = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [synagogue, setSynagogue] = useState("בחר בית כנסת");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPicked, setIsPicked] = useState(false);
  const [choice, setChoice] = useState("");
  const [showModal, setShowModal] = useState(false);

  //synagogue variables:
  const [synagogueName, setSynagogueName] = useState("")
  const [synagogueAddress, setSynagogueAddress] = useState("")
  const [synagogueSeats, setSynagogueSeats] = useState(NaN)
  const [shacharit, setShacharit] = useState("")
  const [mincha, setMincha] = useState("")
  const [arvit, setArvit] = useState("")
  const [dafYomi, setDafYomi] = useState("")

  //Picker Items array:
  const [pickerItems, setPickerItems] = useState([<Picker.Item label="בחר בית כנסת" value="בחר בית כנסת" />,
                                                  <Picker.Item label="צור בית כנסת חדש" value="בית כנסת חדש" /> 
                                        ])

  useEffect(() => {
      const col = collection(db, "Synagogues");
        const getSynagoguesNamesFromFirestore = async () => {
            const data = await getDocs(col)
            .then((querySnapshot) => {querySnapshot.forEach((synagogue) => {
                // doc.data() is never undefined for query doc snapshots
              pickerItems.push(<Picker.Item label={"בית כנסת "+synagogue.id} value={synagogue.id} />)  
            });
        })
    }
    getSynagoguesNamesFromFirestore()
    .catch((err) => {
        console.log(err.message)
    })
    
  },[])
  
  const getSynagogueFromFirestore = async (user) => {
    const docRef = doc(db, "Synagogues", user.synagogue);
            await getDoc(docRef)
            .then((doc)=> {
              if (doc.exists()){
                const info = doc.data()
                const synagogue = new Synagogue(doc.id, info.address, info.seats, info.shacharit, info.mincha, info.arvit, info.dafYomi, info.uidGabay)
                console.log(synagogue)
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

  const validation = () => {
    // the '*' its because of the slice off errorMessage

    
    if (firstName.length == 0) {
      setErrorMessage("*****שם פרטי הוא שדה חובה");
      return false;
    }
    if (lastName.length == 0) {
      setErrorMessage("*****שם משפחה הוא שדה חובה");
      return false;
    }
    if (phone.length != 10 || phone[0] != "0" || phone[1] != "5") {
      setErrorMessage("*****מספר טלפון לא חוקי");
      return false;
    }
    if (synagogue === "בחר בית כנסת") {
      setErrorMessage("*****לא נבחר בית כנסת");
      return false;
    }
    return true;
  };

 

  const handleSignUp = () => {
    if (validation()) {
      
        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const uid = userCredential.user.uid;
          
          if (synagogue === "בית כנסת חדש") {
            const ref = doc(db, "requests", userCredential.user.uid);
            const a = setDoc(ref, {
              firstName: firstName,
              lastName: lastName,
              uid: uid,
              phone: phone,
              email: email,
              password: password,
              synagogueName: synagogueName,
              synagogueAddress: synagogueAddress,
              synagogueSeats: synagogueSeats,
              shacharit: shacharit,
              mincha: mincha,
              arvit: arvit,
              dafYomi: dafYomi 
            });
            props.navigation.replace("WaitingScreen")
          } else {
            const ref = doc(db, "users", userCredential.user.uid);
            const a = setDoc(ref, {
              firstName: firstName,
              lastName: lastName,
              uid: uid,
              phone: phone,
              email: email,
              password: password,
              synagogue: synagogue,
            });
            const user =  new Prayer(firstName, lastName, uid, phone, email, password, synagogue)
            getSynagogueFromFirestore(user)
          }

        })
        .catch((error) => {
          console.log(error.code);
          setIsLoading(false);
          const errorCode = error.code;
          if (typeof (errorMessage !== "Object"))
          setErrorMessage(error.code.replaceAll("-", " "));
        });
        /*
        updateProfile(auth.currentUser, {
          displayName: firstName + " " + lastName
        }).then(() => {
          //setUser(auth.currentUser);
          
          // Profile updated!
          // ...
        }).catch((error) => {
          console.log(error.message)
        });
        */
    }
  };

  const handlePicker = () => {
    Keyboard.dismiss();
    setIsPicked(!isPicked);
    setChoice(synagogue);
    if (synagogue === "בית כנסת חדש" && isPicked ){
      setShowModal(!showModal)
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">

      <Modal
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
          
        </Modal>
      {isLoading ? (
        <View style={styles.loading}>
          <Loading />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="שם פרטי"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setErrorMessage("");
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="שם משפחה"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setErrorMessage("");
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="טלפון נייד"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setErrorMessage("");
            }}
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="דואר אלקטרוני"
            value={email}
            onChangeText={(text) => {
              setEmail(text.replace(" ", ""));
              setErrorMessage("");
            }}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="סיסמה"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessage("");
            }}
            style={styles.input}
            secureTextEntry
          />
          {errorMessage.length > 0 && (
            <Text style={styles.error} type="error">
              {errorMessage.slice(5)}
            </Text>
          )}
          <View style={{ alignItems: "center" }}>
            {isPicked && (
              <Picker
                onValueChange={(label) => {
                  setSynagogue(label);
                }}
                selectedValue={synagogue}
                iosHeader="Select Brand"
                mode="dropdown" // Android only
                style={styles.picker}
              >
                {pickerItems}
              </Picker>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handlePicker}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.buttonOutlineText}>{synagogue}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <MyButton
        onSelect={handleSignUp}
        text="אישור"
      />
      
    </KeyboardAvoidingView>
  );
};

NewUser.navigationOptions = {
  headerTitle: "הרשמה",
  headerBackTitle: "התחברות"
};

const styles = StyleSheet.create({
  loading: {
    marginTop: 0,
    padding: 0,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  padding: 40,
}
});

export default NewUser;
