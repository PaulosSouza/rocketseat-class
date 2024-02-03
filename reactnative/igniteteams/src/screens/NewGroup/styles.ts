import UsersThree from 'phosphor-react-native/src/icons/UsersThree'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 24px;
  background-color: ${(props) => props.theme.colors.gray_600};
`

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`

export const Icon = styled(UsersThree).attrs((props) => ({
  size: 56,
  color: props.theme.colors.green_700,
}))`
  align-self: center;
`
