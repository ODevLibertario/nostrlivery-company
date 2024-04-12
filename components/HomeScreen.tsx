import {Text} from "react-native";
import React from "react";
import {storage} from "../util/Storage";


//@ts-ignore
export const HomeScreen = ({navigation, route}) => {
    const [profile, setProfile] = React.useState({});


    storage.load({key:"profile"}).then(data => {
        if(!data) {
            navigation.navigate('Login')
        }
        setProfile(data)
    })


    return <Text>Hello, {(profile as any)['name']}</Text>;

};