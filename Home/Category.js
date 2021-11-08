import React ,{useEffect , useState} from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, ScrollView, Image , Alert } from "react-native";

const category = [
  { image: require("../assets/chicken.png"), text: "Chicken" },
  { image: require("../assets/beef.png"), text: "Beef" },
  { image: require("../assets/fish.png"), text: "Fish" },
  { image: require("../assets/mutton.jpg"), text: "Mutton" }
];
export default function Category({message,setMessage}) {
  return (
    <View
      style={{
        marginTop: 5,
        backgroundColor: "white", //#fff
        paddingVertical: 10,
        paddingLeft: 20,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {category.map((item, index) => (
          <TouchableOpacity key={index} style={{marginRight:30 , alignItems: "center"}}onPress={()=>setMessage(item.text)} >
            <Image
              source={item.image}
              style={{ width: 50, height: 40 }}
              resizeMode="contain"
            />
            <Text style={{fontSize:13 , fontWeight:'900'}}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
