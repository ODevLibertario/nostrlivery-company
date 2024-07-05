import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { DriverList, type IDriver } from '../../components/DriverList'
import { NodeService } from '../../service/NodeService'
import { getPublicKey, nip19 } from 'nostr-tools'
import { ActionButton } from '../../components/ActionButton'
import { StorageService, StoredKey } from '../../service/StorageService'
import Toast from 'react-native-toast-message'

export const DriversScreen = ({navigation}: any) => {
    const [drivers, setDrivers] = useState<IDriver[]>([])
    const nodeService = new NodeService()
    const storageService = new StorageService()

    useEffect(() => {
        getDrivers()
            .then(() => {
                console.log('Drivers fetched')
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    async function getDrivers() {
        const nsec = await storageService.get<string>(StoredKey.NSEC)
        const event = (await nodeService.queryEvent({
            kinds: [20000],
            authors: [getPublicKey(nip19.decode(nsec).data as Uint8Array)]
        }))
        
        if(event?.driverNpub) {
            const driver = await handleGetProfileFromNpub(event.driverNpub)

            setDrivers([driver])
        }
    }

    async function handleGetProfileFromNpub(npub: string): Promise<IDriver> {
        const {type, data} = nip19.decode(npub)

        if(type === 'npub') {
            const profile = await nodeService.queryEvent({kinds: [0], authors: [data]})

            return {
                npub,
                displayName: profile.display_name,
                name: profile.name,
                profilePic: profile.picture
            }
        }
        return {
            npub,
            displayName: '',
            name: '',
            profilePic: ''
        }
    }

    function handleAddNewItem() {
        navigation.navigate('Add new Driver')
    }

    return (
        <View style={styles.container}>
            <DriverList drivers={drivers}/>
            <ActionButton color='purple' title='Add Driver' onPress={handleAddNewItem}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 10,
        padding: 10,
    },
})