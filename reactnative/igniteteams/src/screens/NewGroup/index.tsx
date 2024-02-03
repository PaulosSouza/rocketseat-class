import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Routes } from '@config'
import { Button, Header, Highlight, Input } from '@components'

import { Container, Content, Icon } from './styles'
import { Alert, Keyboard } from 'react-native'
import { groupCreate } from '@storage'
import { AppError } from '@utils/AppError'

export function NewGroup() {
  const [group, setGroup] = useState<string>('')
  const navigation = useNavigation()

  async function handleNewGroup(): Promise<void> {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Turma', 'Informe o nome da turma')
      }

      await groupCreate(group)

      navigation.navigate(Routes.PLAYERS, {
        group,
      })

      Keyboard.dismiss()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Turma', error.message)
        return
      }

      Alert.alert('Novo Turma', 'Não foi possível criar um novo Turma')
      console.error(error)
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar pessoas"
        />

        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
          value={group}
        />

        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNewGroup}
        />
      </Content>
    </Container>
  )
}
