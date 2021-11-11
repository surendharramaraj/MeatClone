import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import MapView, { Callout, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

export default function SplashMap({ navigation }) {
  const [location, setLocation] = React.useState({
    latitude: 37.42159,
    longitude: -122.0837,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [locationDetails, setLocationDetails] = React.useState(null);
  const handlePress = () => {
    navigation.navigate("Home", { data: locationDetails });
  };
  const detailOfLocation = () => {
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}`
    )
      .then((res) => res.json())
      .then((json) => {
        setLocationDetails(json);
      });
  };
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      });
    })();
    detailOfLocation();
  }, [location.latitude, location.longitude]);
  // console.log(locationDetails);
  const handleLocation = async () => {
    let updatedLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: updatedLocation.coords.latitude,
      longitude: updatedLocation.coords.longitude,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <MapView
        style={{ width: "100%", height: "80%" }}
        loadingEnabled={true}
        region={location}
        provider="google"
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          // pinColor="blue"
        ></Marker>
      </MapView>
      <View style={{ position: "absolute", top: "78%", right: 30 }}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            marginTop: -50,
            borderRadius: 30,
          }}
          onPress={() => handleLocation()}
        >
          <Ionicons name="md-locate-outline" size={38} color="red" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text
          style={{
            marginTop: 12,
            marginLeft: 12,
            fontSize: 13,
            fontWeight: "bold",
          }}
        >
          SELECT DELIVERY LOCATION
        </Text>
        <View
          style={{ flexDirection: "row", paddingHorizontal: 12, marginTop: 12 }}
        >
          <Ionicons name="ios-location-outline" size={24} color="orange" />
          {locationDetails !== null ? (
            <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 5 }}>
              {locationDetails.locality}
            </Text>
          ) : null}
        </View>
        {locationDetails !== null ? (
          <>
            <Text
              style={{
                marginLeft: 12,
                marginTop: 3,
                fontSize: 13,
                fontWeight: "500",
              }}
            >
              {locationDetails.principalSubdivision},{" "}
              {locationDetails.countryName}. ({locationDetails.locality})
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#0ff0a7",
                width: "85%",
                height: 40,
                alignSelf: "center",
                justifyContent: "center",
                marginTop: 12,
                borderRadius: 4,
              }}
              onPress={() => handlePress()}
            >
              <Text
                style={{ textAlign: "center", fontSize: 15, fontWeight: "500" }}
              >
                CONFIRM LOCATION
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </View>
  );
}
