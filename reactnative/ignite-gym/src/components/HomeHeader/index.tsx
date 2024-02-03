import { TouchableOpacity } from 'react-native'

import { HStack, Heading, Icon, Text, VStack } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

import { useAuth } from '@hooks/useAuth'

import { api } from '@services/api'

import { UserPhoto } from '../UserPhoto'

export function HomeHeader() {
  const { user, signOut } = useAuth()

  async function handleSignOut(): Promise<void> {
    await signOut()
  }

  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : require('@assets/userPhotoDefault.png')
        }
        size={16}
        alt="Imagem do usuário"
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading fontFamily="heading" color="gray.200" fontSize="md">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={handleSignOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  )
}
