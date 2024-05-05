import React, {useEffect, useState} from "react"
import {ActionButton} from "@components/ActionButton"
import {Image, View} from "react-native"
import {StorageService, StoredKey} from "@service/StorageService"
import {List} from "react-native-paper"

export const MenuScreen = ({navigation}: any) => {
    const storageService = new StorageService()
    const [menu, setMenu] = useState<any>([])

    useEffect(() => {
        storageService.get(StoredKey.MENU).then((menu) => {
            setMenu(menu)
        })
    }, [menu])

    return (
        <View style={{margin: '2%'}}>
            {menu && <List.Section>
                <List.Subheader>Category</List.Subheader>
                {menu.map((i: any, index: number) =>
                    <List.Item
                        key={index}
                        title={i["Name"] + " - " + i["Price"]} description={i["Description"]}
                        left={() => <Image style={{width: 50, height: 50}} source={{uri: i["Image URL"]}}></Image>}
                        right={() => <><List.Icon icon="pencil"/><List.Icon icon="delete"/></>}
                    />
                )}
            </List.Section>}

            <ActionButton title={"Add Item"} color={"purple"} onPress={() => navigation.navigate("Menu Item")}/>
        </View>
    )
}
