import { Image } from 'native-base'

import * as T from './types'

export function UserPhoto({ size, ...rest }: T.UserPhotoProps) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
    />
  )
}
