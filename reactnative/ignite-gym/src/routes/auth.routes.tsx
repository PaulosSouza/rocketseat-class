import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { RoutesNames } from '@config/routesNames'

import { SignIn, SignUp } from '@screens'

import { stackNavigatorScreenOptions } from './config'

type AuthRoutes = {
  [RoutesNames.SignIn]: undefined
  [RoutesNames.SignUp]: undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const Stack = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={stackNavigatorScreenOptions}
      initialRouteName={RoutesNames.SignIn}
    >
      <Stack.Screen name={RoutesNames.SignIn} component={SignIn} />
      <Stack.Screen name={RoutesNames.SignUp} component={SignUp} />
    </Stack.Navigator>
  )
}
