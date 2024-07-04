import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { type IDriver } from '..'

interface DriverListItemProps {
  driver: IDriver
}

export const DriverListItem: React.FC<DriverListItemProps> = ({ driver }) => {
    return (
        <View style={styles.driverListItemContainer}>
            <View style={styles.profilePicContainer}>
                <Image style={{
                    ...styles.profilePicContainer,
                    borderRadius: 40,
                    padding: 0
                }} source={{
                    uri: driver.profilePic
                }}/>
            </View>
            <View>
                <Text style={styles.driverDisplayName}>{driver.displayName}</Text>
                <Text style={styles.driverName}>{driver.name}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    driverListItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    profilePicContainer: {
        width: 80,
        height: 80,
    },
    driverDisplayName: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    driverName: {
        fontWeight: 'normal',
        fontSize: 10,
    }
})
