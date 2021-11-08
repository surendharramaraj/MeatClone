import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StatusBar, Image } from "react-native";
import { useSelector } from "react-redux";
import { ListItem } from "react-native-elements";

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
];

export default function cartSummary({ route }) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState();

  const items = useSelector((state) => state.selectedItems.items);

  useEffect(() => {
    console.log(items);
    console.log(route.params.cart);
    setData(items);
    setCount(route.params.cart);
  }, []);
  // console.log(count);

  // const keyExtractor = (item, index) => index.toString();

  // const renderItem = ({ item, index }) => (
  //   <ListItem>
  //     <ListItem.Content>
  //       <ListItem.Title>{item.title}</ListItem.Title>
  //       <ListItem.Subtitle></ListItem.Subtitle>
  //       {/* <ListItem.Subtitle>{item.discription}</ListItem.Subtitle> */}
  //     </ListItem.Content>
  //     {/* <Image
  //       source={{ uri: item.imageUrl }}
  //       style={{ width: 80, height: 50 }}
  //     /> */}

  //     {/* <View
  //       style={{
  //         backgroundColor: "grey",
  //         borderRadius: 40,
  //         padding: 10,
  //       }}
  //     >
  //       <TouchableOpacity
  //         style={{
  //           flexDirection: "row",
  //         }}
  //         onPress={() => setCounter(counter + 1)}
  //       >
  //         <MaterialIcons name="add" color="white" size={25} />
  //       </TouchableOpacity>
  //       <Text style={{ margin: 2, textAlign: "center" }}>{counter}</Text>
  //       <TouchableOpacity
  //         style={{
  //           flexDirection: "row",
  //         }}
  //         onPress={() => setCounter(counter - 1)}
  //       >
  //         <MaterialCommunityIcons name="minus" color="white" size={25} />
  //       </TouchableOpacity>
  //     </View> */}
  //   </ListItem>
  // );

  const handlePress = (name) => {
    console.log(name);
    shopItem.map((item) => {
      if (item.name === name) {
        setOpen(name);
        setIsExpanded(!isExpanded);
      }
    });
  };

  return (
    <>
      <SafeAreaView
        style={{
          marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        }}
      >
        {/* {Object.entries(route.params.cart).map((key, val) => (
          <Text>
            {key[0]}: {key[1]}
          </Text>
        ))} */}
        {shopItem.map((l, i) => (
          <ListItem.Accordion
            key={i}
            content={
              <>
                {/* <Image
                source={{ uri: route.params.shopImage }}
                style={{ width: 80, height: 70, borderRadius: 10 }}
              /> */}
                <ListItem.Content>
                  <ListItem.Title> {l.name}</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={open === l.name ? isExpanded : false}
            onPress={() => handlePress(l.name)}
          >
            {l.product.map((item, index) => (
              <ListItem key={index}>
                {/* <Avatar title={l.title} source={{ uri: l.avatar_url }} /> */}
                {/* <Image
                source={{ uri: l.image }}
                style={{ width: 70, height: 40 }}
              /> */}
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                  {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
                </ListItem.Content>
                {/* <ListItem.Chevron /> */}
              </ListItem>
            ))}
          </ListItem.Accordion>
        ))}
      </SafeAreaView>
    </>
  );
}
