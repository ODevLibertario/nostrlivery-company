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
                Toast.show({
                    type: 'error',
                    text1: error.message,
                })
            })
    }, [])

    async function getDrivers() {
        const nsec = await storageService.get(StoredKey.NSEC)
        const driversNpubs = (await nodeService.queryEvent({
            kinds: [30000],
            authors: [getPublicKey(nip19.decode(nsec).data as Uint8Array)]
        }))
            .map((event: any) => event.content?.driverNpub)
        const list: IDriver[] = await Promise.all(driversNpubs.map(async (npub: string): Promise<IDriver> => {
            return handleGetProfileFromNpub(npub)
        }))

        setDrivers(list)
    }

    async function handleGetProfileFromNpub(npub: string): IDriver {
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