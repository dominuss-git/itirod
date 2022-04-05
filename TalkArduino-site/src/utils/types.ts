export type TPoints = {
  x: number | string
  y: number | string
}

export type TGetDataByResult = {
  bme: Array<TPoints>
  dht: Array<TPoints>
  lm: Array<TPoints>
  mh: Array<TPoints>
}