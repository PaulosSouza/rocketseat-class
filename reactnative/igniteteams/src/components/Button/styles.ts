import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'
import type * as T from './types'

function variantStyles(variant: T.Variants) {
  return {
    primary: css`
      background-color: ${(props) => props.theme.colors.green_700};
    `,

    secondary: css`
      background-color: ${(props) => props.theme.colors.red_dark};
    `,
  }[variant]
}

export const Container = styled(TouchableOpacity)<T.ButtonStyleProps>`
  flex: 1;
  justify-content: center;
  align-items: center;

  min-height: 56px;
  max-height: 56px;

  ${(props) => variantStyles(props.variant)};

  border-radius: 6px;
`

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.font_size.md}px;
    color: ${theme.colors.white};
    font-family: ${theme.font_family.bold};
  `}
`
