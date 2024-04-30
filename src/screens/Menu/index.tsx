import React from "react"
import { ActionButton } from "../../components/ActionButton"
import { View } from "react-native"

const addItem = async () => {

}

export const MenuScreen = () => {
    return (
        <View style={{margin: '2%'}}>
            <ActionButton title={"Add Item"} color={"purple"} onPress={addItem}/>
        </View>
    )
}
