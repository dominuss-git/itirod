import React, { FC, ReactElement, useState } from 'react'

import './styles.scss'

type TTogleProps = {
  onChange: (event: any) => void
  checked: boolean
}

export const Toggle: FC<TTogleProps> = ({ checked, ...rest }): ReactElement => {
  const [state, setState] = useState<boolean>(checked);

  return (
    <label className="toggle">
      <input checked={state} onClick={() => setState(!state)} {...rest} className="toggle__checkbox" type="checkbox" />
      <span className="toggle__slider toggle__round"></span>
    </label>
  )
}