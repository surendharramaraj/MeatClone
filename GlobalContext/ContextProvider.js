import React, { createContext, useState } from "react";

const Context = createContext();

export const ContextProvider = (props) => {
  const [locality, setLocality] = useState("");
  const [latLng, setLatLng] = useState();
  const [address, setAddress] = useState(null);
  // console.log("latLng", latLng);
  // console.log("locality", locality);
  const [user, setUser] = useState();
  return (
    <Context.Provider value={{ locality, setLocality, latLng, setLatLng ,address, setAddress , user, setUser}}>
      {props.children}
    </Context.Provider>
  );
};

export default Context;
