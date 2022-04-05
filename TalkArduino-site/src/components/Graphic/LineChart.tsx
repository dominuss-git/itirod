import { FC, ReactElement, useState } from 'react'
import { ResponsiveLine, Serie } from '@nivo/line'

import { SortBy } from '../../utils'
import { Button } from '../Buttons'
import { Spinner } from '../Loaders'

import './styles.scss'

export type TGraphicData = {
  id: string
  data: Array<{ x: number | string; y: number | string }>
}

type TGraphicsProps = {
  data?: Array<Serie>
  className?: string
  wrapperClassName?: string
  loading?: boolean
  onSort?: (key: SortBy) => void
}

export const LineChart: FC<TGraphicsProps> = ({
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
    <div className={`graphic__loader ${wrapperClassName}`}>
      <Spinner type="dark" />
    </div>
  ) : (
    <div className={['graphic__main', wrapperClassName].join(' ')}>
      <div className={className}>
        <ResponsiveLine
          {...rest}
          data={data!}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          enableGridX={false}
          enableGridY={false}
          lineWidth={1}
          pointSize={5}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
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
