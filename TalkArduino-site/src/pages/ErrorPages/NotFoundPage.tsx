import React, { FC, ReactElement } from 'react'

import { Search } from '../../assets'
import { CenterLayer } from '../../components'

import './styles.scss'

export const NotFoundPage: FC = (): ReactElement => {
  return (
    <CenterLayer className="not-found">
      <span className="not-found__title">404 Not Found</span>
      <Search className="not-found__icon" />
    </CenterLayer>
  )
}
