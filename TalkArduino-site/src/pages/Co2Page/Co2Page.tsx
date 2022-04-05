import React, { ReactElement, useMemo, FC, useState, useEffect, useCallback } from 'react'

import { Url, useRequest } from '../../hooks'
import {
  Format,
  Table,
  useSnack,
  LineChart,
  CenterLayer,
  CO2Indicator,
  HorizontalCenterLayer,
  Loader,
  Spinner,
} from '../../components'
import { TCO2, TResponse } from '../../types'
import { getDataByDate, getDataByMonth, getDataByWeek, getDataByYear, GetDegre, SortBy } from '../../utils'

const co2Columns = {
  mh: 'MH-Z19',
  date: 'TIME',
}

import './styles.scss'
import { Undo } from '../../assets/Undo'
import { useInterval } from '../../hooks/useInterval'

export const Co2Page: FC = (): ReactElement => {
  const { request, loading } = useRequest()
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DAY)
  const [co2, setCo2Data] = useState<TResponse<TCO2> | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const { addSnack } = useSnack()

  const getCo2 = async () => {
    const { body, status } = await request<TResponse<TCO2>>(Url.CO2)

    if (status === 200) {
      setCo2Data(body)
    }
  }

  const onRefetch = () => {
    setCo2Data(undefined)
    getCo2()
    addSnack({ title: 'Updated', content: 'Data was updated', level: 'info' })
  }

  useInterval({
    callback: useCallback(() => {
      getCo2()
      addSnack({ title: 'Updated', content: 'Data was updated', level: 'info' })
    }, []),
    timeout: 1000 * 30 * 60,
  })
  useEffect(() => {
    getCo2()
  }, [])

  const co2Data = useMemo(
    () =>
      co2?.Items?.map((val: TCO2) => ({
        mh: <span className={`table__${val.mh > 800 ? (val.mh > 1300 ? 'down' : 'normal') : 'up'}`}>{val.mh}</span>,
        date: <Format type="timeAgo" value={val.ISO_date} />,
      })).slice(0, 40 * page),
    [co2, page]
  )

  const co2Points = useMemo(() => {
    if (!co2?.Items) {
      return undefined
    }

    let data

    switch (sortBy) {
      case SortBy.DAY:
        data = getDataByDate(co2.Items)
        break
      case SortBy.WEEK:
        data = getDataByWeek(co2.Items)
        break
      case SortBy.MONTH:
        data = getDataByMonth(co2.Items)
        break
      case SortBy.YEAR:
        data = getDataByYear(co2.Items)
        break
      default:
        return
    }

    return [
      {
        id: 'MHZ-19B',
        data: data?.mh,
      },
    ]
  }, [co2, sortBy])

  return (
    <div className="co2-page">
      <div className="co2-page__header">
        <div className="header__info">
          {co2?.Count ? <span className="header__title">CO2</span> : <Loader type="plain" />}
          {co2?.Count ? (
            <span className="header__subtitle">
              Total count: <strong>{co2?.Count}</strong> Records
            </span>
          ) : (
            <Loader type="plain" />
          )}
        </div>
        <div className="header__undo">
          {loading ? <Spinner type="dark" className="header__loader" /> : <Undo onClick={onRefetch} size={15} />}
        </div>
      </div>
      <div className="co2-page__content">
        <div>
          <Table
            columns={co2Columns}
            onLoadMore={setPage}
            className="co2-page__table"
            hasMore={!!co2?.Count && co2.Count >= 40 * page}
            data={co2Data}
            loading={loading}
          />
        </div>
        <div className="co2-page__info">
          <CO2Indicator deg={!co2?.Items ? 0 : GetDegre(co2.Items[0].mh)} />
          <LineChart
            loading={loading}
            onSort={setSortBy}
            wrapperClassName="co2-page__graphic-wrapper"
            className="co2-page__graphic"
            data={co2Points}
          />
        </div>
      </div>
    </div>
  )
}
