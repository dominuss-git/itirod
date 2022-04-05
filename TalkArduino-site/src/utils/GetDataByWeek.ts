import { TAllSensorsNames } from '../types'
import { TGetDataByResult } from './types'

const weekDays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

export const getDataByWeek = (data: Array<TAllSensorsNames>) => {
  let last_day = new Date().getDay()

  let val = data[0]

  let group_count = 1
  // let day = new Date(val.ISO_date).getDate()

  let bme = val.bme ? val.bme : 0
  let dht = val.dht ? val.dht : 0
  let lm = val.lm ? val.lm : 0
  let mh = val.mh ? val.mh : 0

  const result = { bme: [], dht: [], lm: [], mh: [] } as TGetDataByResult

  for (let i = 1; true; i++) {
    const val = data[i]
    const date = new Date(val.ISO_date)

    if (last_day < date.getDay()) {
      // TODO: NEED fix
      // result.bme.push({ y: (bme / group_count).toFixed(2), x: weekDays[last_day] })
      // result.lm.push({ y: (lm / group_count).toFixed(2), x: weekDays[last_day] })
      // result.dht.push({ y: (dht / group_count).toFixed(2), x: weekDays[last_day] })
      // result.mh.push({ y: (mh / group_count).toFixed(2), x: weekDays[last_day] })
      
      break
    }

    if (date.getDay() !== last_day) {
      result.bme.push({ y: (bme / group_count).toFixed(2), x: weekDays[date.getDay()] })
      result.lm.push({ y: (lm / group_count).toFixed(2), x: weekDays[date.getDay()] })
      result.dht.push({ y: (dht / group_count).toFixed(2), x: weekDays[date.getDay()] })
      result.mh.push({ y: (mh / group_count).toFixed(2), x: weekDays[date.getDay()] })

      bme = 0
      dht = 0
      lm = 0
      mh = 0

      // day = date.getDate()
      group_count = 0
      last_day = date.getDay()
    }

    if (i >= data.length - 1) {
      result.bme.push({ y: (bme / group_count).toFixed(2), x: weekDays[date.getDay()] })
      result.lm.push({ y: (lm / group_count).toFixed(2), x: weekDays[date.getDay()] })
      result.dht.push({ y: (dht / group_count).toFixed(2), x: weekDays[date.getDay()] })
      result.mh.push({ y: (mh / group_count).toFixed(2), x: weekDays[date.getDay()] })

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
