import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../contexts'
import { Permissions } from '../routes/routes'
import { checkPermissions } from '../utils'

export const enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

export const enum Url {
  BASE = '/',

  ALL = 'https://7n5j01b8vd.execute-api.us-west-2.amazonaws.com/dev/query?special_data=all',
  TEMPERATURE = 'https://7n5j01b8vd.execute-api.us-west-2.amazonaws.com/dev/query?table_name=temperature',
  HUMIDITY = 'https://7n5j01b8vd.execute-api.us-west-2.amazonaws.com/dev/query?table_name=humidity',
  PRESSURE = 'https://7n5j01b8vd.execute-api.us-west-2.amazonaws.com/dev/query?table_name=pressure',
  CO2 = 'https://7n5j01b8vd.execute-api.us-west-2.amazonaws.com/dev/query?table_name=co2',

  REGISTER = 'https://7n5j01b8vd.execute-api.us-west-2.amazonaws.com/dev/register-user',
  LOGIN = 'https://7n5j01b8vd.execute-api.us-west-2.amazonaws.com/dev/login-user',
  FORGOT_PASSWORD = 'https://7n5j01b8vd.execute-api.us-west-2.amazonaws.com/dev/forgot-password',
  UPDATE_TOKENS = 'https://7n5j01b8vd.execute-api.us-west-2.amazonaws.com/dev/update-token?getRefreshAlso=true',
}

export type TRequestResult<T> = {
  status: number
  body: T & { message: string }
}

export const useRequest = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { tokens, getNewAccessToken, user, permissions } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  const request = async <T>(
    url: Url,
    method: Method = Method.GET,
    body: any = null,
    headers: { [key: string]: string } = {}
  ): Promise<TRequestResult<T>> => {
    setLoading(true)

    if (body && method !== Method.GET) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(body)
    }

    let uri = url as string

    switch (url) {
      case Url.REGISTER:
      case Url.LOGIN:
      case Url.REGISTER:
      case Url.FORGOT_PASSWORD:
        break
      default:
        headers['Authorization'] = `Bearer ${tokens!.access_token}`
        if (
          checkPermissions([Permissions.HAS_METEO], permissions) &&
          user?.meteostations &&
          user.meteostations.length > 0
        ) {
          uri += `&meteo_station_id=${user.meteostations[0]}`
        }
    }

    const response = await fetch(uri, {
      method,
      body,
      headers,
    })

    if (response.status >= 500) {
      navigate('/woops', { state: location })
    }
    if (tokens?.refresh_token && response.status === 401) {
      getNewAccessToken(tokens.refresh_token)
    }

    const data = {
      body: await response.json(),
      status: response.status,
    }

    setLoading(false)

    return data
  }

  return { request, loading }
}
