import AsyncStorage from '@react-native-async-storage/async-storage'
import { PlayerStorageDTO } from './PlayerStorageDTO'
import { PLAYER_COLLECTION } from '../config'
import { playersGetByGroup } from './playersGetByGroup'
import { AppError } from '@utils/AppError'

export async function playerAddByGroup(
  group: string,
  newPlayer: PlayerStorageDTO,
): Promise<void> {
  try {
    const storedPlayers = await playersGetByGroup(group)

    const playerAlreadyExists = storedPlayers.find(
      (player) => player.name === newPlayer.name,
    )

    if (playerAlreadyExists) {
      throw new AppError('Essa pessoa já está adicionada em um time aqui')
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}:${group}`, storage)
  } catch (error) {
    throw error
  }
}
