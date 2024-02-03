import { useNavigation } from '@react-navigation/native'
import { BackButton, BackIcon, Container, Logo } from './styles'
import * as T from './types'

import logoImg from '@assets/logo.png'
import { Routes } from '@config'

export function Header({ showBackButton }: T.HeaderProps) {
  const navigation = useNavigation()

  function handleGoBackHome() {
    navigation.navigate(Routes.GROUP)
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBackHome}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logoImg} />
    </Container>
  )
}
