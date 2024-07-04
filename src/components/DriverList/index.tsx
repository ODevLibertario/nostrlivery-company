import React from 'react'
import { StyleSheet, View } from 'react-native'
import { DriverListItem } from './DriverListItem'

export interface IDriver {
  npub: string
  display_name: string
  name: string
}

interface DriverListProps {
  drivers: IDriver[]
}

export const DriverList: React.FC<DriverListProps> = ({ drivers }) => {
    return (
        <View style={style.listContainer}>
            {drivers.map((driver, index) => (
                <DriverListItem driver={driver} key={index} />
            ))}
        </View>
    )
}

const style = StyleSheet.create({
    listContainer: {
        display: 'flex',
        gap: 10,
        padding: 10,
    }
})