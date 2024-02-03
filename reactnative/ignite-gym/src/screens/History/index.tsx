import { useCallback, useState } from 'react'

import { Heading, SectionList, Text, VStack, useToast } from 'native-base'

import { useFocusEffect } from '@react-navigation/native'

import { HistoryCard, Loading, ScreenHeader } from '@components'

import { api } from '@services/api'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'

import { isAppError } from '@utils/AppError'

export function History() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

  const toast = useToast()

  async function fetchHistory() {
    try {
      setIsLoading(true)

      const response = await api.get<HistoryByDayDTO[]>('/history')

      setExercises(response.data)
    } catch (error) {
      const title = isAppError(error)
        ? error.message
        : 'Não foi possível carregar o histórico.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(exercise) => exercise.id}
          renderItem={({ item: exercise }) => <HistoryCard data={exercise} />}
          renderSectionHeader={({ section }) => (
            <Heading
              fontFamily="heading"
              color="gray.200"
              fontSize="md"
              mt={10}
              mb={3}
            >
              {section.title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={
            !exercises.length && { flex: 1, justifyContent: 'center' }
          }
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há atividades registradas ainda. {'\n'}
              Vamos fazer exercícios hoje?
            </Text>
          )}
        />
      )}
    </VStack>
  )
}
