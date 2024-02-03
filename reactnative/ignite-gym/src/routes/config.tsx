import { Platform } from 'react-native'
import { useTheme } from 'native-base'

import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

import ProfileSvg from '@assets/profile.svg'
import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'

export const stackNavigatorScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'fade_from_bottom',
  animationDuration: 500,
}

export const exerciseBottomTabNavigatorScreenOptions: BottomTabNavigationOptions =
  {
    tabBarButton: () => null,
  }

export function useHomeBottomTabNavigatorScreenOptions(): BottomTabNavigationOptions {
  const { sizes } = useTheme()

  const iconSize = sizes[6]

  return {
    tabBarIcon: ({ color }) => (
      <HomeSvg fill={color} width={iconSize} height={iconSize} />
    ),
  }
}

export function useProfileBottomTabNavigatorScreenOptions(): BottomTabNavigationOptions {
  const { sizes } = useTheme()

  const iconSize = sizes[6]

  return {
    tabBarIcon: ({ color }) => (
      <ProfileSvg fill={color} width={iconSize} height={iconSize} />
    ),
  }
}

export function useHistoryBottomTabNavigatorScreenOptions(): BottomTabNavigationOptions {
  const { sizes } = useTheme()
  const iconSize = sizes[6]

  return {
    tabBarIcon: ({ color }) => (
      <HistorySvg fill={color} width={iconSize} height={iconSize} />
    ),
  }
}

export function useBottomTabNavigatorScreenOptions(): BottomTabNavigationOptions {
  const { sizes, colors } = useTheme()

  return {
    headerShown: false,
    tabBarShowLabel: false,
    tabBarActiveTintColor: colors.green[500],
    tabBarInactiveTintColor: colors.gray[200],
    tabBarStyle: {
      backgroundColor: colors.gray[600],
      borderTopWidth: 0,
      height: Platform.OS === 'android' ? 'auto' : 96,
      paddingBottom: sizes[8],
      paddingTop: sizes[6],
    },
  }
}
