import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import zmaneiHayom from "../../models/others/zmaneiHayom";
import ReduxThunk from "redux-thunk";
import Loading from "../../components/Loading";
import axios from "axios";
import Icon from "react-native-vector-icons";
import Colors from "../../constants/colors";
const Item = ({ title, value }) => (
  <View style={styles.item}>
    <Text style={styles.text}>{value}</Text>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const Halacha = (props) => {
  const [data, setData] = useState([]);
  //const [selectedValue, setSelectedValue] = useState("בחר עיר");
  const [isLoading, setIsLoading] = useState(true);
  const [isPicked, setIsPicked] = useState(false);
  const [cityChoice, setCityChoice] = useState("בחר עיר");
  const [displayChoice, setDisplayChoice] = useState("בחר עיר");
  const [locationID, setLocationID] = useState("295277");
  const [request, setRequest] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const cities = [
    "אילת",
    "אשדוד",
    "אשקלון",
    "באר שבע",
    "בת ים",
    "בית שמש",
    "בני ברק",
    "הרצליה",
    "חדרה",
    "חולון",
    "חיפה",
    "טבריה",
    "ירושלים",
    "כפר סבא",
    "לוד",
    "מודיעין",
    "נוף הגליל",
    "נתניה",
    "פתח תקוה",
    "ראשון לציון",
    "רמלה",
    "רמת גן",
    "רעננה",
    "תל אביב",
  ];
  useEffect(() => {
    const getAPITimes = async () => {
      var today = new Date();
      var day = today.getDate();
      day = day < 10 ? "0" + day : day;
      var month = today.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      var date = today.getFullYear() + "-" + month + "-" + day;

      let url =
        "https://www.hebcal.com/zmanim?cfg=json&geonameid=" +
        locationID +
        "&lg=h&date=" +
        date;
      const response = await axios.get(url).then((response) => {
        const res = new zmaneiHayom(response.data);
        setData(res.timesArray);
        setIsLoading(false);
      });
    };
    getAPITimes(0, 0);
  }, [request === true]);
  /*getAPITimes(0,0).then((result) => {
        setData(result.timesArray);
        setIsLoading(false);
    });*/

  const renderItem = ({ item }) => (
    <Item style={styles.item} title={item.name} value={item.value} />
  );

  const handlePicker = () => {
    if (isPicked) {
      setIsLoading(true);
      setDisplayChoice(cityChoice)
    }
    else {
      setDisplayChoice("בחר")
      
    }
    setIsPicked(!isPicked);
    if (cityChoice !== "בחר עיר" && isPicked)
        setIsSelected(true)
    isPicked === false ? setRequest(false) : setRequest(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <Loading />
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          {isPicked && (
            <Picker
              onValueChange={(value, index) => {
                setLocationID(value);
                setCityChoice(cities[index]);
              }}
              selectedValue={locationID}
              iosHeader="Select Brand"
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="אילת" value="295277" />
              <Picker.Item label="אשדוד" value="295629" />
              <Picker.Item label="אשקלון" value="295620" />
              <Picker.Item label="באר שבע" value="295530" />
              <Picker.Item label="בת ים" value="295548" />
              <Picker.Item label="בית שמש" value="295432" />
              <Picker.Item label="בני ברק" value="295514" />
              <Picker.Item label="הרצליה" value="294778" />
              <Picker.Item label="חדרה" value="294946" />
              <Picker.Item label="חולון" value="294751" />
              <Picker.Item label="חיפה" value="294801" />
              <Picker.Item label="טבריה" value="293322" />
              <Picker.Item label="ירושלים" value="281184" />
              <Picker.Item label="כפר סבא" value="294514" />
              <Picker.Item label="לוד" value="294421" />
              <Picker.Item label="מודיעין" value="282926" />
              <Picker.Item label="נוף הגליל" value="294098" />
              <Picker.Item label="נתניה" value="294071" />
              <Picker.Item label="פתח תקוה" value="293918" />
              <Picker.Item label="ראשון לציון" value="293703" />
              <Picker.Item label="רמלה" value="293768" />
              <Picker.Item label="רמת גן" value="293788" />
              <Picker.Item label="רעננה" value="293807" />
              <Picker.Item label="תל אביב" value="293397" />
            </Picker>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handlePicker}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>{displayChoice}</Text>
            </TouchableOpacity>
          </View>
          { isSelected && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          ) 
          }
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loading: {
    padding: 50,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 10,
    flexGrow: 1,
    height: "100%",
  },
  item: {
    backgroundColor: "#bdeeff",
    //backgroundColor: '#61dafb',
    padding: 2,
    marginVertical: 2,
    justifyContent: "space-between",
    flexDirection: "row",
    width: "77%",
    height: 38,
    alignItems: 'center',
    left:4,
    paddingHorizontal: 10
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  PickerContainer: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  buttonContainer: {
    marginBottom: 20,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.myBlue,
    width: "60%",
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
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#FFF",
  },
});

Halacha.navigationOptions = {
  headerTitle: "זמני היום בהלכה",
};

export default Halacha;
