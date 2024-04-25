import { PermissionsAndroid } from "react-native"
import * as Location from 'expo-location'

const requestLocationPermission = async () => {
    Location.installWebGeolocationPolyfill()

    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

    return granted === 'granted'
}

export const getLocation: () => Promise<GeolocationPosition | undefined> = async () => {
    const granted = await requestLocationPermission()
    
    if(granted) {
        return await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                resolve(position)
            },
            error => {
                reject(error)
            }
            )
        })
    }
}