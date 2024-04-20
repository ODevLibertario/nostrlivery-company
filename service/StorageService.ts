import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class StorageService {
    async set(key: string, value: any) {
        await storage.save({
            key,
            data: value
        })
    }

    async get(key: string) {
        return await storage.load({
            key
        })
    }

    async remove(key: string) {
        await storage.remove({
            key
        })
    }

    async areValuesPresent(...keys: string[]) {
        for (const key of keys) {
            const value = await this.get(key)
            if (!value || value === '') {
                return false
            }
        }

        return true
    }
}

const storage = new Storage({
    // Use AsyncStorage for RN apps, or window.localStorage for web apps.
    // If storageBackend is not set, data will be lost after reload.
    storageBackend: AsyncStorage, // for web: window.localStorage

    // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
    // can be null, which means never expire.
    defaultExpires: 1000 * 3600 * 24,
})