import React, { FC, ReactElement, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, Input, useSnack } from '../../../components'
import { useAuthContext } from '../../../contexts'
import { Method, Url, useRequest } from '../../../hooks'
import { pathes } from '../../../routes/pathes'
import { TUser } from '../../../types'

import './styles.scss'

type TLoginData = { email: string; password: string }

export const LoginForm: FC = (): ReactElement => {
  const { request, loading } = useRequest()
  const { setCredentials } = useAuthContext()
  const { addSnack } = useSnack()
  const location = useLocation()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TLoginData>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const onLogin: SubmitHandler<TLoginData> = async ({ email, password }) => {
    // e.preventDefault()

    const { status, body } = await request<{ user: TUser; accessToken: string; refreshToken: string }>(
      Url.LOGIN,
      Method.POST,
      {
        user: {
          email: email,
          password: password,
        },
      }
    )

    if (status === 200) {
      setCredentials({ access_token: body.accessToken, refresh_token: body.refreshToken, user: body.user })
      addSnack({ title: 'Hello', content: body.user.name, level: 'info' })
      navigate(pathes.DASHBOARD, { state: location })
    }

    if (status >= 400) {
      addSnack({ title: 'Error', content: body.message, level: 'error' })
    }
  }

  useEffect(() => {
    if (errors.email) {
      addSnack({ title: 'Error', content: 'Email is invalid', level: 'error' })
    }

    if (errors.password) {
      if (errors.password.type === 'required') {
        addSnack({ title: 'Error', content: 'Password is required', level: 'error' })
      }
      if (errors.password.type === 'minLength') {
        addSnack({ title: 'Error', content: 'Password should be more 6 symbols', level: 'error' })
      }
    }
  }, [errors.email, errors.password])

  return (
    <div className="login-form">
      <h2 className="login-form__title">Login</h2>
      <form action="login" onSubmit={handleSubmit(onLogin)}>
        <Input
          {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
          className="login-form__input"
          // name="email"
          title="email"
          type="email"
          color="secondary"
        />
        <Input
          className="login-form__input"
          {...register('password', { required: true, minLength: 6 })}
          title="password"
          // name='password'
          type="password"
          color="secondary"
        />
        <div className="login-form__button-wrapper">
          <Button
            onClick={() => navigate(pathes.FORGOT_PASSWORD, { state: location })}
            className="login-form__button"
            disabled={loading}
            color="plain"
          >
            Forgot Password
          </Button>
          <Button type="submit" color="secondary" disabled={loading}>
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}
