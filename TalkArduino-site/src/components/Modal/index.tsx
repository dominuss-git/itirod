import React, { FC, ReactElement, ReactNode } from 'react'

import './styles.scss'

type ModalViewProps = {
  children?: ReactNode
  title?: string
  secondary?: boolean
  onClose?: () => void
}

export const Modal: FC<ModalViewProps> = ({ children, title, onClose, secondary, ...rest }): ReactElement => {
  return (
    <div className="modal__overlay">
      <div className={`modal__container modal__${secondary ? 'secondary' : 'primary'}`}>
        <div className="modal__cross" onClick={onClose}>
          &times;
        </div>
        {title ? <h3 className="modal__title">{title}</h3> : null}
        {children ? <div className="modal__content">{children}</div> : null}
      </div>
    </div>
  )
}
