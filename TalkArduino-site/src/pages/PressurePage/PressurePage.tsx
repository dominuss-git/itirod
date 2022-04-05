import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react'

import { Url, useRequest } from '../../hooks'
import { Format, LineChart, Loader, Spinner, Table, useSnack } from '../../components'
import { TPressure, TResponse } from '../../types'
import { getDataByDate, getDataByMonth, getDataByWeek, getDataByYear, SortBy } from '../../utils'
import { Undo } from '../../assets/Undo'

import './styles.scss'
import { useInterval } from '../../hooks/useInterval'

const presColumns = {
  bme: 'BME280',
  date: 'TIME',
}

export const PressurePage: FC = (): ReactElement => {
  const { request, loading } = useRequest()
  const [pressure, setPressure] = useState<TResponse<TPressure> | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DAY)
  const { addSnack } = useSnack()
  const getPressure = async () => {
    const { body, status } = await request<TResponse<TPressure>>(Url.PRESSURE)

    if (status === 200) {
      setPressure(body)
    }
  }

  const onRefetch = () => {
    setPressure(undefined)
    getPressure()
    addSnack({ title: 'Updated', content: 'Data was updated', level: 'info' })
  }

  useInterval({
    callback: useCallback(() => {
      getPressure()
      addSnack({ title: 'Updated', content: 'Data was updated', level: 'info' })
    }, []),
    timeout: 1000 * 30 * 60,
  })
  useEffect(() => {
    getPressure()
  }, [])

  const pressData = useMemo(
    () =>
      pressure?.Items.map((val: TPressure) => ({
        bme: <span>{val.bme}</span>,
        date: <Format type="timeAgo" value={val.ISO_date} />,
      })).slice(0, 40 * page),
    [pressure, page]
  )

  const tempPoints = useMemo(() => {
    if (!pressure?.Items) {
      return undefined
    }

    let data

    switch (sortBy) {
      case SortBy.DAY:
        data = getDataByDate(pressure.Items)
        break
      case SortBy.WEEK:
        data = getDataByWeek(pressure.Items)
        break
      case SortBy.MONTH:
        data = getDataByMonth(pressure.Items)
        break
      case SortBy.YEAR:
        data = getDataByYear(pressure.Items)
        break
      default:
        return
    }

    return [
      {
        id: 'BME280',
        data: data?.bme,
      },
    ]
  }, [pressure, sortBy])

  return (
    <div className="pressure-page">
      <div className="pressure-page__header">
        <div className="header__info">
          {pressure?.Count ? <span className="header__title">Pressure</span> : <Loader type="plain" />}
          {pressure?.Count ? (
            <span className="header__subtitle">
              Total count: <strong>{pressure?.Count}</strong> Records
            </span>
          ) : (
            <Loader type="plain" />
          )}
        </div>
        <div className="header__undo">
          {loading ? <Spinner type="dark" className="header__loader" /> : <Undo onClick={onRefetch} size={15} />}
        </div>
      </div>
      <div className="pressure-page__content">
        {/* <div> */}
          <LineChart
            loading={loading}
            onSort={setSortBy}
            wrapperClassName="pressure-page__graphic-wrapper"
            className="pressure-page__graphic"
            data={tempPoints}
          />
        {/* </div> */}
        <div>
          <Table
            columns={presColumns}
            data={pressData}
            loading={loading}
            onLoadMore={setPage}
            className="pressure-page__table"
            hasMore={!!pressure?.Count && pressure.Count >= 40 * page}
          />
        </div>
      </div>
    </div>
  )
}
