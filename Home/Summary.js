import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Summary({ route }) {
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([]);

  const items = useSelector((state) => state.selectedItems.items);
  const total = items
    .map((item) => Number(item.price.replace("Rs.", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const dict = {};
  items.forEach((item) => {
    if (item.title in dict) {
      dict[item.title] = [
        dict[item.title][0] + 1,
        dict[item.title][1] + Number(item.price.replace("Rs.", "")),
      ];
      // dict[item.title] += Number(item.price.replace("Rs.", ""));
    } else {
      dict[item.title] = [1, Number(item.price.replace("Rs.", ""))];
      // dict.append(Number(item.price.replace("Rs.", "")));
    }
  });

  // console.log(dict);

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

  return (
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
        <View
          style={{
            margin: 15,
            // padding: 10,
            // borderWidth: 0.3,
            // borderRadius: 8,
            // borderStyle: "dashed",
            // borderColor: "grey",
          }}
        >
          {Object.entries(dict).map(([key, value]) => (
            <View key={key}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ fontSize: 15, fontWeight: "900" }}>{key}</Text>
                  <Text style={{ fontSize: 12, color: "grey" }}>
                    {value[0]}Kg
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: 70,
                      backgroundColor: "#90ee90",
                      padding: 3,
                      borderRadius: 8,
                      marginTop: 8,
                      marginRight: 5,
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
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontSize: 15, fontWeight: "900" }}>
                    ₹{value[1]}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 12,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderRadius: 8,
                  borderColor: "grey",
                }}
              ></View>
            </View>
          ))}
        </View>
        <View></View>
      </SafeAreaView>
    </>
  );
}

// {Object.entries(dict).map(([key, value]) => (
//   <View
//     key={key}
//     style={{
//       flexDirection: "row",
//       justifyContent: "space-between",
//       paddingHorizontal: 10,
//       marginTop: 10,
//     }}
//   >
//     <View>
//       <Text style={{ fontSize: 12, fontWeight: "600" }}>{key}</Text>
//     </View>
//     <View
//       style={{
//         justifyContent: "space-between",
//         flexDirection: "row",
//       }}
//     >

//       <Text style={{ fontSize: 17, fontWeight: "600", marginTop: 8 }}>
//         ₹{value[1]}
//       </Text>
//     </View>
//   </View>
// ))}
// <View
//   style={{
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     marginRight: 20,
//   }}
// >
//   <Text
//     style={{
//       fontSize: 17,
//       fontWeight: "700",
//       borderWidth: 1,
//       borderColor: "#000",
//       padding: 8,
//       borderRadius: 8,
//       marginTop: 20,
//     }}
//   >
//     Total : ₹{total}
//   </Text>
// </View>
