import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { DriverList, type IDriver } from '../../components/DriverList'

export const DriversScreen = () => {
    const [drivers, setDrivers] = useState<IDriver[]>([])

    useEffect(() => {
        setDrivers([
            {
                npub: '',
                display_name: 'John Doe',
                name: '@JohnDoe'
            },
            {
                npub: '',
                display_name: 'John Doe',
                name: '@JohnDoe'
            },
            {
                npub: '',
                display_name: 'John Doe',
                name: '@JohnDoe'
            }
        ])
    }, [])

    return (
        <View>
            <DriverList drivers={drivers}/>
        </View>
    )
}