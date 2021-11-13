import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Address = ({ navigation }) => {
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
        <View style={{flex : 1}}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 15 }}>
            Current Location
          </Text>
          <Text style={{marginLeft: 15 }}>Using GPS</Text>
        </View>
      </TouchableOpacity>
      <View style={{borderWidth:1 , width:'100%',marginVertical:20}}/>
      <><Text style={{marginLeft:15}}>SAVED ADDRESSES</Text></>
    </SafeAreaView>
  );
};

export default Address;
