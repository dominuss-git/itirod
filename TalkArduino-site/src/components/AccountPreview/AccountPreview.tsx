import { FC, ReactElement, useEffect, useState } from 'react'
import { CloseIcon } from '../../assets'
import { useAuthContext } from '../../contexts'
import { Input } from '../Input'
import { Toggle } from '../Toggle'

import './styles.scss'

type TAccountPreviewProps = {
  show: boolean | null
  setShow: (state: boolean) => void
}

type TSettings = {
  language: 'en' | 'ru'
  dark: boolean
}

export const AccountPreview: FC<TAccountPreviewProps> = ({ show, setShow }): ReactElement => {
  const { user } = useAuthContext()

  // TODO: can be deprecated
  const [settings, setSettings] = useState<TSettings>({
    language: 'en',
    dark: false,
  })

  return (
    <>
      <div
        className={['overlay', show === null ? undefined : show ? 'overlay__active' : 'overlay__disable'].join(' ')}
        onClick={() => setShow(false)}
      ></div>
      <div className={['preview', show === null ? undefined : show ? 'preview__active' : 'preview__disable'].join(' ')}>
        <CloseIcon className="preview__close" onClick={() => setShow(!show)} />
        <div className="preview__info">
          <Input title="Email" type="email" color="secondary" defaultValue={user?.email} disabled />
          <div className="preview__tab-wrapper">
            <span>Dark mode</span>
            <Toggle checked={settings.dark} onChange={(e) => setSettings({ ...settings, dark: e.target.checked })} />
          </div>
          <div className="preview__tab-wrapper">
            <span>Language</span>
            <div className="preview__tab-wrapper_language">
              <span>ru</span>
              <Toggle
                checked={settings.language === 'ru' ? false : true}
                onChange={(e) => setSettings({ ...settings, language: e.target.checked ? 'en' : 'ru' })}
              />
              <span>en</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

{
}
