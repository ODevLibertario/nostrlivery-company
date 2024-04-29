import {Text} from "react-native"
import React from "react"
import {StorageService, StoredKey} from "../service/StorageService"
import {Card} from "react-native-paper"

// @ts-ignore
export const HomeScreen = ({navigation, route}) => {
    const [profile, setProfile] = React.useState<any>({})
    const storageService = new StorageService()

    storageService.get(StoredKey.PROFILE).then(data => {
        if(!data) {
            navigation.navigate('Login')
        }
        setProfile(data)
    })

    if(profile) {
        return (
            <Card style={{margin: '2%', maxHeight: 140}} onPress={ e => navigation.navigate("Menu")}>
                <Card.Cover source={require('../assets/menu-header.jpg')} style={{maxHeight: 100}} />
                <Card.Title title="Menu" titleStyle={{alignSelf: 'flex-end', fontWeight: 'bold'}} />
            </Card>
        )
    } else {
        return <></>
    }
}