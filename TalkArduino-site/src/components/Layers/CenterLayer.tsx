import React, { FC, ReactElement } from 'react'

import './styles.scss'

export const CenterLayer: FC<{ className?: string }> = ({ children, className }): ReactElement => {
  return <div className={[className, 'layer__center'].join(' ')}>{children}</div>
}
