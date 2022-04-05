import React, { FC, ReactElement } from 'react'

import './styles.scss'

export const Logo: FC<{ className?: string, onClick?: () => void }> = ({ className, ...rest }): ReactElement => <img src={require('./logo.png')} {...rest} className={`${className} logo`} />
