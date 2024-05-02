import React from "react"
import {View} from "react-native"
import {ActionButton} from "@components/ActionButton"
import {useForm} from "react-hook-form"
import {FormTextInput} from "@components/FormTextInput"

const addItem = async (values: any) => {
    console.log(values)
}

const cancel = async () => {

}
export const MenuItem = ({ navigation }: any) => {
    const form = useForm()

    console.log(form.formState.errors)

    return <View style={{margin: '2%'}}>
        <FormTextInput
            label="Name"
            control={form.control}
            rules={{minLength: 1, required: true}}
        />
        <FormTextInput
            label="Description"
            control={form.control}
            rules={{minLength: 1, required: true}}
        />
        <FormTextInput
            label="Price"
            control={form.control}
            rules={{minLength: 1, required: true}}
        />
        {/* TODO allow image upload from gallery */}
        <FormTextInput
            label="Image"
            control={form.control}
            rules={{minLength: 1, required: true}}
        />
        {/* TODO This needs to be a list input where the user presses enter and it adds to a list */}
        <FormTextInput
            label="Categories"
            control={form.control}
            rules={{minLength: 1, required: true}}
        />

        {/* TODO what is the best way to do validation */}
        <ActionButton title={"Save"} color={"purple"} onPress={form.handleSubmit(addItem)} customStyle={{margin: '2%'}}/>
        <ActionButton title={"Cancel"} color={"red"} onPress={cancel} customStyle={{margin: '2%'}}/>
    </View>
}
