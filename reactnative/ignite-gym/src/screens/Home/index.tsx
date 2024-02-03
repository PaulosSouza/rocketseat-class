/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'

import { VStack, FlatList, HStack, Heading, Text, useToast } from 'native-base'

import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { RoutesNames } from '@config/routesNames'

import { ExerciseCard, Group, HomeHeader, Loading } from '@components'

import { api } from '@services/api'
import { ExerciseDTO } from '@dtos/ExerciseDTO'

import { isAppError } from '@utils/AppError'

export function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState<string>('antebraço')

  const toast = useToast()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate(RoutesNames.Exercise, {
      exerciseId,
    })
  }

  const fetchGroups = useCallback(async () => {
    try {
      const response = await api.get<string[]>('/groups')

      setGroups(response.data)
    } catch (error) {
      const title = isAppError(error)
        ? error.message
        : 'Não foi possível carregar os grupos musculares.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }, [toast])

  async function fetchExercisesByGroup(group: string) {
    try {
      setIsLoading(true)
      const response = await api.get<ExerciseDTO[]>(
        `/exercises/bygroup/${group}`,
      )

      setExercises(response.data)
    } catch (error) {
      const title = isAppError(error)
        ? error.message
        : 'Não foi possível carregar os exercícios.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup(groupSelected)
    }, [groupSelected]),
  )

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item: groupName }) => (
          <Group
            name={groupName}
            isActive={groupSelected === groupName}
            onPress={() => setGroupSelected(groupName)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading fontFamily="heading" color="gray.200" fontSize="md">
              Exercícios
            </Heading>

            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(exercise) => exercise.id}
            renderItem={({ item: exercise }) => (
              <ExerciseCard
                data={exercise}
                onPress={() => handleOpenExerciseDetails(exercise.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  )
}
