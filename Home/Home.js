import React, { useEffect, useState, useRef } from "react";
import { View, Text, SafeAreaView, Platform, StatusBar ,TouchableOpacity} from "react-native";
import { shopItem } from "./Shop";
import Category from "./Category";
import Shop from "./Shop";
export default function Home({ navigation }) {
  const [message, setMessage] = useState("Chicken");
  const [shopData, setShopData] = useState(shopItem);
  const [shopDetail, setShopDetail] = useState();
  const getStall = () => {
    setShopData(
      shopItem.filter(
        (item) => item.category.includes(message) && item.is_closed === false
      )
    );
  };
  useEffect(async () => {
    await getStall();
  }, [message]);
  return (
    <>
      <SafeAreaView
        style={{
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        }}
      >
        <Category message={message} setMessage={setMessage} />
      </SafeAreaView>
      <Shop message={message} shopData={shopData} navigation={navigation} />
    </>
  );
}
