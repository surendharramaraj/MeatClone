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
        }}
      >
        <MaterialIcons name="gps-fixed" size={32} color="black" />
        <Text style={{ fontSize: 15, fontWeight: "400", marginLeft: 5 }}>
          use GPS location
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Address;
