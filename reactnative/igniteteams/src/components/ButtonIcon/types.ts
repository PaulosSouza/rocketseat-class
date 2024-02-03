import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type MaterialIconsNames = keyof typeof MaterialIcons.glyphMap

export type Variants = 'primary' | 'secondary'

export interface ButtonIconStyleProps {
  variants: Variants
}

export interface ButtonIconProps extends TouchableOpacityProps {
  variants?: Variants
  icon: MaterialIconsNames
}
