import { useTheme } from 'styled-components/native'
import { Container } from './styles'
import * as T from './types'

export function Input({ ...rest }: T.InputProps) {
  const theme = useTheme()

  return <Container placeholderTextColor={theme.colors.gray_300} {...rest} />
}
