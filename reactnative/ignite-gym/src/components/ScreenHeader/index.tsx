import { Center, Heading } from 'native-base'

import * as T from './types'

export function ScreenHeader({ title }: T.ScreenHeaderProps) {
  return (
    <Center bg="gray.600" pb={6} pt={16}>
      <Heading fontFamily="heading" color="gray.100" fontSize="xl">
        {title}
      </Heading>
    </Center>
  )
}
