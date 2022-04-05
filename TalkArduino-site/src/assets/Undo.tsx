import React, { FC, ReactElement } from 'react'

type TUndoProps = {
  size?: number
  className?: string
  onClick?: () => void
}

export const Undo: FC<TUndoProps> = ({ size, ...rest }): ReactElement => (
  <svg
    {...rest}
    viewBox="0 0 30 30"
    width={`${size}px`}
    height={`${size}px`}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M15 0C11.328 0 7.757 1.353 4.975 3.649L1.6.274A.938.938 0 000 .938v8.125C0 9.58.42 10 .938 10h8.125a.937.937 0 00.662-1.6L6.751 5.425C9.063 3.584 11.987 2.5 15 2.5c6.893 0 12.5 5.608 12.5 12.5S21.893 27.5 15 27.5a12.413 12.413 0 01-8.836-3.664 1.248 1.248 0 00-1.768 0 1.248 1.248 0 000 1.768A14.897 14.897 0 0015 30c8.271 0 15-6.729 15-15S23.271 0 15 0z" />
  </svg>
)
