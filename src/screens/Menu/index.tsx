import React, {useEffect, useReducer, useState} from "react"
import {ActionButton} from "@components/ActionButton"
import {Alert, Image, TouchableOpacity, View} from "react-native"
import {StorageService, StoredKey} from "@service/StorageService"
import {List} from "react-native-paper"
import {useFocus} from "@util/navigationUtils";
import {getPublicKey, nip19} from "nostr-tools";
import {NodeService} from "@service/NodeService";
import {NostrService} from "@service/NostrService";


export const MenuScreen = ({navigation}: any) => {
    const storageService = new StorageService()
    const nostrService = new NostrService()
    const nodeService = new NodeService()
    const [menu, setMenu] = useState<any>([])
    const {focusCount, isFocused} = useFocus();
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const removeAlert = async (name: string, index: number) => {
        Alert.alert('Remove Item', 'Are you sure you want to remove the item '+ name + '?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {text: 'OK', onPress: () => remove(index)},
        ]);
    }

    const remove = async (index: number) => {
        if (index > -1) {
            menu.splice(index, 1)
        }
        const nsec = await storageService.get(StoredKey.NSEC)
        const menuUpdateEvent = nostrService.signNostrEvent(nsec, 30000, [["n", "menu"]], menu)
        const event = nostrService.signNostrliveryEvent(nsec, "PUBLISH_EVENT", {event: menuUpdateEvent})
        await nodeService.postEvent(event)
        await storageService.set(StoredKey.MENU, menu)
        setMenu(menu)
        forceUpdate()
    }

    const edit = async () => {
        navigation.navigate("Menu")
    }


    useEffect(() => {
        const nsec = storageService.get(StoredKey.NSEC). then(nsec => {
            nodeService.queryEvent({
                kinds: [30000],
                authors: [getPublicKey(nip19.decode(nsec).data as Uint8Array)]
            }).then(menu => {
                setMenu(menu)
                storageService.set(StoredKey.MENU, menu).then()
            })
        })
    }, []);

    useEffect(() => {
        // Is coming from navigation
        if (focusCount > 1 && isFocused) {
            storageService.get(StoredKey.MENU).then((menu) => {
                setMenu(menu)
            })
        }
    });

    return (
        <View style={{margin: '2%'}}>
            {menu && <List.Section>
                <List.Subheader>Category</List.Subheader>
                {menu.map((i: any, index: number) =>
                    <List.Item
                        key={index}
                        title={i["Name"] + " - " + i["Price"]} description={i["Description"]}
                        left={() => <Image style={{width: 60, height: 60}} source={{uri: i["Image URL"]}}></Image>}
                        right={() =>
                            <>
                                <TouchableOpacity style={{marginRight: '2%'}}>
                                    <List.Icon icon="pencil"/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => removeAlert(i["Name"], index)}>
                                    <List.Icon icon="delete"/>
                                </TouchableOpacity>
                            </>}
                    />
                )}
            </List.Section>}

            <ActionButton title={"Add Item"} color={"purple"} onPress={() => navigation.navigate("Menu Item")}/>
        </View>
    )
}
