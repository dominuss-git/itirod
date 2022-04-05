import React, { FC, ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Navbar, SnackBarContext } from './components'
import { AuthContextProvider } from './contexts'
import { routes } from './routes/routes'
import { Routes } from './routes/Routes'

import './styles/app.scss'

export const App: FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <SnackBarContext>
        <AuthContextProvider>
          <Navbar routes={Object.values(routes)} />
          <Routes />
        </AuthContextProvider>
      </SnackBarContext>
    </BrowserRouter>
  )
}
