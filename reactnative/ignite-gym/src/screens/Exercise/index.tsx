import { TouchableOpacity } from 'react-native'
import { useCallback, useEffect, useState } from 'react'

import {
  VStack,
  Icon,
  HStack,
  Heading,
  Text,
  Image,
  Box,
  ScrollView,
  useToast,
} from 'native-base'
import { Feather } from '@expo/vector-icons'

import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RoutesNames } from '@config/routesNames'

import { Button, Loading } from '@components'

import { api } from '@services/api'
import { ExerciseDTO } from '@dtos/ExerciseDTO'

import { isAppError } from '@utils/AppError'

import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import BodySvg from '@assets/body.svg'

import * as T from './types'

export function Exercise() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [sendingRegister, setSendingRegister] = useState<boolean>(false)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const route = useRoute()
  const toast = useToast()

  const { exerciseId } = route.params as T.ExerciseRouteParamsProps

  const fetchExerciseDetails = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await api.get<ExerciseDTO>(`/exercises/${exerciseId}`)
      setExercise(response.data)
    } catch (error) {
      const title = isAppError(error)
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }, [exerciseId, toast])

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true)

      await api.post('/history', {
        exercise_id: exerciseId,
      })

      toast.show({
        title: 'Parabéns! Exercício registrado no seu histórico',
        placement: 'top',
        bgColor: 'green.700',
      })

      navigation.navigate(RoutesNames.History)
    } catch (error) {
      const title = isAppError(error)
        ? error.message
        : 'Não foi possível registrar o exercício.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setSendingRegister(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [fetchExerciseDetails])

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            fontFamily="heading"
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
          >
            {exercise.name}
          </Heading>

          <HStack space={1} alignItems="center">
            <BodySvg />

            <Text color="gray.200" textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p={8}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                w="full"
                h={80}
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="Nome do exercício"
                resizeMode="cover"
              />
            </Box>

            <Box bg="gray.600" rounded="md" pb={4} px={4}>
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb={6}
                mt={5}
              >
                <HStack>
                  <SeriesSvg />
                  <Text color="gray.300" ml={2}>
                    {exercise.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.300" ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button
                title="Marcar como realizado"
                isLoading={sendingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}
