import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export const shopItem = []
export default function Shop(props) {
  let length_of_the_shop = props.shopData.filter(
    (item) => item.category.includes(props.message) && item.is_closed === false
  ).length;
  return (
    <>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {length_of_the_shop === 0 ? (
          <View style={{alignItems:'center',justifyContent: 'center',marginTop:Dimensions.get('window').height/3}}>
            <Image source={require('../assets/NoMeatLogo.png')} style={{width:150,height:150}}/>
            <Text style={{fontSize:26 , fontWeight: '500' , fontStyle: 'italic' }}>{props.message} is not currently available</Text>
          </View>
        ) : (
          props.shopData
            .filter(
              (item) =>
                item.category.includes(props.message) &&
                item.is_closed === false
            )
            .map((item, index) => (
              <View
                key={index}
                style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    props.navigation.navigate("ShopDetail", { data: item })
                  }
                >
                  <ShopImage image_url={item.image_url} />
                  <ShopInfo name={item.name} rating={item.rating} />
                </TouchableOpacity>
              </View>
            ))
        )}
      </ScrollView>
    </>
  );
}

const ShopImage = (props) => (
  <>
    <Image
      source={{ uri: props.image_url }}
      style={{ width: "100%", height: 180 }}
    />
    <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
      <AntDesign name="hearto" size={25} color="white" />
    </TouchableOpacity>
  </>
);
const ShopInfo = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
      alignItems: "center",
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.name}</Text>
      <Text style={{ fontSize: 13, color: "black" }}>30-45 Min</Text>
    </View>
    <View
      style={{
        backgroundColor: "gray",
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>{props.rating}</Text>
    </View>
  </View>
);
