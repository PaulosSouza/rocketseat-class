import { TouchableOpacity } from 'react-native'

import { HStack, Heading, Image, VStack, Text, Icon } from 'native-base'
import { Entypo } from '@expo/vector-icons'

import { api } from '@services/api'

import * as T from './types'

export function ExerciseCard({ data, ...rest }: T.ExerciseCardProps) {
  const { name, series, repetitions, thumb } = data

  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${thumb}`,
          }}
          alt="Imagem do exercício"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontFamily="heading" fontSize="lg" color="white">
            {name}
          </Heading>

          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {series} séries x {repetitions} repetićões
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}
