import React, {useState, useEffect} from "react";
import { StyleSheet, FlatList, TouchableOpacity, Text, View, StatusBar, TextInput, Linking } from "react-native";
import { doc, setDoc, collection, getDoc, getDocs, updateDoc } from "firebase/firestore"; 
import { db } from "../../db/firebase"
import Colors from "../../constants/colors";
import MyButton from "../../components/MyButton";
import { Alert } from "react-native";


const Donation = (props) => {
    
    const [donation, setDonation] = useState("");
    const [hakdasha, setHakdasha] = useState("");
    const [isDonate, setIsDonate] = useState(false)
    
    const user = props.navigation.getParam("user");
    const synagogue = props.navigation.getParam("synagogue");
    //console.log(synagogue.seats)
    

  return (
      <View style={styles.container}>
        <View style={styles.container}>
            <Text style={styles.title}>מלא את הפרטים לתיעוד התרומה</Text>
                <View style={{width: "80%"}}>
                    <TextInput
                    placeholder="סכום לתרומה"
                    value={donation}
                    onChangeText={(text) => {
                    setDonation(text);
                    }}
                    style={styles.input}
                    keyboardType="numeric"
                    />
                </View>
                <View style={{width: "80%"}}>
                    <TextInput
                    placeholder="הקדשה"
                    value={hakdasha}
                    onChangeText={(text) => {
                    setHakdasha(text);
                    }}
                    style={styles.input}
                    keyboardType="default"
                    />
                </View>
                    <View style={{width: "70%"}}>
                        <MyButton text="תרום" onSelect={() => {
                            if (donation.length == 0){
                                Alert.alert("נא הקש את סך התרומה", null, [ {text: "בסדר"}]);
                            } else if (donation < 0) {
                                Alert.alert("סכום לא תקין", "הקש סכום אחר", [ {text: "בסדר"}]);
                            } else {
                                Alert.alert(`האם ברצונך לתרום ${donation} ש"ח?`, "עבור אל אפליקציית ביט", [ {text: "לא"}, {text: "כן", onPress: () => {
                                    setIsDonate(true)
                                    Linking.openURL("https://www.bitpay.co.il/app/");
                                    const date = new Date(Date.now()).toLocaleDateString();
                                    const ref = doc(db, "Synagogues", synagogue.name, "Payments", `תרומת ${donation} ש"ח בתאריך ${date}`);
                                    const a = setDoc(ref, {
                                    fullName: user.firstName + " " + user.lastName,
                                    price: donation,
                                    type: "תרומה",
                                    date: date,
                                    subject: `תרומת ${donation} ש"ח`,
                                    hakdasha: hakdasha,
                                    });
                                } }])
                            }
                        }} />
                    </View>
                    { isDonate && ( <View ><Text style={styles.title}>חזק וברוך!</Text></View>)}
          </View>
    </View>
  );
};

Donation.navigationOptions = {
  headerTitle: "תרומה לבית הכנסת",
  headerBackTitle: "הקודם"
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 34,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.myBlue,
        padding: 20,
        marginBottom: 50,
    },
    loading: {
        padding: 50,
      },
      container: {
        flex: 1,
       // marginTop: StatusBar.currentHeight || 10,
       // flexGrow: 1,
       // height: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
      },
      container2: {
        width: '100%',
        //justifyContent: 'center',
        alignItems: 'center',
      },
      subTitle: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        textAlign: "right",
        backgroundColor: "white",
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
});

export default Donation;
