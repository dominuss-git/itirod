import { TAllSensorsNames } from '../types'
import { TGetDataByResult } from './types'

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export const getDataByYear = (data: Array<TAllSensorsNames>) => {
  let now = new Date()

  let val = data[0]

  let group_count = 1
  let mounth = new Date(val.ISO_date).getMonth()

  let bme = val.bme ? val.bme : 0
  let dht = val.dht ? val.dht : 0
  let lm = val.lm ? val.lm : 0
  let mh = val.mh ? val.mh : 0

  const result = { bme: [], dht: [], lm: [], mh: [] } as TGetDataByResult

  for (let i = 1; true; i++) {
    const val = data[i]
    const date = new Date(val.ISO_date)

    if (date.getMonth() !== mounth) {
      result.bme.push({ y: (bme / group_count).toFixed(2), x: monthNames[mounth] })
      result.lm.push({ y: (lm / group_count).toFixed(2), x: monthNames[mounth] })
      result.dht.push({ y: (dht / group_count).toFixed(2), x: monthNames[mounth] })
      result.mh.push({ y: (mh / group_count).toFixed(2), x: monthNames[mounth] })

      bme = 0
      dht = 0
      lm = 0
      mh = 0

      mounth = date.getMonth()

      group_count = 0
    }

    if (date.getFullYear() !== now.getFullYear()) {
      break
    }

    if (i >= data.length - 1) {
      result.bme.push({ y: (bme / group_count).toFixed(2), x: monthNames[mounth] })
      result.lm.push({ y: (lm / group_count).toFixed(2), x: monthNames[mounth] })
      result.dht.push({ y: (dht / group_count).toFixed(2), x: monthNames[mounth] })
      result.mh.push({ y: (mh / group_count).toFixed(2), x: monthNames[mounth] })

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
