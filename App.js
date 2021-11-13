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
import TrackOrder from "./DrawerComponents/TrackOrder";
import HelpCenter from "./DrawerComponents/HelpCenter";
import ProfileScreen from "./DrawerComponents/ProfileScreen";
import CustomDrawer from "./DrawerComponents/CustomDrawer";
import OrderHistory from "./DrawerComponents/OrderHistory";

const store = configureStore();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const drawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Map" component={SplashMap} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Track My Order" component={TrackOrder} />
      <Drawer.Screen name="Order History" component={OrderHistory} />
      <Drawer.Screen name="Help Center" component={HelpCenter} />
      <Drawer.Screen name="My Account" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};
export default function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Drawer" component={drawer} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ShopDetail" component={ShopDetail} />
          <Stack.Screen name="OrderSummary" component={Summary} />
          <Stack.Screen name="Address" component={Address} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
