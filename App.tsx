import {StyleSheet, Text} from 'react-native';
import 'text-encoding'
import 'react-native-get-random-values'
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "./components/LoginScreen";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();

// @ts-ignore
const ProfileScreen = ({navigation, route}) => {
    return <Text>Hello world</Text>;
};

export default function App() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{title: 'Login'}}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast position='bottom' />
      </>
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
