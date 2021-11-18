import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";
const TrackOrder = ({ navigation }) => {
  const cartItemLength = useSelector(
    (state) => state.selectedItems.items
  ).length;
  return (
    <View style={{ flex: 1 }}>
      <Text>Track Order</Text>

      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View
          style={{
            width: "100%",
            height: 70,
            backgroundColor: "#155798",
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => navigation.navigate("Home")}
            >
              <Ionicons name="home-outline" size={24} color="white" />
              <Text style={{ fontSize: 16, color: "white" }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() =>
                cartItemLength > 0
                  ? navigation.navigate("SummaryClone")
                  : navigation.navigate("EmptyCart")
              }
            >
              <AntDesign name="shoppingcart" size={24} color="white" />
              <Text style={{ fontSize: 16, color: "white" }}>My Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => navigation.navigate("TrackOrder")}
            >
              <FontAwesome name="opencart" size={24} color="white" />
              <Text style={{ fontSize: 16, color: "white" }}>Track</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TrackOrder;
