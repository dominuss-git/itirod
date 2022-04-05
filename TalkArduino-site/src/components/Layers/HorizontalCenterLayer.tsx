import React, { FC, ReactElement } from 'react'

import './styles.scss'

export const HorizontalCenterLayer: FC<{ className?: string }> = ({ children, className }): ReactElement => {
  return <div className={[className, 'layer__horizontal_center'].join(' ')}>{children}</div>
}
