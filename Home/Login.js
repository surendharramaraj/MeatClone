import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Context from "../GlobalContext/ContextProvider";
const Login = () => {
  const { setUser } = React.useContext(Context);
  const handleLogin = async () => {
    await fetch(
      "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-fkimm/service/StallDetailsAPI/incoming_webhook/GETCUSTOMERDATA"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setUser(data);
      });
  };
  // console.log(user , 'login.js');
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <TouchableOpacity
        style={{ width: "100%", height: 40, backgroundColor: "green" }}
        onPress={() => handleLogin()}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
