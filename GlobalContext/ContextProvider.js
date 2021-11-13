import React, { createContext, useState } from "react";

const Context = createContext();

export const ContextProvider = (props) => {
  const [locality, setLocality] = useState("");
  const [latLng, setLatLng] = useState();
  console.log("latLng", latLng);

  return (
    <Context.Provider value={{ locality, setLocality, latLng, setLatLng }}>
      {props.children}
    </Context.Provider>
  );
};

export default Context;
