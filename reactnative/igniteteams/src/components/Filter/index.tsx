import { Container, Title } from './styles'
import * as T from './types'

export function Filter({ title, isActive, ...rest }: T.FilterProps) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
