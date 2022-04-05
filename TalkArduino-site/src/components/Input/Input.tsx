import React, { FC, forwardRef, InputHTMLAttributes, ReactElement } from 'react'
import { InputType } from 'zlib'

import './styles.scss'

type TColor = 'secondary-light' | 'secondary' | 'primary' | 'primary-light'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<any> & { color?: TColor }>(({
  title,
  color = 'primary',
  className,
  ...rest
}, ref): ReactElement => {
  return (
    <div className={[`input__wrapper input__${color}`, className].join(' ')}>
      <label className="input__title">{title}</label>
      <input ref={ref} className={`input`} {...rest} />
    </div>
  )
})
