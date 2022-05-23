import React, {useState, useEffect} from "react";
import { StyleSheet, FlatList, TouchableOpacity, Text, View, StatusBar, TextInput, Linking } from "react-native";
import { Button } from "react-native-elements";
import CategoryGridTile from "../../components/CategoryGridTile";
import { doc, setDoc, collection, getDoc, getDocs, updateDoc } from "firebase/firestore"; 
import { db } from "../../db/firebase"
import Category from "../../models/others/category";
import Loading from "../../components/Loading";
import Colors from "../../constants/colors";
import MyButton from "../../components/MyButton";
import { Alert } from "react-native";


const PaySeat = (props) => {
    
    const [SEATS, setSEATS] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [seatNumber, setSeatNumber] = useState("");
    const [price, setPrice] = useState("");
    const [thereIsSeat, setThereIsSeat] = useState(false)
    const [ownSeat, setOwnSeat] = useState([])
    const [displaySeats, setDisplaySeats] = useState("")
    const user = props.navigation.getParam("user");
    const synagogue = props.navigation.getParam("synagogue");
    //console.log(synagogue.seats)
    let firstSeat;

    useEffect(() => {
        for (let i=0; i<synagogue.seats.length; i++) {
            if (synagogue.seats[i] == user.uid){
                ownSeat.push(i+1)
                console.log(ownSeat)
            }    
        }
        if (ownSeat.length == 1 ) {
            setDisplaySeats(`מושב ${ownSeat}`)
            setThereIsSeat(true)
        } 
        else if (ownSeat.length > 1) {
            setDisplaySeats(`מושבים ${ownSeat}`)
            setThereIsSeat(true)       
        }   
        const docRef = doc(db, "Synagogues", user.synagogue);
        const asy =  async () => {
            const doc = await getDoc(docRef)
            .then((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //setNoData(false)
                //console.log(doc.data())
                    setSEATS(doc.data().seatsArray)
                setIsLoading(false)
        })
    }
    asy()
    .catch((err) => {
        console.log(err.message)
    })
    }   ,[]);

  return (
      <View style={styles.container}>
    { isLoading ? <View style={styles.loading}><Loading/></View> : 
        <View style={styles.container}>
            <Text style={styles.title}>יש לברר עם הגבאי את מספר המושב הרצוי</Text>
            <Text style={styles.subTitle}>איזה מושב תרצה לקנות?</Text>
                <View style={{maxWidth: "37%"}}>
                    <TextInput
                    placeholder="הקש מספר מושב"
                    value={seatNumber}
                    onChangeText={(text) => {
                    setSeatNumber(text);
                    setErrorMessage("");
                    }}
                    style={styles.input}
                    keyboardType="numeric"
                    />
                </View>
                <View style={{maxWidth: "37%"}}>
                    <TextInput
                    placeholder="הקש מחיר מושב"
                    value={price}
                    onChangeText={(text) => {
                    setPrice(text);
                    setErrorMessage("");
                    }}
                    style={styles.input}
                    keyboardType="numeric"
                    />
                </View>
                    <View style={{width: "70%"}}>
                        <MyButton text="קנה" onSelect={() => {
                            if (seatNumber.length == 0){
                                Alert.alert("נא הקש מספר מושב", null, [ {text: "בסדר"}]);
                            } else if (price.length == 0) {
                                Alert.alert("נא הקש את מחיר המושב", null, [ {text: "בסדר"}]);
                            } else if (seatNumber > synagogue.seats.length) {
                                Alert.alert("מספר המושב לא תקין", "בחר מושב אחר", [ {text: "בסדר"}]);
                            } else if (synagogue.seats[seatNumber-1] != "פנוי") {
                                Alert.alert("המושב תפוס", "בחר מושב אחר", [ {text: "בסדר"}]);                               
                            } else {
                                Alert.alert(`האם ברצונך לקנות את מושב מספר ${seatNumber}?`, "עבור אל אפליקציית ביט", [ {text: "לא"}, {text: "כן", onPress: () => {
                                    Linking.openURL("https://www.bitpay.co.il/app/");
                                    synagogue.seats[seatNumber-1] = user.uid;
                                    const theDoc = doc(db, "Synagogues", synagogue.name);
                                    updateDoc(theDoc, {
                                        seatsArray: synagogue.seats,
                                    });
                                    const ref = doc(db, "Synagogues", synagogue.name, "Payments", `קניית מושב ${seatNumber}`);
                                    const date = new Date(Date.now()).toLocaleDateString();
                                    const a = setDoc(ref, {
                                    fullName: user.firstName + " " + user.lastName,
                                    price: price,
                                    type: "תשלום",
                                    date: date,
                                    subject: `קניית מושב ${seatNumber}`,
                                    });
                                } }])
                            }
                        }} />
                    </View>
                    { thereIsSeat && ( <View ><Text style={styles.subTitle}> {displaySeats} בבעלותך</Text></View>)}
          </View>
    }</View>
  );
};

PaySeat.navigationOptions = {
  headerTitle: "קניית מושב",
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
        marginTop: StatusBar.currentHeight || 10,
        flexGrow: 1,
        height: "100%",
        alignItems: "center",
        //justifyContent: "space-around",
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

export default PaySeat;
