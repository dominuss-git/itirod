import { ResponsiveBar } from '@nivo/bar'

// import { ResponsiveLine, Serie } from '@nivo/line'
import { FC, ReactElement, useEffect, useState } from 'react'
import { SortBy } from '../../utils'
import { Button } from '../Buttons'
import { Loader, Spinner } from '../Loaders'

import './styles.scss'

// export type TGraphicData = {
//   id: string
//   data: Array<{ x: number | string; y: number | string }>
// }

type TGraphicsProps = {
  data?: any
  className?: string
  wrapperClassName?: string
  loading?: boolean
  onSort?: (key: SortBy) => void
}

export const BarChart: FC<TGraphicsProps> = ({
  data,
  className,
  loading,
  wrapperClassName,
  onSort,
  ...rest
}): ReactElement => {
  const [activeTab, setActiveTab] = useState<SortBy>(SortBy.DAY)

  const onClick = (tab: SortBy): void => {
    setActiveTab(tab)
  }

  return loading || !data ? (
    <div className="graphic__loader">
      <Spinner type="dark" />
    </div>
  ) : (
    <div className={['graphic__main', wrapperClassName].join(' ')}>
      <div className={className}>
        <ResponsiveBar
          {...rest}
          data={data}
          keys={['BME280', 'DHT-22']}
          indexBy="time"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          enableGridY={false}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
      <div className="graphic__button-wrapper">
        {Object.values(SortBy).map((val: SortBy) => (
          <Button
            key={val}
            className="graphic__button"
            onClick={() => {
              if (onSort) {
                onSort(val)
              }
              onClick(val)
            }}
            active={activeTab === val}
          >
            {val}
          </Button>
        ))}
      </div>
    </div>
  )
}
