import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FormTextInput } from '../../../components/FormTextInput'
import { useForm } from 'react-hook-form'
import { ActionButton } from '../../../components/ActionButton'
import Toast from 'react-native-toast-message'
import { StorageService, StoredKey } from '../../../service/StorageService'
import { NostrService } from '../../../service/NostrService'
import { NodeService } from '../../../service/NodeService'

export const DriverItem = ({navigation}: any) => {
    const form = useForm()

    const storageService = new StorageService()
    const nostrService = new NostrService()
    const nodeService = new NodeService()

    async function addDriver(driver: any) {
        const nsec = await storageService.get(StoredKey.NSEC)
        const driverNpub = driver['Driver NPub']

        const driverAssociationRequestEvent = nostrService.signNostrEvent(nsec, 20000, [], {
            "type": "DRIVER_ASSOCIATION_REQUEST",
            driverNpub
        })
        const event = nostrService.signNostrliveryEvent(nsec, "PUBLISH_EVENT", {event: driverAssociationRequestEvent})
        await nodeService.postEvent(event)
        navigation.navigate('Drivers')
    }

    function handleValidationError(error: any) {
        Object.keys(error).forEach((key) => {
            Toast.show({
                type: 'error',
                text1: `${key}: ${error[key].message}`,
            })
        })
    }

    return (
        <View style={styles.container}>
            <FormTextInput
                label='Driver NPub'
                control={form.control}
                rules={{
                    minLength: 1,
                    required: true,
                    pattern: /^npub1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{58}$/,
                }}
            />
            <ActionButton title='Save' color='purple' onPress={form.handleSubmit(addDriver, handleValidationError)}/>
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
