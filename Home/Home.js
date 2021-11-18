import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  TouchableOpacity,
} from "react-native";
import { shopItem } from "./Shop";
import Category from "./Category";
import Shop from "./Shop";
import Header from "./Header";
import Context from "../GlobalContext/ContextProvider";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Text } from "react-native";
import EmptyCart from "./EmptyCart";
export default function Home({ navigation, route }) {
  const [message, setMessage] = useState("Chicken");
  const [shopData, setShopData] = useState(shopItem);
  const { locality, latLng } = useContext(Context);
  var length_of_cart = useSelector((state) => state.selectedItems.items).length;
  const getShopFromApi = () => {
    const stall_url = `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-fkimm/service/StallDetailsAPI/incoming_webhook/STALLDETAILAPI?secret=ZAGAGETSTALLAPI&long=${latLng.longitude}&lat=${latLng.latitude}`;
    return fetch(stall_url)
      .then((response) => response.json())
      .then((responseJson) => {
        setShopData(responseJson);
      });
  };

  useEffect(async () => {
    await getShopFromApi();
  }, [latLng]);
  return (
    <>
      <SafeAreaView
        style={{
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        }}
      >
        <Header navigation={navigation} locality={locality} />
        <Category message={message} setMessage={setMessage} />
      </SafeAreaView>
      <Shop message={message} shopData={shopData} navigation={navigation} />
      <View style={{ width: "100%", height: 70, backgroundColor: "#155798" ,paddingVertical:10}}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginHorizontal: 20,
          }}
        >
          <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("Home")}>
            <Ionicons name="home-outline" size={24} color="white" />
            <Text style={{ fontSize: 16, color: "white" }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }} onPress={() => length_of_cart > 0 ? navigation.navigate("SummaryClone") : navigation.navigate("EmptyCart")}>
            <AntDesign name="shoppingcart" size={24} color="white" />
            <Text style={{ fontSize: 16, color: "white" }}>My Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("TrackOrder")}>
            <FontAwesome name="opencart" size={24} color="white" />
            <Text style={{ fontSize: 16, color: "white" }}>Track</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
