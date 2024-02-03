import { Container, Title } from './styles'
import * as T from './types'

export function Button({ title, variant = 'primary', ...rest }: T.ButtonProps) {
  return (
    <Container variant={variant} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
