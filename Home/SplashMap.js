import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import Context from "../GlobalContext/ContextProvider";
import LottieView from "lottie-react-native";
const GOOGLE_API_KEY = "AIzaSyCC8eoRVLMatjpED8vou4sZl6NK8leiStI";
export default function SplashMap({ navigation }) {
  const [location, setLocation] = React.useState({
    latitude: 37.42159,
    longitude: -122.0837,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const {
    setLocality,
    setLatLng,
    locality,
    pressLocation,
    setPressLocation,
    locationDetails,
    setLocationDetails,
  } = useContext(Context);
  // const [locationDetails, setLocationDetails] = React.useState(null);
  const handlePress = async () => {
    await setPressLocation(true);
    await navigation.navigate("Home");
  };
  const detailOfLocation = async () => {
    await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${location.latitude},${location.longitude}&destinations=${location.latitude},${location.longitude}&key=${GOOGLE_API_KEY}`
    )
      .then((res) => res.json())
      .then(async (json) => {
        await setLocationDetails(json);
        await setLocality(json.destination_addresses[0].split(",")[1].trim());
      });
    await setLatLng(location);
    setInterval(() => {
      setLoading(false);
    }, 10000);
  };
  console.log(locality);
  React.useEffect(async () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      await setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      });
    })();
    await detailOfLocation();
  }, [location.latitude, location.longitude, pressLocation]);

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
           <LottieView
            source={require("../assets/9329-loading.json")}
            loop
            autoPlay
  />
          {locationDetails && (
            <Text style={{ fontSize: 15, fontWeight: "400" ,marginTop : Dimensions.get("window").height/3}}>
              {locationDetails.destination_addresses[0]}
            </Text>
          )}
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <MapView
            style={{ width: "100%", height: "80%" }}
            loadingEnabled={true}
            region={location}
            provider="google"
            // onRegionChange={(region) => handleRegionChange(region)}
            showsUserLocation={true}
            showsMyLocationButton={true}
          ></MapView>
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
              style={{
                flexDirection: "row",
                paddingHorizontal: 12,
                marginTop: 12,
              }}
            >
              <Ionicons name="ios-location-outline" size={24} color="orange" />
              {locationDetails !== null ? (
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, marginLeft: 5 }}
                >
                  {/* {locationDetails.locality} */}
                  {locationDetails.origin_addresses[0].split(",")[1]}
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
                  {locationDetails.destination_addresses[0]}
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
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      fontWeight: "500",
                    }}
                  >
                    CONFIRM LOCATION
                  </Text>
                </TouchableOpacity>
              </>
            ) : null}
          </View>
        </View>
      )}
    </>
  );
}
