import React, { createContext, useState } from "react";

const Context = createContext();

export const ContextProvider = (props) => {
  const [locality, setLocality] = useState("");
  const [latLng, setLatLng] = useState();
  const [address, setAddress] = useState(null);
  const [checkAddress, setCheckAddress] = useState(false);
  const [user, setUser] = useState();
  const [contextShopName, setContextShopName] = useState(null);
  const [contextShopId, setContextShopId] = useState(null);
  const [contextAddress, setContextAddress] = useState(null);
  const [contextShopImage, setContextShopImage] = useState(null);
  const [pressLocation , setPressLocation] = useState(false);
  const [locationDetails, setLocationDetails] = React.useState(null);
  // console.log("contextShopImage", contextShopImage);
  // console.log("contextShopId", contextShopId);
  // console.log("contextShopName", contextShopName);
  // console.log("contextaddress", contextAddress);
  console.log("context" , pressLocation)
  return (
    <Context.Provider
      value={{
        locality,
        setLocality,
        latLng,
        setLatLng,
        address,
        setAddress,
        user,
        setUser,
        checkAddress,
        setCheckAddress,
        contextShopName,
        setContextShopName,
        contextShopId,
        setContextShopId,
        contextAddress,
        setContextAddress,
        contextShopImage,
        setContextShopImage,
        setPressLocation,
        pressLocation,
        locationDetails,
        setLocationDetails,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
