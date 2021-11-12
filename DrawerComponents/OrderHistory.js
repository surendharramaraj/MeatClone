import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, ScrollView, Dimensions } from "react-native";
import { ListItem } from "react-native-elements";
import { SimpleLineIcons } from "@expo/vector-icons";

const shopItem = [
  {
    name: "Hari Chicken Stall",
    product: [
      {
        title: "Broiler Chicken",
        description: "Fresh Broiler Chicken For Your Cooking",
        price: "Rs.210",
        image: "https://freepngimg.com/thumb/categories/939.png",
      },
      {
        title: "Country Chicken",
        description: "Fresh Country Chicken For Your Cooking",
        price: "Rs.250",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZnsVbzebMRMB0d3bnQBu4Z3UXcdZSrlFnng&usqp=CAU",
      },
      {
        title: "Country Chicken",
        description: "Fresh Country Chicken For Your Cooking",
        price: "Rs.250",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZnsVbzebMRMB0d3bnQBu4Z3UXcdZSrlFnng&usqp=CAU",
      },
      {
        title: "Mutton",
        description: "Fresh Mutton For Your Cooking",
        price: "Rs.500",
        image:
          "https://proteins.live/assets/images/products/Mutton_Curry_Cut_-_Small_Pieces4.jpg",
      },
      {
        title: "Beef",
        description: "Fresh Beef For Your Cooking",
        price: "Rs.400",
        image:
          "https://proteins.live/assets/images/products/Mutton_Curry_Cut_-_Small_Pieces4.jpg",
      },
    ],
  },
  {
    name: "Mugesh Chicken Stall",
    product: [
      {
        title: "Broiler Chicken",
        description: "Fresh Broiler Chicken For Your Cooking",
        price: "Rs.210",
        image: "https://freepngimg.com/thumb/categories/939.png",
      },
    ],
  },
];

export default function OrderHistory() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    var customerID = "1";
    axios
      .get(
        `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-yeijr/service/PushNotification/incoming_webhook/orderHistory?customerID=${customerID}`
      )
      .then((res) => setOrderHistory(res.data));
  }, []);

  const handlePress = (id) => {
    // console.log(id);
    orderHistory.map((item) => {
      if (item.orderID === id) {
        setOpen(id);
        setIsExpanded(!isExpanded);
      }
    });
    // console.log(orderHistory);
  };

  return (
    <View
      style={{ marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight }}
    >
      <ScrollView>
        {orderHistory.map((item, index) => (
          <ListItem.Accordion
            key={index}
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title>{item.shopName}</ListItem.Title>
                  <ListItem.Subtitle>{item.shopAddress}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Subtitle>OrderID: {item.orderID}</ListItem.Subtitle>
              </>
            }
            isExpanded={open === item.orderID ? isExpanded : false}
            onPress={() => handlePress(item.orderID)}
          >
            <View style={{ backgroundColor: "#D3D3D3" }}>
              <View style={{ margin: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <SimpleLineIcons
                    name="location-pin"
                    size={20}
                    color="black"
                  />
                  <View style={{ marginLeft: 40 }}>
                    <Text>{item.shopName.toUpperCase()}</Text>
                    <Text style={{ fontSize: 12, opacity: 0.5 }}>
                      {item.shopAddress}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderWidth: 0.7,
                    borderRadius: 1,
                    height: 40,
                    width: 1,
                    backgroundColor: "black",
                    marginBottom: 10,
                    marginLeft: 10,
                    borderStyle: "dashed",
                  }}
                />
                <View style={{ flexDirection: "row" }}>
                  <SimpleLineIcons name="home" size={20} color="black" />
                  <View style={{ marginLeft: 40 }}>
                    <Text>HOME</Text>
                    <Text style={{ fontSize: 12, opacity: 0.5 }}>
                      {item.deliveryLocation}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderWidth: 0.3,
                    opacity: 0.4,
                    borderRadius: 1,
                    borderStyle: "dashed",
                    margin: 20,
                  }}
                />
                <Text style={{ fontSize: 13, opacity: 0.5, marginLeft: 20 }}>
                  Order Delivered on{" "}
                  {item.datetime.toString().slice(0, 10) +
                    " Time: " +
                    item.datetime.toString().slice(11, 16)}
                </Text>
              </View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 14,
                  color: "#000",
                  fontWeight: "700",
                  opacity: 0.6,
                }}
              >
                Bill Details:
              </Text>
              {item.itemDetails.map((item, index) => (
                <View key={index}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 10,
                    }}
                  >
                    <Text style={{ fontSize: 13, color: "grey" }}>
                      {item.ItemName} x {item.Quantity}
                    </Text>
                    <Text style={{ fontWeight: "700" }}>
                      ₹{Object.values(item.Price)}
                    </Text>
                  </View>
                </View>
              ))}
              <View
                style={{
                  borderWidth: 0.3,
                  opacity: 0.4,
                  borderRadius: 1,
                  borderStyle: "dashed",
                  margin: 10,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: 10,
                  marginRight: 10,
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 13, color: "grey" }}>
                  Paid Via Cash{" "}
                </Text>
                <Text style={{ fontWeight: "700" }}>
                  Bill Total: ₹{item.totalPrice}
                </Text>
              </View>
            </View>
          </ListItem.Accordion>
        ))}
      </ScrollView>
    </View>
  );
}
