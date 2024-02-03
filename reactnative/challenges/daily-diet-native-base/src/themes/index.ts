import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    green: {
      200: '#E5F0DB',
      300: '#CBE4B4',
      500: '#639339',
    },
    gray: {
      700: '#1B1D1E',
      600: '#333638',
      500: '#5C6265',
      400: '#B9BBBC',
      300: '#DDDEDF',
      200: '#EFF0F0',
      100: '#FAFAFA',
    },
    white: '#FFFFFF',
    red: {
      200: '#F4E6E7',
      300: '#F3BABD',
      500: '#BF3B44',
    },
  },
  // fonts: {
  //   heading: 'Roboto_700Bold',
  //   body: 'Roboto_400Regular',
  // },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '3xl': 32,
  },
})
