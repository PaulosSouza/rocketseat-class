import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Routes } from '@config'
import { Groups, NewGroup, Players } from '@screens'

import { navigatorScreenOptions } from './config'

const Stack = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={navigatorScreenOptions}
      initialRouteName={Routes.GROUP}
    >
      <Stack.Screen name={Routes.GROUP} component={Groups} />
      <Stack.Screen name={Routes.NEW_GROUP} component={NewGroup} />
      <Stack.Screen name={Routes.PLAYERS} component={Players} />
    </Stack.Navigator>
  )
}
