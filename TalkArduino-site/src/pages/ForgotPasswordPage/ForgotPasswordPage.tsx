import { FC, ReactElement, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, Input, useSnack } from '../../components'
import { Method, Url, useRequest } from '../../hooks'

import './styles.scss'

export const ForgotPasswordPage: FC = (): ReactElement => {
  const { request, loading } = useRequest()
  const { addSnack } = useSnack()
  const [nextStep, setNextStep] = useState<boolean>(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ email: string }>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => {
    const { status, body } = await request<any>(Url.FORGOT_PASSWORD, Method.POST, { user: { email } })

    if (status === 200) {
      setNextStep(true);
      addSnack({ title: 'Accept', content: 'Enter a code from your email', level: 'success' })
    }

    if (status >= 400) {
      addSnack({ title: 'Error', content: body.message, level: 'error' })
    }
  }

  useEffect(() => {
    if (errors.email) {
      addSnack({ title: 'Error', content: 'Email is invalid', level: 'error' })
    }
  }, [errors.email])

  return (
    <div className="forgot-form login-form">
      <h2 className="login-form__title">Reset Password</h2>
      <form action="login" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
          className="login-form__input"
          // name="email"
          title="email"
          type="email"
          color="secondary"
          disabled={nextStep}
        />
        { /** TODO: will update */ }
        {nextStep && (
          <>
            <Input
              // {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
              className="login-form__input"
              // name="email"
              title="token"
              type="email"
              color="secondary"
            />
            
          </>
        )}
        <div className="login-form__button-wrapper">
          {/** TODO: can be added later */}
          <Button type="submit" color="secondary" disabled={loading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
