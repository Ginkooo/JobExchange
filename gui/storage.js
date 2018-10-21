import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'

export const STORAGE = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
})
