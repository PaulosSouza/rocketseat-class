import { TouchableOpacity } from 'react-native'
import { useState } from 'react'

import {
  VStack,
  ScrollView,
  Center,
  Skeleton,
  Text,
  Heading,
  useToast,
} from 'native-base'

import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { yupResolver } from '@hookform/resolvers/yup'

import { useAuth } from '@hooks/useAuth'
import { Button, Input, ScreenHeader, UserPhoto } from '@components'

import { api } from '@services/api'

import { isAppError } from '@utils/AppError'

const PHOTO_SIZE = 33

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string(),
  old_password: yup.string(),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 digitos.')
    .nullable()
    .transform((value) => value || undefined),
  confirm_password: yup
    .string()
    .nullable()
    .oneOf([yup.ref('password')], 'As senhas não batem.')
    .transform((value) => value || undefined)
    .when('password', {
      is: (value: string | undefined | null) => value && value.length > 0,
      then: (schema) =>
        schema
          .nullable()
          .required('Informe a confirmação da senha')
          .transform((value) => value || undefined),
    }),
})

type ProfileFormData = yup.InferType<typeof profileSchema>

export function Profile() {
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [photoIsLoading, setPhotoIsLoading] = useState<boolean>(false)

  const { user, updateUserProfile } = useAuth()
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return
      }

      const { uri, type } = photoSelected.assets[0]

      const photoInfo = await FileSystem.getInfoAsync(uri, {
        size: true,
      })

      const size = photoInfo.exists ? photoInfo.size / 1024 / 1024 : 0
      const maxSizeInMB = 5

      if (size > maxSizeInMB) {
        return toast.show({
          title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      const fileExtension = photoInfo.uri.split('.').pop()

      const photoFile = {
        name: `${user.name}.${fileExtension}`.toLocaleLowerCase(),
        uri: photoInfo.uri,
        type: `${type}/${fileExtension}`,
      } as never

      const userPhotoUploadForm = new FormData()
      userPhotoUploadForm.append('avatar', photoFile)

      const avatarUpdatedResponse = await api.patch(
        '/users/avatar',
        userPhotoUploadForm,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      const userUpdated = { ...user }
      userUpdated.avatar = avatarUpdatedResponse.data.avatar

      await updateUserProfile(userUpdated)

      toast.show({
        title: 'Foto atualizada!',
        placement: 'top',
        bgColor: 'green.500',
      })
    } catch (error) {
      const title = isAppError(error)
        ? error.message
        : 'Não foi possível atualizar os dados. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleProfileUpdate(data: ProfileFormData) {
    try {
      setIsUpdating(true)

      await api.put('/users', data)

      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })

      const userUpdated = { ...user }
      userUpdated.name = data.name

      await updateUserProfile(userUpdated)
    } catch (error) {
      const title = isAppError(error)
        ? error.message
        : 'Não foi possível atualizar os dados. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : require('@assets/userPhotoDefault.png')
              }
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nome"
                mb={4}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value } }) => (
              <Input
                bg="gray.600"
                placeholder="E-mail"
                value={value}
                isDisabled
                errorMessage={errors.email?.message}
              />
            )}
          />
        </Center>

        <VStack px={10} mt={12} mb={9} space={4}>
          <Heading fontFamily="heading" color="gray.200" fontSize="md" mb={2}>
            Alterar Senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.old_password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
