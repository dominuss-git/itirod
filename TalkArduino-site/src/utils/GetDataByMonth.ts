import { TAllSensorsNames } from '../types'
import { TGetDataByResult } from './types'

export const getDataByMonth = (data: Array<TAllSensorsNames>) => {
  let now = new Date()

  let val = data[0]

  let group_count = 1
  let day = new Date(val.ISO_date).getDate()

  let bme = val.bme ? val.bme : 0
  let dht = val.dht ? val.dht : 0
  let lm = val.lm ? val.lm : 0
  let mh = val.mh ? val.mh : 0

  const result = { bme: [], dht: [], lm: [], mh: [] } as TGetDataByResult

  for (let i = 1; true; i++) {
    const val = data[i]
    const date = new Date(val.ISO_date)

    if (date.getDate() !== day) {
      result.bme.push({ y: (bme / group_count).toFixed(2), x: day })
      result.lm.push({ y: (lm / group_count).toFixed(2), x: day })
      result.dht.push({ y: (dht / group_count).toFixed(2), x: day })
      result.mh.push({ y: (mh / group_count).toFixed(2), x: day })

      bme = 0
      dht = 0
      lm = 0
      mh = 0

      day = date.getDate()
      group_count = 0
    }

    if (date.getMonth() !== now.getMonth()) {
      break
    }

    if (i >= data.length - 1) {
      result.bme.push({ y: (bme / group_count).toFixed(2), x: day })
      result.lm.push({ y: (lm / group_count).toFixed(2), x: day })
      result.dht.push({ y: (dht / group_count).toFixed(2), x: day })
      result.mh.push({ y: (mh / group_count).toFixed(2), x: day })

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
