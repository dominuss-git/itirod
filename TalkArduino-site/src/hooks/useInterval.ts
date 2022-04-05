import { useEffect, useRef } from "react"

type TUseIntervalProps = {
  callback: () => void
  timeout: number
}

export const useInterval = ({ callback, timeout }: TUseIntervalProps) => {
  const refTimeout = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    refTimeout.current = setInterval(callback, timeout)

    return () => clearInterval(refTimeout.current as ReturnType<typeof setInterval>)
  }, [])
}