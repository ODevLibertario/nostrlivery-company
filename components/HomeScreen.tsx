import {Text} from "react-native"
import React from "react"
import {StorageService, StoredKey} from "../service/StorageService"

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
        return (<Text>Hello, {profile.name}</Text>)
    } else {
        return <></>
    }
}