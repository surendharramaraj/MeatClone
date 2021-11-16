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
import { ContextProvider } from "./GlobalContext/ContextProvider";
import DeliverActionSheet from "./Home/DeliverActionSheet";
import SummaryClone from "./Home/SummaryClone";
import Context from "./GlobalContext/ContextProvider";
import Login from "./Home/Login";
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
              <Stack.Screen name="Drawer" component={drawer} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="ShopDetail" component={ShopDetail} />
              {/* <Stack.Screen name="OrderSummary" component={Summary} /> */}
              <Stack.Screen name="SummaryClone" component={SummaryClone} />
              <Stack.Screen
                name="DeliveryAddress"
                component={DeliverActionSheet}
              />
              <Stack.Screen name="Address" component={Address} />
            </>
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
};
