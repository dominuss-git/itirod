import React, { FC, ReactElement, useMemo } from 'react'
import Dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import './format.scss'

Dayjs.extend(localizedFormat)
Dayjs.extend(calendar)
Dayjs.extend(relativeTime)

interface IDate {
  type: 'dateTime' | 'time' | 'timeAgo' | 'date'
  value: string
  currency?: never
  showCents?: never
  currencyDisplay?: never
}
interface INumber {
  type: 'decimal' | 'percent'
  value: number
  currency?: never
  showCents?: never
  currencyDisplay?: never
}
type ValueProps = IDate | INumber
interface CommonProps {
  locale?: string //'en' | 'da' | 'de' | 'sv' | 'nb' | 'fi' | 'fr';
}
export type IFormat = ValueProps & CommonProps

export const Format: FC<IFormat> = ({ type, value, locale = 'en' }): ReactElement => {
  // Check value before its converted by .toLocaleString
  const formattedValue = useMemo(() => {
    const newValue = typeof value === 'number' && !Number.isNaN(value) ? value : 0
    return newValue
  }, [value, type])

  // Customise how dates are shown for type: date
  const dateStrings = {
    sameDay: 'll', // The same day ( Today )
    nextDay: 'll', // The next day ( Tomorrow )
    nextWeek: 'll', // The next week ( Jan. 1st, 2011 )
    lastDay: 'll', // The day before ( Yesterday )
    lastWeek: 'll', // Last week ( Jan. 1st, 2011 )
    sameElse: 'll', // Everything else ( Jan. 1st, 2011 )
  }

  // Customise how dates are shown in tooltips
  const dateTimeStrings = {
    sameDay: 'll [at] LT', // The same day ( Today )
    nextDay: 'll [at] LT', // The next day ( Tomorrow )
    nextWeek: 'll [at] LT', // The next week ( Jan. 1st, 2011 )
    lastDay: 'll [at] LT', // The day before ( Yesterday )
    lastWeek: 'll [at] LT', // Last week ( Jan. 1st, 2011 )
    sameElse: 'll [at] LT', // Everything else ( Jan. 1st, 2011 )
  }

  // Return formatted value based on Format type
  const renderFormattedValue = () => {
    if (formattedValue === undefined) return null
    switch (type) {
      case 'dateTime': {
        if (!value) return null
        const time = Dayjs(value).locale(locale).calendar(null, dateTimeStrings).toString()
        return <time>{time}</time>
      }
      case 'time': {
        if (!value) return null
        const time = Dayjs(value).locale(locale).format('LT').toString()
        return <time>{time}</time>
      }
      case 'timeAgo': {
        if (!value) return null
        const timeAgo = Dayjs(value).locale(locale).fromNow().toString().replace('an ', '1 ')

        return <time>{timeAgo}</time>
      }
      case 'date': {
        if (!value) return null
        const time = Dayjs(value).locale(locale).calendar(null, dateStrings).toString()
        return <time>{time}</time>
      }
      default:
        const _exhaustiveCheck = type
        return _exhaustiveCheck
    }
  }

  return <span>{renderFormattedValue()}</span>
}
