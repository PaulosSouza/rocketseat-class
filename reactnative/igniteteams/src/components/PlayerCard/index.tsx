import { ButtonIcon } from '../ButtonIcon'
import { Container, Icon, Name } from './styles'
import * as T from './types'

export function PlayerCard({ name, onRemove }: T.PlayerCardProps) {
  return (
    <Container>
      <Icon name="person" />

      <Name>{name}</Name>

      <ButtonIcon icon="close" variants="secondary" onPress={onRemove} />
    </Container>
  )
}
