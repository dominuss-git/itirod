import React, { FC, ReactElement } from 'react'

type TColor = 'dark' | 'light' | 'plain' | 'white'
type TLoaderProps = {
  type?: TColor
}

export const Loader: FC<TLoaderProps> = ({ type = 'light' }): ReactElement => {
  return (
    <div className={`loader__wrapper loader__wrapper_${type}`}>
      <div className={`loader loader_${type}`}></div>
    </div>
  )
}
