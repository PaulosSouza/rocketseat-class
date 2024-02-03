import {
  Button,
  GroupCard,
  Header,
  Highlight,
  ListEmpty,
  Loading,
} from '@components'

import { Container } from './styles'
import { Alert, FlatList } from 'react-native'
import { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Routes } from '@config'
import { groupsGetAll } from '@storage'

export function Groups() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup(): void {
    navigation.navigate(Routes.NEW_GROUP)
  }

  async function fetchGroups(): Promise<void> {
    try {
      setIsLoading(true)

      const groups = await groupsGetAll()
      setGroups(groups)
    } catch (error) {
      console.error(error)
      Alert.alert('Turmas', 'Não foi possíel carregar as turmas')
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate(Routes.PLAYERS, { group })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  return (
    <Container>
      <Header />

      <Highlight title="Turma" subtitle="jogue com sua turma" />

      {isLoading && <Loading />}
      {!isLoading && (
        <FlatList
          data={groups}
          keyExtractor={(groupName) => groupName}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          renderItem={({ item: groupName }) => (
            <GroupCard
              title={groupName}
              onPress={() => handleOpenGroup(groupName)}
            />
          )}
          ListEmptyComponent={
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          }
        />
      )}

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  )
}
