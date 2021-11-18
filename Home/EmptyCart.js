import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
const EmptyCart = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <LottieView source={require("../assets/69904-cart.json")} loop autoPlay />
      <View style={{ marginTop: Dimensions.get("window").height / 2 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Your Cart is Empty
        </Text>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
            borderWidth: 1,
            padding: 10,
            backgroundColor: "#155798",
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{ color: "white", fontSize: 15 }}>
            Browse to Add Item
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmptyCart;
