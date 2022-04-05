import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react'

import { Format, Table, useSnack } from '../../components'
import { Url, useRequest } from '../../hooks'
import { TAllSensors, TResponse } from '../../types'

const tempColumns = {
  temperature: 'Temperature',
  humidity: 'Humidity',
  pressure: `Pressure`,
  co2: 'CO2',
  date: 'TIME',
}

export const DashboardPage: FC = (): ReactElement => {
  const { request, loading } = useRequest()
  const [data, setData] = useState<TResponse<TAllSensors> | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const { addSnack } = useSnack()
  const getData = async () => {
    const { body, status } = await request<TResponse<TAllSensors>>(Url.ALL)

    if (status === 200) {
      // TODO: can be deprecated
      body.Items.sort((a: TAllSensors, b: TAllSensors) => {
        if (a.creation_timestamp <= b.creation_timestamp) {
          return 1
        }

        return -1
      })
      setData(body)
    }
  }
  
  // TODO: NEED refetch
  // useTimeout({
  //   callback: useCallback(() => {
  //     getData()
  //     addSnack({ title: 'Updated', content: 'Data was updated' })
  //   }, []),
  //   timeout: 1000 * 60 * 30,
  // })
  useEffect(() => {
    getData()
  }, [])

  const allData = useMemo(
    () =>
      data?.Items.map((val: TAllSensors) => ({
        temperature: (
          <span className={`table__${val.temperature.bme > 26 || val.temperature.bme < 14 ? 'down' : 'up'}`}>
            {val.temperature.bme}
          </span>
        ),
        humidity: (
          <span className={`table__${val.humidity.bme > 60 || val.humidity.bme < 40 ? 'down' : 'up'}`}>
            {val.humidity.bme}
          </span>
        ),
        pressure: (
          <span className={`table__${val.pressure.bme > 26 || val.pressure.bme < 14 ? 'down' : 'up'}`}>
            {val.pressure.bme}
          </span>
        ),
        co2: (
          <span className={`table__${val.co2.mh > 800 ? (val.co2.mh > 1300 ? 'down' : 'normal') : 'up'}`}>
            {val.co2.mh}
          </span>
        ),
        date: <Format type={'timeAgo'} value={val.ISO_date} />,
      })).slice(0, 40 * page),
    [data, page]
  )
  return (
    <Table
      columns={tempColumns}
      data={allData}
      loading={loading}
      onLoadMore={setPage}
      hasMore={!!data?.Count && data.Count >= 40 * page}
    />
  )
}
