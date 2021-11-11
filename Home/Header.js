import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const Header = (props) => {
  console.log(props.location);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingVertical: 10,
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => props.navigation.navigate("Address")}
      >
        <Text
          style={{
            marginTop: 8,
            marginLeft: 10,
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          {props.locality.toUpperCase()}
        </Text>
        <Entypo
          name="chevron-down"
          size={24}
          color="black"
          style={{ marginTop: 3 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => alert("yeah profile clicked")}
      >
        <FontAwesome name="user-circle" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
