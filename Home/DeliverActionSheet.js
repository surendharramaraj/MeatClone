import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Platform,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import Context from "../GlobalContext/ContextProvider";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
export default function DeliverActionSheet() {
  const navigation = useNavigation();
  const { locality, latLng, setAddress, user, setCheckAddress } =
    React.useContext(Context);
  const [houseNumber, setHouseNumber] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [save, setSave] = React.useState("");
  const handleAddress = async () => {
    var location_to_database = await {
      HouseNumber: houseNumber,
      Area: street,
      Landmark: landmark,
      City: locality,
      SaveAs: save,
      latitude: latLng.latitude.toFixed(4),
      longitude: latLng.longitude.toFixed(4),
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    };
    await user[0].address.push(location_to_database);
    // console.log(user[0].address, 'locationtodatabase');
    // var article = {address: user[0].address.push(location_to_database)}
    // console.log(article, "article data");
    await axios
      .post(
        "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-fkimm/service/StallDetailsAPI/incoming_webhook/ADDRESS",
        { address: user[0].address }
      )
      .then((res) => console.log(res));
    await setCheckAddress(true);
    await setAddress(houseNumber + " " + street + " " + locality);
    await navigation.goBack();
  };
  // console.log(latLng, 'Deliversheet');
  // console.log(user[0].address)
  return (
    <SafeAreaView
      style={{ marginTop: Platform.os === "ios" ? 0 : StatusBar.currentHeight }}
    >
      <View style={{ flexDirection: "row" }}>
        <EvilIcons name="location" size={24} color="orange" />
        <Text style={{ fontSize: 18, fontWeight: "600" }}>Puthukiramam</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}>
        <Text style={{ fontSize: 14, fontWeight: "300" }}>
          {/* {locationDetails.origin_addresses[0].split(',')[1]} */}
          {locality}
        </Text>
      </View>
      <>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setHouseNumber(text)}
          value={houseNumber}
          placeholder={"HOUSE / FLAT / FLOOR NO."}
          maxLength={20}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setStreet(text)}
          value={street}
          placeholder={"APARTMENT / ROAD / AREA (OPTIONAL)"}
        />
        <TextInput
          style={{
            ...styles.textInput,
            height: 80,
            borderWidth: 1,
            borderColor: "#ccc",
          }}
          onChangeText={(text) => setLandmark(text)}
          value={landmark}
          placeholder={"DIRECTIONS TO REACH YOUR LOCATION (OPTIONAL)"}
          multiline={true}
          maxLength={100}
        />
        <View
          style={{
            borderStyle: "solid",
            borderBottomWidth: 0.5,
            width: Dimensions.get("window").width - 50,
            marginHorizontal: 20,
            marginTop: 10,
          }}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setSave(text)}
          value={save}
          placeholder={"SAVE AS"}
        />
      </>
      <View style={{ flex: 1, alignItems: "center", marginTop: 30 }}>
        <TouchableOpacity
          style={{
            width: "90%",
            height: 40,
            backgroundColor: "#0ff0a7",
            borderRadius: 10,
          }}
          onPress={() => handleAddress()}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              paddingTop: 10,
            }}
          >
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 0.5,
    height: 40,
    width: Dimensions.get("window").width - 50,
    padding: 10,
    marginHorizontal: 20,
    marginTop: 30,
  },
});
