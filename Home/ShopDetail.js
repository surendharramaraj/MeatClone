import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import ShopItem from "./ShopItem";
export default function ShopDetail({ route, navigation }) {
  return (
    <>
      <SafeAreaView
        style={{
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        }}
      >
        <Image
          source={{ uri: route.params.data.image_url }}
          style={{ width: "100%", height: 250 }}
        />
        <View style={{ marginTop: 8 }}>
          <Text style={{ fontSize: 22, fontWeight: "600", marginLeft: 5 }}>
            {route.params.data.name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              marginLeft: 5,
              marginTop: 3,
            }}
          >
            {route.params.data.location.display_address[0]},
            {route.params.data.location.display_address[1]}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              marginLeft: 5,
              marginTop: 3,
            }}
          >
            PhoneNo: {route.params.data.phone}
          </Text>
        </View>
        <View style={{ borderWidth: 0.4, marginTop: 8 }} />
      </SafeAreaView>
      <ShopItem
        product={route.params.data.product}
        shopId={route.params.data.shopId}
        shopName={route.params.data.name}
        shopImage={route.params.data.image_url}
        address={route.params.data.location.display_address[1]}
        navigation={navigation}
      />
    </>
  );
}
