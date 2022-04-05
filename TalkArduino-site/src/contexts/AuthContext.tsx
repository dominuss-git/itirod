import React, { createContext, FC, ReactElement, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Method, TRequestResult, Url } from '../hooks'
import { Permissions } from '../routes/routes'
import { TUser } from '../types'

const AuthContext = createContext<any>(null)

export const enum StorageNames {
  ACCESS = 'access_token',
  REFRESH = 'refresh_token',
}
type TTokens = {
  access_token: string
  refresh_token: string
}

type TSetCredentialsProps = {
  user: TUser
} & TTokens

async function request<T>(
  url: Url,
  method: Method = Method.GET,
  body: any = null,
  headers: { [key: string]: string } = {}
): Promise<TRequestResult<T>> {
  // const navigate = useNavigate()
  // const location = useLocation()

  if (body && method !== Method.GET) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(body)
  }

  const response = await fetch(url, {
    method,
    body,
    headers,
  })

  if (response.status >= 500) {
    // TODO: ?
    // navigate('/woops', { state: location })
  }

  const data = {
    body: await response.json(),
    status: response.status,
  }

  return data
}

export const AuthContextProvider: FC = (props): ReactElement => {
  const [tokens, setTokens] = useState<TTokens | undefined>()
  const [user, setUser] = useState<TUser>()
  const [ready, setReady] = useState<boolean>(false)
  const [permissions, setPermissions] = useState<Array<Permissions>>([])

  const setCredentials = ({ access_token, refresh_token, user }: TSetCredentialsProps) => {
    setReady(false)
    sessionStorage.setItem(StorageNames.REFRESH, refresh_token)
    setTokens({
      [StorageNames.ACCESS]: access_token,
      [StorageNames.REFRESH]: refresh_token,
    })
    setUser(user)
    if (user.meteostations.length !== 0) {
      setPermissions([Permissions.AUTH, Permissions.HAS_METEO])
      return
    }
    setPermissions([Permissions.AUTH])
    setReady(true)
  }

  const getNewAccessToken = async (refresh_token: string) => {
    setReady(false)
    const { body, status } = await request<{ user: TUser } & TTokens>(Url.UPDATE_TOKENS, Method.POST, {
      refresh_token,
    })

    // TODO: want to will test it
    if (status === 401) {
      unsetCredentials()
    }
    if (status === 200) {
      sessionStorage.setItem(StorageNames.REFRESH, body.refresh_token)
      setTokens({
        [StorageNames.ACCESS]: body.access_token,
        [StorageNames.REFRESH]: body.refresh_token,
      })
      setUser(body.user)
      if (body.user.meteostations.length !== 0) {
        setPermissions([Permissions.AUTH, Permissions.HAS_METEO])
        setReady(true)
        return
      }
      setPermissions([Permissions.AUTH])
      setReady(true)
    }
  }

  const unsetCredentials = () => {
    setPermissions([])
    sessionStorage.removeItem(StorageNames.REFRESH)
    setTokens(undefined)
  }

  useEffect(() => {
    const refreshToken = sessionStorage.getItem(StorageNames.REFRESH)

    if (refreshToken) {
      getNewAccessToken(refreshToken)
    } else {
      setReady(true)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        tokens,
        ready,
        user,
        setCredentials,
        unsetCredentials,
        getNewAccessToken,
        permissions,
      }}
      {...props}
    />
  )
}

export const useAuthContext = (): {
  tokens?: TTokens
  ready: boolean
  user?: TUser
  permissions: Array<Permissions>
  unsetCredentials: () => void
  setCredentials: (props: TSetCredentialsProps) => void
  getNewAccessToken: (refresh_token: string) => void
} => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthContextProvider')
  }
  return context
}
