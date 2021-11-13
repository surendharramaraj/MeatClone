import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, Platform, StatusBar } from "react-native";
import { shopItem } from "./Shop";
import Category from "./Category";
import Shop from "./Shop";
import Header from "./Header";
import Context from "../GlobalContext/ContextProvider";
export default function Home({ navigation, route }) {
  const [message, setMessage] = useState("Chicken");
  const [shopData, setShopData] = useState(shopItem);
  const { locality, latLng } = useContext(Context);
  // const [locality, setLocality] = useState("");
  // const setLocation = () => {
  //   setLocality(route.params.data.locality);
  // };
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
    // setLocation();
  }, []);

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
