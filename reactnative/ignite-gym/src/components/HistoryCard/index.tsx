import { HStack, Heading, Text, VStack } from 'native-base'

import * as T from './types'

export function HistoryCard({ data }: T.HistoryCardProps) {
  const { group, name, hour } = data

  return (
    <HStack
      w="full"
      px={5}
      py={4}
      mb={3}
      bg="gray.600"
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr={5} flex={1}>
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="md"
          textTransform="capitalize"
        >
          {group}
        </Heading>

        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          {name}
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md">
        {hour}
      </Text>
    </HStack>
  )
}
