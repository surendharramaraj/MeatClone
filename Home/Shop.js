import React, { useEffect , useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export const shopItem = [
  {
    name: "Hari Chicken Stall",
    shopId : 1,
    image_url:
      "data:image/jpeg;base64,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",
    is_closed: false,
    category: ["Chicken"],
    rating: 3,
    location: {
        "address1": "424 E 9th St",
        "address2": null,
        "address3": "",
        "city": "New York",
        "zip_code": "10009",
        "country": "US",
        "state": "NY",
        "display_address": [
            "424 E 9th St",
            "New York, NY 10009"
        ]
    },
    phone: 9839024821,
    product :[
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
      }
    ]    
  },
  {
    name: "Surendar Mutton Stall",
    shopId : 2,
    image_url:
      "https://st.depositphotos.com/1293766/1473/i/600/depositphotos_14734231-stock-photo-meat-slice.jpg",
    is_closed: false,
    category: [ "Mutton"],
    rating: 3.5,
    location: {
        "address1": "424 E ",
        "address2": null,
        "address3": "",
        "city": "New York",
        "zip_code": "10009",
        "country": "US",
        "state": "NY",
        "display_address": [
            "424 E 9th St",
            "New York, NY 10009"
        ]
    },
    phone: 9839024821,
    product : [
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
        title: "Mutton",
        description: "Fresh Mutton For Your Cooking",
        price: "Rs.500",
        image:
          "https://proteins.live/assets/images/products/Mutton_Curry_Cut_-_Small_Pieces4.jpg",
      },
    ]  
  },
  {
    name: "Mugesh Meat Stall",
    shopId : 3,
    image_url:
      "https://st.depositphotos.com/1375221/3938/i/950/depositphotos_39381351-stock-photo-goat-meat.jpg",
    is_closed: false,
    category: ["Chicken", "Mutton"],
    rating: 4,
    location: {
        "address1": "424 E ",
        "address2": null,
        "address3": "",
        "city": "New York",
        "zip_code": "10009",
        "country": "US",
        "state": "NY",
        "display_address": [
            "424 E 9th St",
            "New York, NY 10009"
        ]
    },
    phone: 9839024821,
    product : [
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
        title: "Mutton",
        description: "Fresh Mutton For Your Cooking",
        price: "Rs.500",
        image:
          "https://proteins.live/assets/images/products/Mutton_Curry_Cut_-_Small_Pieces4.jpg",
      },
    ]
  },
  {
    name: "Shambiha Meat Stall",
    shopId : 4,
    image_url:
      "https://s3-media4.fl.yelpcdn.com/bphoto/nXO8M-d-XTamNmc0BpXWtA/o.jpg",
    is_closed: false,
    category: ["Chicken", "Mutton"],
    rating: 2.5,
    location: {
        "address1": "424 E ",
        "address2": null,
        "address3": "",
        "city": "New York",
        "zip_code": "10009",
        "country": "US",
        "state": "NY",
        "display_address": [
            "424 E 9th St",
            "New York, NY 10009"
        ]
    },
    phone: 9839024821,
    product : [
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
        title: "Mutton",
        description: "Fresh Mutton For Your Cooking",
        price: "Rs.500",
        image:
          "https://proteins.live/assets/images/products/Mutton_Curry_Cut_-_Small_Pieces4.jpg",
      },
    ]
  },
  {
    name: "Zaga Chicken Stall",
    shopId : 5,
    image_url:
      "https://previews.123rf.com/images/dream04/dream041710/dream04171000025/87487646-raw-meat-assortment-beef-lamb-chicken-on-a-wooden-board.jpg",
    is_closed: false,
    category: ["Chicken", "Mutton"],
    rating: 4,
    location: {
        "address1": "424 E ",
        "address2": null,
        "address3": "",
        "city": "New York",
        "zip_code": "10009",
        "country": "US",
        "state": "NY",
        "display_address": [
            "424 E 9th St",
            "New York, NY 10009"
        ]
    },
    phone: 9839024821,
    product : [
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
        title: "Mutton",
        description: "Fresh Mutton For Your Cooking",
        price: "Rs.500",
        image:
          "https://proteins.live/assets/images/products/Mutton_Curry_Cut_-_Small_Pieces4.jpg",
      },
    ]
  },
  {
    name: "Jey Mutton Stall",
    shopId : 6,
    image_url:
      "https://image.shutterstock.com/image-photo/mutton-meat-260nw-582555493.jpg",
    is_closed: true,
    category: [ "Mutton"],
    rating: 4.5,
    location: {
        "address1": "424 E ",
        "address2": null,
        "address3": "",
        "city": "New York",
        "zip_code": "10009",
        "country": "US",
        "state": "NY",
        "display_address": [
            "424 E 9th St",
            "New York, NY 10009"
        ]
    },
    phone: 9839024821,
    product : [
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
        title: "Mutton",
        description: "Fresh Mutton For Your Cooking",
        price: "Rs.500",
        image:
          "https://proteins.live/assets/images/products/Mutton_Curry_Cut_-_Small_Pieces4.jpg",
      },
    ]
  },
  {
    name: "Hari Meat&Fish Stall",
    shopId : 7,
    image_url:
      "https://s3-media4.fl.yelpcdn.com/bphoto/nXO8M-d-XTamNmc0BpXWtA/o.jpg",
    is_closed: false,
    category: [ "Mutton" , "Fish"],
    rating: 5,
    location: {
        "address1": "424 E ",
        "address2": null,
        "address3": "",
        "city": "New York",
        "zip_code": "10009",
        "country": "US",
        "state": "NY",
        "display_address": [
            "424 E 9th St",
            "New York, NY 10009"
        ]
    },
    phone: 9839024821,
    product : [
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
        title: "Mutton",
        description: "Fresh Mutton For Your Cooking",
        price: "Rs.500",
        image:
          "https://proteins.live/assets/images/products/Mutton_Curry_Cut_-_Small_Pieces4.jpg",
      },
    ]
  },
  {
    name: "Surendar Meat Stall",
    shopId : 8,
    image_url:
      "data:image/jpeg;base64,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",
    is_closed: false,
    category: ["Chicken" , "Beef" , "Fish"],
    rating: 4.5,
    location: {
        "address1": "424 E ",
        "address2": null,
        "address3": "",
        "city": "New York",
        "zip_code": "10009",
        "country": "US",
        "state": "NY",
        "display_address": [
            "424 E 9th St",
            "New York, NY 10009"
        ]
    },
    phone: 9839024821,
    product : [
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
        title: "Mutton",
        description: "Fresh Mutton For Your Cooking",
        price: "Rs.500",
        image:
          "https://proteins.live/assets/images/products/Mutton_Curry_Cut_-_Small_Pieces4.jpg",
      },
    ]
  },
  {
    name: "Bhai Beef Stall",
    shopId : 9,
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtugSZku8-w6B-tJ6jpb2pHavyJIVGEw7OQ&usqp=CAU",
    is_closed: false,
    category: ["Beef"],
    rating: 4.5,
    location: {
        "address1": "424 E ",
        "address2": null,
        "address3": "",
        "city": "New York",
        "zip_code": "10009",
        "country": "US",
        "state": "NY",
        "display_address": [
            "424 E 9th St",
            "New York, NY 10009"
        ]
    },
    phone: 9839024821,
    product : [
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
        title: "Mutton",
        description: "Fresh Mutton For Your Cooking",
        price: "Rs.500",
        image:
          "https://proteins.live/assets/images/products/Mutton_Curry_Cut_-_Small_Pieces4.jpg",
      },
    ]
  },
  {
    name: "Meena Meen Stall",
    shopId : 10,
    image_url:
      "data:image/jpeg;base64,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",
    is_closed: false,
    category: ["Fish"],
    rating: 4.5,
    location: {
        "address1": "424 E ",
        "address2": null,
        "address3": "",
        "city": "New York",
        "zip_code": "10009",
        "country": "US",
        "state": "NY",
        "display_address": [
            "424 E 9th St",
            "New York, NY 10009"
        ]
    },
    phone: 9839024821,
    product : [
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
        title: "Mutton",
        description: "Fresh Mutton For Your Cooking",
        price: "Rs.500",
        image:
          "https://proteins.live/assets/images/products/Mutton_Curry_Cut_-_Small_Pieces4.jpg",
      },
    ]
  },
  {
    name: "shambi Beef Stall",
    shopId : 11,
    image_url:
      "data:image/jpeg;base64,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",
    is_closed: false,
    category: ["Beef"],
    rating: 4.5,
    location: {
        "address1": "424 E ",
        "address2": null,
        "address3": "",
        "city": "New York",
        "zip_code": "10009",
        "country": "US",
        "state": "NY",
        "display_address": [
            "424 E 9th St",
            "New York, NY 10009"
        ]
    },
    phone: 9839024821,
    product : [
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
        title: "Mutton",
        description: "Fresh Mutton For Your Cooking",
        price: "Rs.500",
        image:
          "https://proteins.live/assets/images/products/Mutton_Curry_Cut_-_Small_Pieces4.jpg",
      },
    ]
  },
];
export default function Shop(props) {
  // dict = {} 
  return (
      <>
    <ScrollView vertical showsVerticalScrollIndicator={false}>
      {props.shopData.map((item, index) => (
        <View
          key={index}
          style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
        >
          <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('ShopDetail' , {data : item})}>
            <ShopImage image_url={item.image_url} />
            <ShopInfo name={item.name} rating={item.rating} />
          </TouchableOpacity>
        </View>
      ))}
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
