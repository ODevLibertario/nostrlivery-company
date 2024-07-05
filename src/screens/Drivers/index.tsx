import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { DriverList, type IDriver } from '../../components/DriverList'
import { NodeService } from '../../service/NodeService'
import { nip19 } from 'nostr-tools'
import { ActionButton } from '../../components/ActionButton'
import { StorageService, StoredKey } from '../../service/StorageService'
import { NostrService } from '../../service/NostrService'

export const DriversScreen = ({navigation}: any) => {
    const [drivers, setDrivers] = useState<IDriver[]>([])
    const nodeService = new NodeService()
    const storageService = new StorageService()
    const nostrService = new NostrService()

    const driversNpubs = [
        'npub1cpxjrlnhfmcclcsly5c0dvrgvl5nsctzxpp4s9f2nh4qeq50mwsq4089fc',
        'npub1mh7g59qad8fsm7eq9ecq8v36lyef3ja5eyrmvevnwj2kx0jgchcqw42kwc'
    ]

    useEffect(() => {
        Promise.all(driversNpubs.map(async (npub): Promise<IDriver> => {
            return await handleGetProfileFromNpub(npub)
        }))
            .then((result) => {
                setDrivers(result)
            })
    }, [])

    async function handleGetProfileFromNpub(npub: string) {
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