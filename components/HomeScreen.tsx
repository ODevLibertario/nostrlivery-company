import {Text} from "react-native"
import React from "react"
import {StorageService} from "../service/StorageService"

// @ts-ignore
export const HomeScreen = ({navigation, route}) => {
    const [profile, setProfile] = React.useState<any>({})
    const storageService = new StorageService()

    storageService.get('profile').then(data => {
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