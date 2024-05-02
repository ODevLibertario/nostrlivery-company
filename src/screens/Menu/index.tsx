import React from "react"
import { ActionButton } from "@components/ActionButton"
import { View } from "react-native"

export const MenuScreen = ({ navigation }: any) => {
    return (
        <View style={{ margin: '2%' }}>
            <ActionButton title={"Add Item"} color={"purple"} onPress={() => navigation.navigate("Menu Item")} />
        </View>
    )
}
