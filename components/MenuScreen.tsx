import React from "react"
import ActionButton from "./ActionButton"
import {View} from "react-native"

// @ts-ignore
export const MenuScreen = ({navigation, route}) => {
    return <View style={{margin: '2%'}}>
        <ActionButton title={"Add Item"} color={"purple"} onPress={() => navigation.navigate("Menu Item")}/>
    </View>
}