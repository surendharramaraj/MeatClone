import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home/Home";
import ShopDetail from "./Home/ShopDetail";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import cartSummary from "./Home/cartSummary";
import Summary from "./Home/Summary";

const store = configureStore();
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ShopDetail" component={ShopDetail} />
          <Stack.Screen name="OrderSummary" component={Summary} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
