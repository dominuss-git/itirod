import React, { FC, ReactElement, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AccountPreview } from '../AccountPreview'
import { CloseIcon, Logo, MenuIcon, Accout } from '../../assets'
import { Permissions, TRoute } from '../../routes/routes'
import { Button } from '../'
import { pathes } from '../../routes/pathes'
import { useAuthContext } from '../../contexts'
import { checkPermissions } from '../../utils'

import './styles.scss'

type NavbarProps = {
  routes: Array<TRoute>
}

export const Navbar: FC<NavbarProps> = ({ routes }): ReactElement | null => {
  const [show, setShow] = useState<boolean | null>(null)
  const [showAccout, setAccountShow] = useState<boolean | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { permissions, unsetCredentials, ready } = useAuthContext()


  useEffect(() => {
    console.log(ready);
  }, [ready])
  
  if (!ready) {
    return null
  }

  return (
    <header className="navbar">
      <div className="navbar__logo-wrapper">
        <Logo className="navbar__logo-icon" />
        <MenuIcon className="navbar__menu-icon" onClick={() => setShow(!show)} />
        <span className="navbar__title">TalkArduino</span>
      </div>
      {permissions.includes(Permissions.AUTH) ? (
        <div className="navbar__button-wrapper">
          <Button color="plain" className="navbar__account" onClick={() => setAccountShow(true)}>
            <Accout size={30} />
          </Button>
          <Button color="plain" className="navbar__button" onClick={unsetCredentials}>
            Log out
          </Button>
        </div>
      ) : (
        <div className="navbar__button-wrapper">
          <Button color="plain" className="navbar__button" onClick={() => navigate(pathes.LOGIN, { state: location })}>
            Log in
          </Button>
          <span className="navbar__button">/</span>
          <Button
            color="plain"
            className="navbar__button"
            onClick={() => navigate(pathes.REGISTER, { state: location })}
          >
            Register
          </Button>
        </div>
      )}
      <div className="navbar__pages">
        {routes.map((route) => {
          if (checkPermissions(route.permissions, permissions)) {
            return (
              <div key={route.path + 'nav'}>
                <Button
                  menu
                  color="secondary"
                  onClick={() => navigate(route.path, { state: location })}
                  active={location.pathname === route.path}
                >
                  {route.label}
                </Button>
              </div>
            )
          }
        })}
      </div>
      <>
        <div
          className={['overlay', show === null ? undefined : show ? 'overlay__active' : 'overlay__disable'].join(' ')}
          onClick={() => setShow(false)}
        ></div>
        <nav className={['menu', show === null ? undefined : show ? 'menu__active' : 'menu__disable'].join(' ')}>
          <CloseIcon className="menu__close" onClick={() => setShow(!show)} />
          {show && (
            <ul>
              {routes.map((route) => {
                if (checkPermissions(route.permissions, permissions)) {
                  return (
                    <li key={route.path + 'menu'}>
                      <Button
                        className="menu__button"
                        color="secondary"
                        onClick={() => {
                          navigate(route.path, { state: location })
                          setShow(false)
                        }}
                        active={location.pathname === route.path}
                      >
                        {route.label}
                      </Button>
                    </li>
                  )
                }
              })}
            </ul>
          )}
          {show &&
            (permissions.includes(Permissions.AUTH) ? (
              <div>
                <Button color="plain" className="menu__button_bottom" onClick={unsetCredentials}>
                  Log out
                </Button>
              </div>
            ) : (
              <ul>
                <li>
                  <Button
                    color="plain"
                    className="menu__button_bottom"
                    onClick={() => {
                      setShow(false)
                      navigate(pathes.LOGIN, { state: location })
                    }}
                    active={location.pathname === pathes.LOGIN}
                  >
                    Log in
                  </Button>
                </li>
                <li>
                  <Button
                    className="menu__button_bottom"
                    color="plain"
                    onClick={() => {
                      navigate(pathes.REGISTER, { state: location })
                      setShow(false)
                    }}
                    active={location.pathname === pathes.REGISTER}
                  >
                    Register
                  </Button>
                </li>
              </ul>
            ))}
        </nav>
      </>
      <AccountPreview show={showAccout} setShow={setAccountShow} />
    </header>
  )
}
