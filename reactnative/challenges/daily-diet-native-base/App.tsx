import { NativeBaseProvider } from 'native-base'

import { theme } from '@themes/index'

import { Home } from '@screens/Home'

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Home />
    </NativeBaseProvider>
  )
}
