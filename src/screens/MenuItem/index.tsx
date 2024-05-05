import React from "react"
import {View} from "react-native"
import {ActionButton} from "@components/ActionButton"
import {useForm} from "react-hook-form"
import {FormTextInput} from "@components/FormTextInput"
import {StorageService, StoredKey} from "@service/StorageService"
import Toast from "react-native-toast-message"
import {NostrService} from "@service/NostrService"
import {NodeService} from "@service/NodeService"
import {getPublicKey, nip19} from "nostr-tools"
import {isEmpty} from "@util/validationUtils"

const storageService = new StorageService()
const nostrService = new NostrService()
const nodeService = new NodeService()

export const MenuItem = ({navigation}: any) => {
    const form = useForm()

    const addItem = async (menuItem: any) => {
        const nsec = await storageService.get(StoredKey.NSEC)
        let menu = await nodeService.queryEvent({
            kinds: [30000],
            authors: [getPublicKey(nip19.decode(nsec).data as Uint8Array)]
        })
        let menuUpdateEvent
        if (isEmpty(menu)) {
            menu = [menuItem]
        } else {
            menu = menu.concat(menuItem)
        }

        try {
            menuUpdateEvent = nostrService.signNostrEvent(nsec, 30000, [["n", "menu"]], menu)
            const event = nostrService.signNostrliveryEvent(nsec, "PUBLISH_EVENT", {event: menuUpdateEvent})
            await nodeService.postEvent(event)
            await storageService.set(StoredKey.MENU, menu)
            form.reset()
            Toast.show({
                type: "success",
                text1: "Item added",
            })
            navigation.navigate("Menu")

        } catch (e) {
            Toast.show({
                type: "error",
                text1: "Error:" + JSON.stringify(e),
            })
            console.log(e)
        }
    }

    const cancel = async () => {
        navigation.navigate("Menu")
    }

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
            rules={{minLength: 1, required: true, pattern: /\d+(,\d{1,2})?/}}
        />
        {/* TODO allow image upload from gallery */}
        <FormTextInput
            label="Image URL"
            control={form.control}
            rules={{pattern: /\bhttps?:\/\/\S+?\.(?:png|jpe?g|gif|bmp)\b/}}
        />
        {/* TODO This needs to be a list input where the user presses enter and it adds to a list */}
        <FormTextInput
            label="Categories"
            control={form.control}
            rules={{minLength: 1, required: true, pattern: /(?:\s*\w+\s*(?:,\s*\w+\s*)*)?/}}
        />

        {/* TODO what is the best way to do validation */}
        <ActionButton title={"Save"} color={"purple"} onPress={form.handleSubmit(addItem)} customStyle={{margin: '2%'}}/>
        <ActionButton title={"Cancel"} color={"red"} onPress={cancel} customStyle={{margin: '2%'}}/>
    </View>
}
