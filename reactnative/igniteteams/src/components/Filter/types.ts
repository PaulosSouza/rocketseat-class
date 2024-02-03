import { TouchableOpacityProps } from 'react-native'

export interface FilterStyleProps {
  isActive?: boolean
}

export interface FilterProps extends TouchableOpacityProps {
  title: string
  isActive?: boolean
}
