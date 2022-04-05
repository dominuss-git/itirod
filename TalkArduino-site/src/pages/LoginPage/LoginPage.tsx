import React, { FC, ReactElement } from 'react'

import { CenterLayer } from '../../components'
import { LoginForm } from './LoginForm'

export const LoginPage: FC = (): ReactElement => {
  return (
    <div className="home">
      <CenterLayer>
        <LoginForm />
      </CenterLayer>
    </div>
  )
}
