import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const DriverItem = () => {
    return (
        <View style={styles.container}>
            <Text>DriverItem Component</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
