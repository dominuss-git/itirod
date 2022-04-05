import React, { FC, FormEvent, ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button, CenterLayer, Input, useSnack } from '../../components'
import { useAuthContext } from '../../contexts'
import { Method, Url, useRequest } from '../../hooks'
import { pathes } from '../../routes/pathes'
import { TUser } from '../../types'

import './styles.scss'

type TRegisterEvent = FormEvent<HTMLFormElement> & {
  target: { email: { value: string }; password: { value: string }; name: { value: string } }
}

// TODO: can be implemented later
export const RegisterPage: FC = (): ReactElement => {
  const { request, loading } = useRequest()
  const { setCredentials } = useAuthContext()
  const { addSnack } = useSnack()
  const location = useLocation()
  const navigate = useNavigate()

  const onLogin = async (e: TRegisterEvent) => {
    e.preventDefault()

    const data = await request<{ user: TUser; accessToken: string; refreshToken: string }>(Url.REGISTER, Method.POST, {
      user: {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      },
    })

    // if (status === 201) {
    //   setCredentials({ accessToken: body.accessToken, refreshToken: body.refreshToken })
    //   addNewSnack({ title: 'Hello', content: body.user.name, info: true })
    //   navigate(pathes.DASHBOARD, { state: location })
    // }

    // // TODO: can be 4xx
    // if (status >= 500) {
    //   addNewSnack({ title: 'Error', content: body.message, error: true })
    // }
  }

  return (
    <div className="home">
      <CenterLayer>
        <div className="login-form">
          <h2 className="login-form__title">Registraition</h2>
          <form action="login" className="login-form__form" onSubmit={onLogin}>
            <Input name="name" title="name" type="text" color="secondary" />
            <Input className="login-form__input" name="email" title="email" type="email" color="secondary" />
            <Input className="login-form__input" name="password" title="password" type="password" color="secondary" />
            <div className="login-form__button-wrapper">
              {/* <Button disabled={loading}>
            Forgot Password
          </Button> */}
              <Button type="submit" color="secondary" disabled={loading}>
                Register
              </Button>
            </div>
          </form>
        </div>
      </CenterLayer>
    </div>
  )
}
