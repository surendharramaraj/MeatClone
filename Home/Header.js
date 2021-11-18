import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import Context from "../GlobalContext/ContextProvider";
const Header = (props) => {
  const navigation = useNavigation();
  const {locality} = React.useContext(Context);
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
        onPress={() => navigation.navigate("Address")}
      >
        <Text
          style={{
            marginTop: 8,
            marginLeft: 10,
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          {locality.toUpperCase()}
        </Text>
        <Entypo
          name="chevron-down"
          size={24}
          color="black"
          style={{ marginTop: 3 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginRight: 18 }}
        onPress={() =>alert('hai')}
      >
        <FontAwesome name="user-circle" size={33} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
