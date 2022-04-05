import React, { FC, ReactElement } from 'react'

import { TButtonType } from '.'

import './styles.scss'

export type TButtonProps = {
  color?: TButtonType
  className?: string
  active?: boolean
}

export const Button: FC<TButtonProps> = ({ children, color = 'primary', className, active, ...rest }): ReactElement => {
  const classNames = [className, 'button', `button__${color}`, active ? 'active' : null]

  return (
    <button className={classNames.join(' ')} {...rest}>
      {children}
    </button>
  )
}
