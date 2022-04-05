import React, { FC, ReactElement } from 'react'
import { Route, Routes as Switch } from 'react-router-dom'

import {
  TemperaturePage,
  Co2Page,
  ComponentsPage,
  HumidityPage,
  PressurePage,
  DashboardPage,
  LoginPage,
  RegisterPage,
  HomePage,
  NotFoundPage,
  ForgotPasswordPage,
  WoopsPage,
} from '../pages'
import { pathes } from './pathes'
import { ProtectedRoute } from './ProtectedRoute'
import { CenterLayer, HorizontalCenterLayer } from '../components'

export const Routes: FC = (): ReactElement => {
  return (
    <Switch>
      <Route
        path={pathes.DASHBOARD}
        element={
          <ProtectedRoute path={pathes.DASHBOARD}>
            <CenterLayer>
              <DashboardPage />
            </CenterLayer>
          </ProtectedRoute>
        }
      />
      <Route
        path={pathes.TEMPERATURE}
        element={
          <ProtectedRoute path={pathes.TEMPERATURE}>
            <TemperaturePage />
          </ProtectedRoute>
        }
      />
      {/** TODO: should be deprecated later */}
      <Route
        path={'/components'}
        element={
          <CenterLayer>
            <ComponentsPage />
          </CenterLayer>
        }
      />
      <Route
        path={pathes.PRESSURE}
        element={
          <ProtectedRoute path={pathes.PRESSURE}>
            <PressurePage />
          </ProtectedRoute>
        }
      />
      <Route
        path={pathes.HUMIDITY}
        element={
          <ProtectedRoute path={pathes.HUMIDITY}>
            <HumidityPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={pathes.CO2}
        element={
          <ProtectedRoute path={pathes.CO2}>
            <Co2Page />
          </ProtectedRoute>
        }
      />
      <Route
        path={pathes.LOGIN}
        element={
          <CenterLayer>
            <LoginPage />
          </CenterLayer>
        }
      />
      <Route
        path={pathes.FORGOT_PASSWORD}
        element={
          <CenterLayer>
            <ForgotPasswordPage />
          </CenterLayer>
        }
      />
      <Route
        path={pathes.REGISTER}
        element={
          <CenterLayer>
            <RegisterPage />
          </CenterLayer>
        }
      />
      <Route
        path={pathes.HOME}
        element={
          <HorizontalCenterLayer>
            <HomePage />
          </HorizontalCenterLayer>
        }
      />
      <Route
        path="/woops"
        element={
          <CenterLayer>
            <WoopsPage />
          </CenterLayer>
        }
      />
      {/** Should be last of routes list */}
      <Route
        path="*"
        element={
          <CenterLayer>
            <NotFoundPage />
          </CenterLayer>
        }
      />
    </Switch>
  )
}
