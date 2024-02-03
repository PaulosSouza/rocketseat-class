import { TouchableOpacityProps } from 'react-native'

export type Variants = 'primary' | 'secondary'

export interface ButtonStyleProps {
  variant: Variants
}

export interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: Variants
}
