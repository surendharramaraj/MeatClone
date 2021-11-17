import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Context from "../GlobalContext/ContextProvider";
import { Ionicons } from "@expo/vector-icons";

const Address = ({ navigation }) => {
  const { setLatLng, setLocality, user, setAddress, setCheckAddress } =
    React.useContext(Context);
  const handleLatLng = async (value) => {
    // console.log(value);
    var lat = parseFloat(value.latitude);
    var long = parseFloat(value.longitude);
    console.log("lat", lat);
    console.log("long", long);
    await setLatLng({
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.03,
      longitudeDelta: 0.03,
    });
    await setLocality(value.City);
    await setAddress(
      value.HouseNumber +
        " " +
        value.Area +
        " " +
        value.City +
        " " +
        value.Landmark
    );
    await setCheckAddress(true);
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        alignItems: "flex-start",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Map")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 15,
          marginTop: 15,
        }}
      >
        <MaterialIcons name="gps-fixed" size={30} color="black" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 15 }}>
            Current Location
          </Text>
          <Text style={{ marginLeft: 15 }}>Using GPS</Text>
        </View>
      </TouchableOpacity>
      <View style={{ borderWidth: 1, width: "100%", marginVertical: 20 }} />
      <>
        <Text style={{ marginLeft: 15 }}>SAVED ADDRESSES</Text>
        {user[0].address.map((value, index) => (
          <TouchableOpacity key={index} onPress={() => handleLatLng(value)}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="md-location-outline"
                size={22}
                color="black"
                key={index}
                style={{ margin: 15 }}
              />
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "700" }}>
                  {value.SaveAs}
                </Text>
                <Text style={{ fontSize: 13, color: "grey", marginTop: 3 }}>
                  {value.HouseNumber}, {value.Area}, {value.City},
                </Text>
                <View
                  style={{
                    borderWidth: 0.2,
                    borderColor: "grey",
                    marginTop: 10,
                    opacity: 0.5,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </>
    </SafeAreaView>
  );
};

export default Address;
