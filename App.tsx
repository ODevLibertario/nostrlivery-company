import {StyleSheet, Text} from 'react-native';
import 'text-encoding'
import 'react-native-get-random-values'
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./components/LoginScreen";
import Toast from "react-native-toast-message";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {HomeScreen} from "./components/HomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// @ts-ignore
const ProfileScreen = ({navigation, route}) => {
    return <Text>Hello world</Text>;
};

export default function App() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
              headerBackVisible: false,
              navigationBarHidden: true,
              headerShown: false
          }}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{title: 'Login'}}
            />
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
            <Tab.Screen name="Drivers" component={ProfileScreen} />
            <Tab.Screen name="Orders" component={ProfileScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
