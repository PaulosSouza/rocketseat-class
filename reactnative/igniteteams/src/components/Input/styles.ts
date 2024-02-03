import { TextInput } from 'react-native'
import styled, { css } from 'styled-components/native'

export const Container = styled(TextInput)`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  ${({ theme }) => css`
    color: ${theme.colors.white};
    background-color: ${theme.colors.gray_700};

    font-family: ${theme.font_family.regular};
    font-size: ${theme.font_size.md}px;
  `}

  border-radius: 6px;
  padding: 16px;
`
