import React from "react"
import ActionButton from "./ActionButton"
import {View} from "react-native"

const addItem = async () => {

}

// @ts-ignore
export const MenuScreen = ({navigation, route}) => {
    return <View style={{margin: '2%'}}>
        <ActionButton title={"Add Item"} color={"purple"} onPress={addItem}/>
    </View>
}