import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { shopItem } from "./Shop";
import Category from "./Category";
import Shop from "./Shop";
import Header from "./Header";
export default function Home({ navigation, route }) {
  const [message, setMessage] = useState("Chicken");
  const [shopData, setShopData] = useState(shopItem);
  const [shopDetail, setShopDetail] = useState();
  const [locality, setLocality] = useState("");
  const setLocation = () => {
    setLocality(route.params.data.locality);
  };
  const getStall = () => {
    setShopData(
      shopItem.filter(
        (item) => item.category.includes(message) && item.is_closed === false
      )
    );
  };
  useEffect(async () => {
    await getStall();
    await setLocation();
  }, [message, locality]);
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
    </>
  );
}
