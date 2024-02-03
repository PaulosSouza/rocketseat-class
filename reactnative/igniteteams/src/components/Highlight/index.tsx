import { Container, Subtitle, Title } from './styles'
import * as T from './types'

export function Highlight({ title, subtitle }: T.HighlightProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  )
}
