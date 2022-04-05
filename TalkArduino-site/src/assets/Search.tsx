import React, { FC, ReactElement } from 'react'

type TSearchProps = {
  size?: number
  className?: string
}

export const Search: FC<TSearchProps> = ({ size = 30, className }): ReactElement => (
  <svg
    className={className}
    viewBox="0 0 30 30"
    width={`${size}px`}
    height={`${size}px`}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M29.6 27.672l-7.738-7.739a12.22 12.22 0 002.683-7.66C24.545 5.495 19.051 0 12.273 0 5.495 0 0 5.495 0 12.273s5.495 12.272 12.273 12.272a12.22 12.22 0 007.66-2.684l7.74 7.74a1.364 1.364 0 001.929-1.928H29.6zm-17.327-5.854a9.545 9.545 0 01-9.546-9.545 9.545 9.545 0 019.546-9.546 9.545 9.545 0 019.545 9.546 9.545 9.545 0 01-9.545 9.545z" />
  </svg>
)
