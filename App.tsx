import 'text-encoding'
import 'react-native-get-random-values'
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./components/LoginScreen";
import Toast from "react-native-toast-message";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {HomeScreen} from "./components/HomeScreen";
import NodeSelectionScreen from "./components/NodeSelectionScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
              headerBackVisible: false,
              navigationBarHidden: true,
              headerShown: false
          }} initialRouteName="NodeSelectionScreen">
            <Stack.Screen name="NodeSelectionScreen" component={NodeSelectionScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Nostrlivery" component={HomeTabs} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast position='bottom' />
      </>
  );
}

function HomeTabs() {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Drivers" component={HomeScreen} />
            <Tab.Screen name="Orders" component={HomeScreen} />
            <Tab.Screen name="Profile" component={HomeScreen} />
        </Tab.Navigator>
    );
}
