import { useContext } from 'react'

import { SnackContext, TSnackContextProps } from './SnackBar'

export const useSnack = (): TSnackContextProps => {
  const snackContext = useContext(SnackContext)

  if (!snackContext) {
    throw new Error('useSnack must be used within a SnackContext')
  }

  return snackContext
}
