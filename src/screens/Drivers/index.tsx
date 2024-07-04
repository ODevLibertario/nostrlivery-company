import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { DriverList, type IDriver } from '../../components/DriverList'
import { NodeService } from '../../service/NodeService'
import { nip19 } from 'nostr-tools'

export const DriversScreen = () => {
    const [drivers, setDrivers] = useState<IDriver[]>([])
    const nodeService = new NodeService()

    const driversNpubs = [
        'npub180cvv07tjdrrgpa0j7j7tmnyl2yr6yr7l8j4s3evf6u64th6gkwsyjh6w6',
        'npub1cpxjrlnhfmcclcsly5c0dvrgvl5nsctzxpp4s9f2nh4qeq50mwsq4089fc',
        'npub1mh7g59qad8fsm7eq9ecq8v36lyef3ja5eyrmvevnwj2kx0jgchcqw42kwc'
    ]

    useEffect(() => {
        Promise.all(driversNpubs.map(async (npub): Promise<IDriver> => {
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
        }))
            .then((result) => {
                setDrivers(result)
            })
    }, [])

    return (
        <View>
            <DriverList drivers={drivers}/>
        </View>
    )
}