import { Container, Message } from './styles'
import * as T from './types'

export function ListEmpty({ message }: T.ListEmptyProps) {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  )
}
