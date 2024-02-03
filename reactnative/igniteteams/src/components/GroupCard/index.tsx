import { Container, Icon, Title } from './styles'
import * as T from './types'

export function GroupCard({ title, ...rest }: T.GroupCardProps) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  )
}
