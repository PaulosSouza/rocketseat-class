import { Container, Icon } from './styles'
import * as T from './types'

export function ButtonIcon({
  variants = 'primary',
  icon,
  ...rest
}: T.ButtonIconProps) {
  return (
    <Container {...rest}>
      <Icon name={icon} variants={variants} />
    </Container>
  )
}
