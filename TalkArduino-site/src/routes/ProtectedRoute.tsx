import React, { FC, ReactElement, useCallback, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { CenterLayer, Spinner } from '../components'
import { useAuthContext } from '../contexts'
import { checkPermissions } from '../utils'
import { pathes } from './pathes'
import { routes } from './routes'

export const ProtectedRoute: FC<{ path: string }> = ({ children, path }): ReactElement => {
  const { permissions, ready } = useAuthContext()

  const renderRoute = useCallback((): ReactElement => {
    if (checkPermissions(routes[path].permissions, permissions)) {
      return <>{children}</>
    }
    if (ready) {
      return <Navigate to={pathes.HOME} />
    }
    return (
      <CenterLayer>
        <Spinner type='dark'/>
      </CenterLayer>
    )
  }, [ready, permissions, children])

  return <>{renderRoute()}</>
}
