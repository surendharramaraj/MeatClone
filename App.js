import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home/Home";
import ShopDetail from "./Home/ShopDetail";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import Summary from "./Home/Summary";
import SplashMap from "./Home/SplashMap";
import Address from "./Home/Address";
import { ContextProvider } from "./GlobalContext/ContextProvider";
import DeliverActionSheet from "./Home/DeliverActionSheet";
import SummaryClone from "./Home/SummaryClone";
import Context from "./GlobalContext/ContextProvider";
import Login from "./Home/Login";
import TrackOrder from "./Home/TrackOrder";
import EmptyCart from "./Home/EmptyCart";
const store = configureStore();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <UserAuth />
    </ContextProvider>
  );
}

const UserAuth = () => {
  const { user } = React.useContext(Context);
  // console.log(user);
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <>
              <Stack.Screen name="Map" component={SplashMap} />
              <Stack.Screen name="Home" component={Home}/>
              <Stack.Screen name="ShopDetail" component={ShopDetail} />
              <Stack.Screen name="SummaryClone" component={SummaryClone} />
              <Stack.Screen
                name="DeliveryAddress"
                component={DeliverActionSheet}
              />
              <Stack.Screen name="Address" component={Address} />
              <Stack.Screen name="TrackOrder" component={TrackOrder} />
              <Stack.Screen name="EmptyCart" component={EmptyCart} />
            </>
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
};
