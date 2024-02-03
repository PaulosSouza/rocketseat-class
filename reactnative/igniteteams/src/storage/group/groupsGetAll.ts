import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '../config'

export async function groupsGetAll(): Promise<string[]> {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION)
    const groups: string[] = storage ? JSON.parse(storage) : []
    return groups
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
