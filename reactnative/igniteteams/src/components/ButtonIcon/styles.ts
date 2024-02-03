import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import type * as T from './types'

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;

  justify-content: center;
  align-items: center;

  margin-left: 12px;
`

export const Icon = styled(MaterialIcons).attrs<T.ButtonIconStyleProps>(
  (props) => ({
    size: 24,
    color:
      props.variants === 'primary'
        ? props.theme.colors.green_700
        : props.theme.colors.red,
  }),
)``
