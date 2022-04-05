export type TTemperature = {
  lm: number,
  bme: number,
  creation_timestamp: string,
  meteo_station_id: string,
  ISO_date: string,
  dht: number
}

export type THumidity = {
  bme: number,
  creation_timestamp: string,
  meteo_station_id: string,
  ISO_date: string,
  dht: number
}

export type TPressure = {
  bme: number,
  creation_timestamp: string,
  meteo_station_id: string,
  ISO_date: string,
  dht: number
}

export type TCO2 = {
  creation_timestamp: string,
  meteo_station_id: string,
  ISO_date: string,
  mh: number
}

export type TResponse<T> = {
  Items: Array<T>,
  Count: number,
  ScannedCount: number
}

export type TUser = {
  name: string,
  email: string,
  language: 'en' | 'ru',
  dark: boolean,
  meteostations: Array<string>
}

export type TAllSensors = {
  ISO_date: string,
  creation_timestamp: number,
  co2: TCO2,
  humidity: THumidity,
  pressure: TPressure,
  temperature: TTemperature
}

export type TAllSensorsNames = {
  bme?: number
  dht?: number
  lm?: number
  mh?: number
  ISO_date: string
}
