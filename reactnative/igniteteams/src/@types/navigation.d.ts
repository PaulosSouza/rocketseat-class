/* eslint-disable @typescript-eslint/no-empty-interface */
import { PlayersRouteParams } from 'src/screens/Players/types'

import { Routes } from '@config'

type RouteList = {
  [Routes.GROUP]: undefined
  [Routes.NEW_GROUP]: undefined
  [Routes.PLAYERS]: PlayersRouteParams
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList extends RouteList {}
  }
}
