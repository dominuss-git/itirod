import React, { ButtonHTMLAttributes, FC, ReactElement } from 'react'

import { MenuButton } from './MenuButton'
import { Button as Bt } from './Button'

export type TButtonType = 'light' | 'secondary' | 'warning' | 'primary' | 'plain'
export type TButtonProps = {
  color?: TButtonType
  menu?: boolean
  className?: string
  active?: boolean
}

export const Button: FC<TButtonProps & ButtonHTMLAttributes<HTMLFormElement>> = ({
  menu,
  className,
  ...rest
}): ReactElement => {
  if (menu) {
    return <MenuButton className={className} {...rest} />
  }

  return <Bt className={className} {...rest} />
}
