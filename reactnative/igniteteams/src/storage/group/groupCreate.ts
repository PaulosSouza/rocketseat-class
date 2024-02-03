import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '../config'
import { groupsGetAll } from './groupsGetAll'
import { AppError } from '@utils/AppError'

export async function groupCreate(newGroup: string): Promise<void> {
  try {
    const storedGroups = await groupsGetAll()

    const groupAlreadyExists = storedGroups.includes(newGroup)

    if (groupAlreadyExists) {
      throw new AppError('Já existe uma turma cadastrado com esse nome.')
    }

    const storage = JSON.stringify([newGroup, ...storedGroups])

    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    throw error
  }
}
