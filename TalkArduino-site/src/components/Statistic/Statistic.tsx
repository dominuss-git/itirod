import React, { ReactElement, FC, MouseEventHandler } from 'react'

import { Loader } from '../Loaders'

import './styles.scss'

type TColor = 'good' | 'warning' | 'danger' | 'disabled'
export interface IStatisticProps {
  title?: string
  description?: string
  onClick?: MouseEventHandler
  color?: TColor
  value?: string | number
  loading?: boolean
  className?: string
}

export const Statistic: FC<IStatisticProps> = ({
  title,
  description,
  color = 'disabled',
  value,
  onClick,
  className,
  loading = false,
}): ReactElement => (
  <button className={['card', className].join(' ')} onClick={onClick}>
    <div className={`card__indicator card__indicator_${color}`}>&nbsp;</div>
    <div className="text__wrapper">
      <div className="title">{loading ? <Loader type="plain" /> : title}</div>
      <div className="description">{loading ? <Loader type="plain" /> : description}</div>
    </div>

    <div className="value__wrapper">
      <div className={`value value_${color}`}>{loading ? <Loader type="plain" /> : value}</div>
    </div>
  </button>
)
