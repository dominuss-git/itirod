import React, { createContext, FC, ReactElement, ReactNode, useEffect, useRef, useState } from 'react'

import { Snack, TSnackLevel } from './Snack'

import './styles.scss'

type Snack = {
  title: string
  content: ReactNode
  level?: TSnackLevel
}
export type TSnackContextProps = {
  snack: Snack[]
  addSnack: (state: Snack) => void
}

export const SnackContext = createContext<TSnackContextProps | null>(null)

export const SnackBarContext: FC = ({ children, ...rest }): ReactElement => {
  const [snack, setSnack] = useState<Snack[]>([])
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  const addSnack = (newSnack: Snack) => {
    setSnack([...snack, newSnack])
  }

  useEffect(() => {
    clearTimeout(timeout.current as NodeJS.Timeout)
    if (snack.length !== 0) {
      timeout.current = setTimeout(() => {
        setSnack([])
      }, 10000)
    }

    return () => clearTimeout(timeout.current as NodeJS.Timeout)
  }, [snack])

  return (
    <SnackContext.Provider
      value={{
        snack,
        addSnack,
      }}
      {...rest}
    >
      {children}
      <div className="snackbar">
        {snack.map(({ title, content, ...rest }, i) => (
          <Snack key={i} title={title} content={content} {...rest} />
        ))}
      </div>
    </SnackContext.Provider>
  )
}
