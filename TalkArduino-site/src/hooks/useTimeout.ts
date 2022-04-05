import { useEffect, useRef } from 'react'

type TUseTimeoutProps = {
  callback: () => void
  timeout: number
}

export const useTimeout = ({ callback, timeout }: TUseTimeoutProps) => {
  const refTimeout = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    refTimeout.current = setTimeout(callback, timeout)

    return () => clearTimeout(refTimeout.current as ReturnType<typeof setInterval>)
  }, [])
}
