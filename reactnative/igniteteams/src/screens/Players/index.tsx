import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, Keyboard } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import {
  Button,
  ButtonIcon,
  Filter,
  Header,
  Highlight,
  Input,
  ListEmpty,
  Loading,
  PlayerCard,
} from '@components'

import * as T from './types'

import { Container, Form, HeaderList, NumbersOfPlayers } from './styles'
import { AppError } from '@utils/AppError'
import {
  groupRemoveByName,
  playerAddByGroup,
  playerRemoveByGroup,
  playersGetByGroupAndTeam,
} from '@storage'
import { Routes } from '@config'

export function Players() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [newPlayerName, setNewPlayerName] = useState<string>('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<T.Player[]>([])

  const route = useRoute()
  const navigation = useNavigation()

  const { group } = route.params as T.PlayersRouteParams

  async function handleAddNewPlayer() {
    Keyboard.dismiss()

    if (newPlayerName.trim().length === 0) {
      Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar')
      return setNewPlayerName('')
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(group, newPlayer)
      await fetchPlayersByTeam()
      setNewPlayerName('')
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
        return setNewPlayerName('')
      }

      console.error(error)
      Alert.alert('Nova pessoa', 'Não foi possível adicionar')
      return setNewPlayerName('')
    }
  }

  const fetchPlayersByTeam = useCallback(async () => {
    try {
      setIsLoading(true)

      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    } catch (error) {
      console.error(error)
      Alert.alert(
        'Pessoas',
        'Não foi possível carregar as pessoas do time selecionado',
      )
    } finally {
      setIsLoading(false)
    }
  }, [group, team])

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      await fetchPlayersByTeam()
    } catch (error) {
      console.error(error)
      Alert.alert('Remover pessoa', 'Não foi possível remover esta pessoa')
    }
  }

  function handleGroupRemove() {
    Alert.alert('Remover', 'Deseja remover o turma?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await groupRemoveByName(group)
            navigation.navigate(Routes.GROUP)
          } catch (error) {
            console.error(error)
            Alert.alert('Remover turma', 'Não foi possível remover o turma')
          }
        },
      },
    ])
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [fetchPlayersByTeam, team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e espare os times" />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddNewPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddNewPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item: currentTeam }) => (
            <Filter
              title={currentTeam}
              isActive={currentTeam === team}
              onPress={() => setTeam(currentTeam)}
            />
          )}
          horizontal
        />
        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>

      {isLoading && <Loading />}
      {!isLoading && (
        <FlatList
          data={players}
          keyExtractor={(player) => player.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={players.length === 0 && { flex: 1 }}
          renderItem={({ item: player }) => (
            <PlayerCard
              name={player.name}
              onRemove={() => handlePlayerRemove(player.name)}
            />
          )}
          ListEmptyComponent={
            <ListEmpty message="Não há pessoas nesse time." />
          }
        />
      )}

      <Button
        title="Remove Turma"
        variant="secondary"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}
