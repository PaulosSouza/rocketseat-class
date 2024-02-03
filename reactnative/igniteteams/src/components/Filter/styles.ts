import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'
import * as T from './types'

export const Container = styled(TouchableOpacity)<T.FilterStyleProps>`
  ${({ theme, isActive }) =>
    isActive &&
    css`
      border: 1px solid ${theme.colors.green_700};
    `}

  border-radius: 4px;
  margin-right: 12px;

  height: 38px;
  width: 70px;

  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  text-transform: uppercase;
  ${({ theme }) => css`
    font-family: ${theme.font_family.bold};
    font-size: ${theme.font_size.sm}px;
    color: ${theme.colors.white};
  `}
`
