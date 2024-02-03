import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { RoutesNames } from '@config/routesNames'

import { Exercise, History, Home, Profile } from '@screens'

import {
  exerciseBottomTabNavigatorScreenOptions,
  useBottomTabNavigatorScreenOptions,
  useHistoryBottomTabNavigatorScreenOptions,
  useHomeBottomTabNavigatorScreenOptions,
  useProfileBottomTabNavigatorScreenOptions,
} from './config'

type AppRoutes = {
  [RoutesNames.Home]: undefined
  [RoutesNames.Exercise]: {
    exerciseId: string
  }
  [RoutesNames.History]: undefined
  [RoutesNames.Profile]: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const Tab = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const bottomTabNavigatorScreenOptions = useBottomTabNavigatorScreenOptions()

  const homeBottomTabNavigatorScreenOptions =
    useHomeBottomTabNavigatorScreenOptions()

  const profileBottomTabNavigatorScreenOptions =
    useProfileBottomTabNavigatorScreenOptions()

  const historyBottomTabNavigatorScreenOptions =
    useHistoryBottomTabNavigatorScreenOptions()

  return (
    <Tab.Navigator screenOptions={bottomTabNavigatorScreenOptions}>
      <Tab.Screen
        name={RoutesNames.Home}
        component={Home}
        options={homeBottomTabNavigatorScreenOptions}
      />

      <Tab.Screen
        name={RoutesNames.History}
        component={History}
        options={historyBottomTabNavigatorScreenOptions}
      />

      <Tab.Screen
        name={RoutesNames.Profile}
        component={Profile}
        options={profileBottomTabNavigatorScreenOptions}
      />

      <Tab.Screen
        name={RoutesNames.Exercise}
        component={Exercise}
        options={exerciseBottomTabNavigatorScreenOptions}
      />
    </Tab.Navigator>
  )
}
