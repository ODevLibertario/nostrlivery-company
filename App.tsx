import "text-encoding"
import "react-native-get-random-values"
import React from "react"
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import LoginScreen from "./components/LoginScreen"
import Toast from "react-native-toast-message"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {HomeScreen} from "./components/HomeScreen"
import NodeSelectionScreen from "./components/NodeSelectionScreen"
import {ProfileScreen} from "./components/ProfileScreen"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {MenuScreen} from "./components/MenuScreen"
import {MenuItemScreen} from "./components/MenuItemScreen"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export default function App() {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerBackVisible: false,
                        navigationBarHidden: true,
                        headerShown: false,
                    }}
                    initialRouteName="NodeSelectionScreen"
                >
                    <Stack.Screen
                        name="NodeSelectionScreen"
                        component={NodeSelectionScreen}
                    />
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Nostrlivery" component={HomeTabs}/>
                </Stack.Navigator>
            </NavigationContainer>
            <Toast position="bottom"/>
        </>
    )
}

function HomeTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    height: 80,
                    paddingBottom: 20,
                },
                tabBarActiveTintColor: "#2f1650",
                tabBarInactiveTintColor: "#a8a8a8",
                tabBarLabelStyle: {
                    fontSize: 14,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{

                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={size}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Drivers"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome name="motorcycle" color={color} size={size}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Orders"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="cart" color={color} size={size}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account" color={color} size={size}/>
                    ),
                }}
            />
            <Tab.Screen name="Menu" component={MenuScreen} options={{
                tabBarButton: () => null
            }}/>
            <Tab.Screen name="Menu Item" component={MenuItemScreen} options={{
                tabBarButton: () => null
            }}/>
        </Tab.Navigator>
    )
}
