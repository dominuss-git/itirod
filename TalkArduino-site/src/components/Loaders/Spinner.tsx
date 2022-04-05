import React, { FC, ReactElement } from 'react'

import './styles.scss'

type TColor = 'dark' | 'light'

type TLoaderProps = {
  type?: TColor
  className?: string
}

export const Spinner: FC<TLoaderProps> = ({ type = 'light', className }): ReactElement => (
  <div className={[`spinner spinner__${type}`, className].join(' ')}></div>
)
