import React, { FC, ReactElement, useEffect, useRef, useState } from 'react'

import './styles.scss'

type TRotate = {
  left: number
  right: number
}

export const CO2Indicator: FC<{ deg?: number }> = ({ deg = 0 }): ReactElement => {
  const [rotate, setRotate] = useState<TRotate>({
    left: 0,
    right: 0,
  })
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (deg < 180 && rotate.right === 0) {
      setRotate({
        left: deg,
        right: 0,
      })

      return
    }
    if (deg < 180) {
      setRotate({
        left: 180,
        right: 0,
      })

      timeoutRef.current = setTimeout(
        () =>
          setRotate({
            left: deg,
            right: 0,
          }),
        300
      )

      return
    }

    if (deg > 180) {
      setRotate({
        left: 180,
        right: 0,
      })

      timeoutRef.current = setTimeout(
        () =>
          setRotate({
            left: 180,
            right: deg - 180,
          }),
        1250
      )

      return
    }

    setRotate({
      left: deg,
      right: 0,
    })

    // @ts-ignore
    return () => clearTimeout(timeoutRef.current)
  }, [deg])

  return (
    <div className="indicator">
      <span className="indicator__text_start">400</span>
      <span className="indicator__text_good">800</span>
      <span className="indicator__text_warning">1300</span>
      <span className="indicator__text_danger">5000</span>
      <div className="indicator__cursor">
        <div className="indicator__panel">
          <div className="scroller__wrapper">
            <div
              className={['scroller_left', `scroller_${deg > 122.4 ? 'danger' : deg > 86.4 ? 'warning' : 'good'}`].join(
                ' '
              )}
              style={{
                transform: `rotate(${rotate.left}deg)`,
                transition: `transform ${rotate.left / 180 + 0.3}s ease-out, background 1.5s`,
              }}
            >
              <div className="scroller__overflow scroller__overflow_left"></div>
            </div>
          </div>
          <div className="scroller__wrapper">
            <div
              className="scroller_right"
              style={{
                transform: `rotate(${rotate.right}deg)`,
                transition: `transform ${rotate.right / 180 + 0.3}s ease-out`,
              }}
            >
              <div className="scroller__overflow scroller__overflow_right"></div>
            </div>
          </div>
        </div>
      </div>
      <svg className="indicator indicator__ellipse" xmlns="http://www.w3.org/2000/svg" viewBox="76 0 453 300">
        <path
          fill="#B58500"
          d="M199.51250096 75.60722833a5 5 0 0 0-7.06572242 1.5434255 140 140 0 0 0-20.44673707 72.74158378 5 5 0 0 0 5.22681346 4.9987015l117.05909842-5.31562255a4.61815043 4.61815043 0 0 0 2.37294384-8.4420166Z"
        />
        <path
          fill="#115740"
          d="M177.33824904 157.34402792a5 5 0 0 0-4.75225676 5.45184844 140 140 0 0 0 65.05111612 105.82183038 5 5 0 0 0 7.01017197-1.77878739l57.4606563-101.8099806a5 5 0 0 0-.6052971-5.76581704 14 14 0 0 1-2.50741711-4.07893797 5 5 0 0 0-4.87137835-3.14335866Z"
        />
        <path
          fill="#fff"
          stroke="#e4e4e4"
          strokeWidth="5"
          d="M246.78580545 268.04588407a5 5 0 0 0 2.10028627 6.92064977 140 140 0 0 0 56.75307631 14.88889086 5 5 0 0 0 5.22717135-4.99832726l-.08258143-118.289167a3.13084732 3.13084732 0 0 0-5.85741032-1.53666283Z"
        />
        <path
          fill="#C8102E"
          stroke="#C8102E"
          d="M313.32195548 284.8553831a5 5 0 0 0 5.23414524 4.99102387A140 140 0 1 0 199.66983739 66.4420287a5 5 0 0 0 1.215827 7.12940112l96.91941802 65.3729729a5 5 0 0 0 5.79568901-.14498124 14 14 0 1 1 12.99737276 24.42393173 5 5 0 0 0-3.35780444 4.7261168Z"
        />
      </svg>
    </div>
  )
}
