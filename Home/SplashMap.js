import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import Context from "../GlobalContext/ContextProvider";

export default function SplashMap({ navigation }) {
  const [location, setLocation] = React.useState({
    latitude: 37.42159,
    longitude: -122.0837,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const { setLocality, setLatLng } = useContext(Context);
  const [locationDetails, setLocationDetails] = React.useState(null);
  const handlePress = () => {
    navigation.navigate("Home");
  };
  const detailOfLocation = async () => {
    await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}`
    )
      .then((res) => res.json())
      .then((json) => {
        setLocationDetails(json);
        setLocality(json.locality);
      });
    setLatLng(location);
    // console.log("locationDetails", locationDetails);
    setInterval(() => {
      setLoading(false);
    }, 2000);
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
  // const handleRegionChange = (region) => {
  //   console.log({ region });
  // };
  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "500",
              fontStyle: "italic",
              marginBottom: 20,
            }}
          >
            Loading...
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "400" }}>
            Please Wait....We are getting your location
          </Text>
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
