import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.gray_600};
`

export const LoadIndicator = styled.ActivityIndicator.attrs((props) => ({
  color: props.theme.colors.green_700,
}))``
