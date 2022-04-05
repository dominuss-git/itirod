import { pathes } from './pathes'

export type TRoute = {
  path: string
  permissions: Array<Permissions>
  label: string
}
export const enum Permissions {
  AUTH = 'auth',
  HAS_METEO = 'has_meteo',
}

export const routes = {
  [pathes.HOME]: {
    path: pathes.HOME,
    permissions: [],
    label: 'Home',
  },
  [pathes.DASHBOARD]: {
    path: pathes.DASHBOARD,
    permissions: [Permissions.AUTH, Permissions.HAS_METEO],
    label: 'Dashboard',
  },
  [pathes.CO2]: {
    path: pathes.CO2,
    permissions: [Permissions.AUTH, Permissions.HAS_METEO],
    label: 'CO2',
  },
  [pathes.HUMIDITY]: {
    path: pathes.HUMIDITY,
    permissions: [Permissions.AUTH, Permissions.HAS_METEO],
    label: 'Humidity',
  },
  [pathes.TEMPERATURE]: {
    path: pathes.TEMPERATURE,
    permissions: [Permissions.AUTH, Permissions.HAS_METEO],
    label: 'Temperature',
  },
  [pathes.PRESSURE]: {
    path: pathes.PRESSURE,
    permissions: [Permissions.AUTH, Permissions.HAS_METEO],
    label: 'Pressure',
  },
}
