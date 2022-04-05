import React, { FC, ReactElement, ReactNode, useCallback, useState } from 'react'

import { useTimeout } from '../../hooks'

import './styles.scss'

export type TSnackLevel = 'info' | 'error' | 'success'
export type TSnackProps = {
  title: string
  content: ReactNode
  level?: TSnackLevel
}

export const Snack: FC<TSnackProps> = ({ title, content, level = 'success' }): ReactElement => {
  const [visible, setVisible] = useState<boolean>(true)
  const classNames = [`snack snack__${level}`, !visible ? 'snack__hide' : undefined]
  useTimeout({ callback: useCallback(() => setVisible(false), []), timeout: 3000 })

  return (
    <div className={classNames.join(' ')}>
      <div className="snack__title">{title}</div>
      <div className="snack__content">{content}</div>
    </div>
  )
}
