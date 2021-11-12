import React from "react";
import { View, Text, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native";

export default function CustomDrawer(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#155799", opacity: 1 }}
      >
        <View style={{ paddingLeft: 20, paddingBottom: 8, paddingTop: 30 }}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            }}
            style={{ width: 70, height: 70, borderRadius: 50 }}
          />
          <Text style={{ color: "#fff", fontSize: 18, margin: 8 }}>ZAGA</Text>
        </View>
        <View style={{ backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
        }}
      >
        <TouchableOpacity onPress={() => alert("LOGOUT")}>
          <Text style={{ fontSize: 15, margin: 8, opacity: 0.6 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
