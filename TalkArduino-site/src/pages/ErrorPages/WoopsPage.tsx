import React, { FC, ReactElement } from 'react'

import { Search } from '../../assets'
import { CenterLayer } from '../../components'

import './styles.scss'

export const WoopsPage: FC = (): ReactElement => {
  return (
    <CenterLayer className="woops">
      <span className="woops__title">Woops...</span>
      <span className="woops__title">Something went wrong</span>
      <Search className="woops__icon" />
    </CenterLayer>
  )
}
