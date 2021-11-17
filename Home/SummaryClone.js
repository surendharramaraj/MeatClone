import axios from "axios";
import React, { useEffect } from "react";
import {
  Actionsheet,
  NativeBaseProvider,
  Center,
  useDisclose,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Context from "../GlobalContext/ContextProvider";
import { useNavigation } from "@react-navigation/core";
export default function SummaryClone({ route, navigation }) {
  // const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [orderID, setOrderID] = React.useState({});
  const [nearBy, setNearBy] = React.useState();
  const items = useSelector((state) => state.selectedItems.items);
  const [buttonText, setButtonText] = React.useState("");
  const total = items
    .map((item) => Number(item.price.replace("Rs.", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const dict = {};
  const {
    address,
    locality,
    setAddress,
    checkAddress,
    setCheckAddress,
    user,
    setLocality,
  } = React.useContext(Context);
  console.log(address, "contextaddress");
  const handleOpen = (event) => {
    console.log(event);
    if (event === "ADD_ADDRESS") {
      navigation.navigate("DeliveryAddress");
    } else {
      onOpen();
      setButtonText(event);
    }
  };

  items.forEach((item) => {
    if (item.title in dict) {
      dict[item.title] = [
        dict[item.title][0] + 1,
        dict[item.title][1] + Number(item.price.replace("Rs.", "")),
      ];
    } else {
      dict[item.title] = [1, Number(item.price.replace("Rs.", ""))];
    }
  });
  const onMinus = (name) => {
    for (var i = 0; i < items.length; i++) {
      var name1 = items[i].title;
      if (name1 === name) {
        console.log("I AM Removed");
        removeItems(items[i]);
        break;
      }
    }
  };

  const onPlus = (name) => {
    console.log(name);
    for (var i = 0; i < items.length; i++) {
      var name1 = items[i].title;
      if (name1 === name) {
        console.log("I AM Added");
        selectItems(items[i]);
        break;
      }
    }
  };

  const dispatch = useDispatch();
  const removeItems = (item) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { item, shopId: route.params.shopId },
    });
  };
  const selectItems = (item) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: { item, shopId: route.params.shopId },
    });
  const Bill = [
    {
      name: "Sub-Total",
      price: total,
    },
    {
      name: "Delivery Charges",
      price: 20,
    },
    {
      name: "Tax-Invoice",
      price: 10,
    },
    {
      name: "Total",
      price: total + 20 + 10,
    },
  ];

  useEffect(() => {
    var arr_latLng = [];
    user.map((item) => {
      //   console.log(item.address);
      item.address.filter((it) =>
        it.longitude === "77.8513" && it.latitude === "9.1880"
          ? arr_latLng.push(it)
          : setNearBy("No Near By Location Available")
      );
    });
    setNearBy(arr_latLng);
    items.length > 0 ? null : navigation.goBack();
  }, [user, items]);

  const orderPlaced = async () => {
    var arr = [];
    Object.entries(dict).forEach(([key, value]) =>
      arr.push({
        ItemName: key,
        Quantity: value[0] + "Kg",
        Price: value[1],
      })
    );
    //Need to pass delivery fee details
    var data = {
      customerID: 1,
      shopName: route.params.shopName,
      shopAddress: route.params.address,
      itemDetails: arr,
      totalPrice: total.toString(),
      deliveryLocation: "Loyal mill colony,Kovilpatti",
      datetime: new Date(),
    };
    //Delete the cart
    await dispatch({
      type: "DELETE_CART",
    });
    await axios
      .post(
        "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-fkimm/service/StallDetailsAPI/incoming_webhook/ORDERPLACED?secret=ZAGAORDERPLACED",
        data
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Order Placed Successfully");
          setOrderID(res.data);
        } else {
          alert("Order Placed Failed");
        }
      });
    navigation.navigate("Home");
  };

  const handleChangeAddress = async (item) => {
    // console.log(item);
    await setAddress(item);
    await setCheckAddress(true);
    await setLocality(item.City);
    onClose();
  };

  return (
    <NativeBaseProvider>
      <>
        <SafeAreaView
          style={{
            marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
          }}
        >
          <View style={{ flexDirection: "row", marginLeft: 15, marginTop: 8 }}>
            <Image
              style={{ width: 70, height: 70, borderRadius: 5 }}
              source={{ uri: route.params.shopImage }}
            />
            <View style={{ marginTop: 10, marginLeft: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                {route.params.shopName}
              </Text>
              <Text style={{ fontSize: 12, color: "grey" }}>
                {route.params.address}
              </Text>
            </View>
          </View>
          <ScrollView>
            {Object.entries(dict).map(([key, value]) => (
              <View
                key={key}
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                  <View>
                    <Text style={{ width: 150, fontSize: 15 }}>{key}</Text>
                    <Text style={{ fontSize: 12, color: "grey" }}>
                      {value[0]}Kg
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: 70,
                      padding: 3,
                      borderRadius: 2,
                      borderWidth: 1,
                      borderColor: "#32CD32",
                      marginTop: 15,
                      marginLeft: 30,
                    }}
                  >
                    <TouchableOpacity onPress={() => onMinus(key)}>
                      <Text style={{ fontSize: 18 }}>−</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, marginTop: 3 }}>
                      {value[0]}
                    </Text>
                    <TouchableOpacity onPress={() => onPlus(key)}>
                      <Text style={{ fontSize: 18 }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    marginRight: 15,
                    marginTop: 20,
                  }}
                >
                  ₹{value[1]}
                </Text>
              </View>
            ))}
            <View
              style={{
                padding: 8,
                backgroundColor: "grey",
                marginTop: 15,
                opacity: 0.2,
              }}
            ></View>
            <View style={{ padding: 20 }}>
              <Text style={{ fontWeight: "700" }}>Bill Details</Text>
              {Bill.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // marginLeft: 10,
                    marginTop: 12,
                  }}
                >
                  <Text style={{ fontSize: 15, color: "grey" }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontWeight: "600", fontSize: 15 }}>
                    ₹{item.price}
                  </Text>
                </View>
              ))}
            </View>
            <View
              style={{
                padding: 8,
                backgroundColor: "grey",
                marginTop: 15,
                opacity: 0.2,
              }}
            ></View>
          </ScrollView>

          <View
            style={{
              position: "absolute",
              top: Dimensions.get("window").height - 80,
              alignSelf: "center",
              width: "100%",
            }}
          >
            {checkAddress === false ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  borderColor: "black",
                  borderTopWidth: 1,
                  bottom: 30,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 150,
                    height: 40,
                    borderColor: "#0ff0a7",
                    justifyContent: "center",
                    borderWidth: 1,
                  }}
                  onPress={() => handleOpen("ADD_ADDRESS")}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 15,
                      alignSelf: "center",
                      color: "#0ff0a7",
                    }}
                  >
                    ADD ADDRESS
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 150,
                    height: 40,
                    backgroundColor: "#0ff0a7",
                    justifyContent: "center",
                  }}
                  onPress={() => handleOpen("SELECT_ADDRESS")}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 15,
                      alignSelf: "center",
                      color: "white",
                    }}
                  >
                    SELECT ADDRESS
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View
                  style={{
                    margin: 10,
                    borderTopWidth: 1,
                    bottom: 120,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 1,
                      padding: 8,
                      width: 60,
                      marginTop: 10,
                    }}
                  >
                    <Ionicons
                      name="home-outline"
                      size={35}
                      color="black"
                      style={{ alignSelf: "center" }}
                    />
                  </View>
                  <View style={{ margin: 13 }}>
                    <Text style={{ fontSize: 15, fontWeight: "700" }}>
                      Delivery location
                    </Text>
                    <Text style={{ fontSize: 13, color: "grey", marginTop: 5 }}>
                      {locality}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "flex-end",
                      flex: 1,
                      justifyContent: "center",
                      marginRight: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setCheckAddress(false)}
                      style={{
                        borderWidth: 1,
                        padding: 5,
                        borderColor: "red",
                        opacity: 0.7,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: "red",
                          opacity: 0.7,
                          fontWeight: "500",
                        }}
                      >
                        Change
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    bottom: 110,
                    marginLeft: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 14, fontWeight: "700" }}>
                      ₹{Bill[3].price}
                    </Text>
                    <Text style={{ color: "grey", opacity: 0.8, fontSize: 13 }}>
                      Cash On Delivery
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#0ff0a7",
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                      width: 120,
                      marginRight: 10,
                    }}
                    onPress={() => orderPlaced()}
                  >
                    <Text style={{ fontSize: 15, color: "white" }}>
                      Place Order
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          {buttonText === "SELECT_ADDRESS" ? (
            <Center flex={1}>
              <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                  {nearBy.map((item, index) => (
                    <Actionsheet.Item
                      key={index}
                      onPress={() => handleChangeAddress(item)}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Ionicons
                          name="md-location-outline"
                          size={22}
                          color="black"
                          key={index}
                        />
                        <Text style={{ marginLeft: 8 }}>
                          {item.HouseNumber}, {item.Area}, {item.City}
                        </Text>
                      </View>
                    </Actionsheet.Item>
                  ))}
                </Actionsheet.Content>
              </Actionsheet>
            </Center>
          ) : null}
        </SafeAreaView>
      </>
    </NativeBaseProvider>
  );
}
