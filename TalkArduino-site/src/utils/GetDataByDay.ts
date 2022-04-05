import { TAllSensorsNames } from '../types'
import { TGetDataByResult } from './types'

export const getDataByDate = (data: Array<TAllSensorsNames>): TGetDataByResult => {
  let now = new Date()

  let val = data[0]

  let group_count = 1
  let hour = new Date(val.ISO_date).getHours()

  let bme = val.bme ? val.bme : 0
  let dht = val.dht ? val.dht : 0
  let lm = val.lm ? val.lm : 0
  let mh = val.mh ? val.mh : 0

  const result = { bme: [], dht: [], lm: [], mh: [] } as TGetDataByResult

  for (let i = 1; i < data.length; i++) {
    const val = data[i]
    const date = new Date(val.ISO_date)

    if (date.getHours() !== hour) {
      result.bme.push({ y: (bme / group_count).toFixed(2), x: hour })
      result.lm.push({ y: (lm / group_count).toFixed(2), x: hour })
      result.dht.push({ y: (dht / group_count).toFixed(2), x: hour })
      result.mh.push({ y: (mh / group_count).toFixed(2), x: hour })

      bme = 0
      dht = 0
      lm = 0
      mh = 0

      hour = date.getHours()
      group_count = 0
    }

    if (date.getDate() !== now.getDate()) {
      break
    }

    bme += val.bme ? val.bme : 0
    dht += val.dht ? val.dht : 0
    lm += val.lm ? val.lm : 0
    mh += val.mh ? val.mh : 0
    group_count++
  }

  return {
    bme: result.bme.reverse(),
    lm: result.lm.reverse(),
    dht: result.dht.reverse(),
    mh: result.mh.reverse(),
  }
}
