import React from "react"
import ActionButton from "./ActionButton"
import {View} from "react-native"
import { TextInput } from 'react-native-paper'

const addItem = async () => {

}

// @ts-ignore
export const MenuItemScreen = ({navigation, route}) => {
    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [image, setImage] = React.useState("")
    const [categories, setCategories] = React.useState("")

    return <View style={{margin: '2%'}}>
        <TextInput
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
        />
        <TextInput
            label="Description"
            value={description}
            onChangeText={text => setDescription(text)}
        />
        <TextInput
            label="Price"
            value={price}
            onChangeText={text => setPrice(text)}
        />
        {/* TODO allow image upload from gallery */}
        <TextInput
            label="Image"
            value={image}
            onChangeText={text => setImage(text)}
        />
        {/* TODO This needs to be a list input where the user presses enter and it adds to a list */}
        <TextInput
            label="Categories"
            value={categories}
            onChangeText={text => setCategories(text)}
        />

        {/* TODO what is the best way to do validation */}
        <ActionButton title={"Save"} color={"purple"} onPress={addItem} customStyle={{margin: '2%'}}/>
        <ActionButton title={"Cancel"} color={"red"} onPress={addItem} customStyle={{margin: '2%'}}/>
    </View>
}