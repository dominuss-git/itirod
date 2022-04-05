import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react'

import { Url, useRequest } from '../../hooks'
import {
  BarChart,
  Loader,
  Spinner,
  Statistic,
  Table,
  useSnack,
} from '../../components'
import { THumidity, TResponse } from '../../types'
import { Format } from '../../components/Format'
import { getDataByDate, getDataByMonth, getDataByWeek, getDataByYear, SortBy } from '../../utils'

import './styles.scss'
import { TPoints } from '../../utils/types'
import { Undo } from '../../assets/Undo'
import { useInterval } from '../../hooks/useInterval'

const humColumns = {
  bme: 'BME280',
  dht: 'DHT-22',
  date: 'TIME',
}

export const HumidityPage: FC = (): ReactElement => {
  const { request, loading } = useRequest()
  const [humidity, setHumidity] = useState<TResponse<THumidity> | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DAY)
  const { addSnack } = useSnack()
  const getHumidity = async () => {
    const { body, status } = await request<TResponse<THumidity>>(Url.HUMIDITY)

    if (status === 200) {
      setHumidity(body)
    }
  }

  const onRefetch = () => {
    setHumidity(undefined)
    getHumidity()
    addSnack({ title: 'Updated', content: 'Data was updated', level: 'info' })
  }

  useInterval({
    callback: useCallback(() => {
      getHumidity()
      addSnack({ title: 'Updated', content: 'Data was updated', level: 'info' })
    }, []),
    timeout: 1000 * 30 * 60,
  })
  useEffect(() => {
    getHumidity()
  }, [])

  useEffect(() => {
    if (humidity?.Items) {
      // console.log(getDataByDate({ data: humidity.Items }))
    }
  }, [humidity])

  const humData = useMemo(
    () =>
      humidity?.Items.map((val: THumidity) => ({
        bme: <span className={`table__${val.bme > 60 || val.bme < 40 ? 'down' : 'up'}`}>{val.bme}</span>,
        dht: <span className={`table__${val.dht > 60 || val.dht < 40 ? 'down' : 'up'}`}>{val.dht}</span>,
        date: <Format type="timeAgo" value={val.ISO_date} />,
      })).slice(0, 40 * page),
    [humidity, page]
  )
  const hunPoints = useMemo(() => {
    if (!humidity?.Items) {
      return undefined
    }

    let data: { bme: TPoints[]; dht: TPoints[]; lm?: TPoints[]; mh?: TPoints[] }

    switch (sortBy) {
      case SortBy.DAY:
        data = getDataByDate(humidity.Items)
        break
      case SortBy.WEEK:
        data = getDataByWeek(humidity.Items)
        break
      case SortBy.MONTH:
        data = getDataByMonth(humidity.Items)
        break
      case SortBy.YEAR:
        data = getDataByYear(humidity.Items)
        break
      default:
        return
    }

    return data.bme.map((val, i) => {
      return {
        time: val.x,
        BME280: val.y,
        'DHT-22': data.dht[i].y,
      }
    })
  }, [humidity, sortBy])

  return (
    <div className="humidity-page">
      <div className="humidity-page__header">
        <div className="header__info">
          {humidity?.Count ? <span className="header__title">Humidity</span> : <Loader type="plain" />}
          {humidity?.Count ? (
            <span className="header__subtitle">
              Total count: <strong>{humidity?.Count}</strong> Records
            </span>
          ) : (
            <Loader type="plain" />
          )}
        </div>
        <div className="header__undo">
          {loading ? <Spinner type="dark" className="header__loader" /> : <Undo onClick={onRefetch} size={15} />}
        </div>
      </div>
      <div className="humidity-page__content">
        <div className="humidity-page__info">
          <div className="hum-statistic-wrapper">
            <Statistic
              value={humidity?.Items[0].bme}
              className="hum-statistic-wrapper__statistic"
              title="BME280"
              description={
                humidity?.Items && (humidity.Items[0].bme > 60 || humidity.Items[0].bme < 40) ? 'Danger' : 'Good'
              }
              loading={loading}
              color={humidity?.Items && (humidity.Items[0].bme > 60 || humidity.Items[0].bme < 40 ? 'danger' : 'good')}
            />
            <Statistic
              value={humidity?.Items[0].dht}
              className="hum-statistic-wrapper__statistic"
              title="DHT-22"
              description={
                humidity?.Items && (humidity.Items[0].dht > 60 || humidity.Items[0].dht < 40) ? 'Danger' : 'Good'
              }
              loading={loading}
              color={humidity?.Items && (humidity.Items[0].dht > 60 || humidity.Items[0].dht < 40 ? 'danger' : 'good')}
            />
          </div>
          <BarChart
            loading={loading}
            onSort={setSortBy}
            wrapperClassName="humidity-page__graphic-wrapper"
            className="humidity-page__graphic"
            data={hunPoints}
          />
        </div>
        <div>
          <Table
            onLoadMore={setPage}
            className="humidity-page__table"
            hasMore={!!humidity?.Count && humidity.Count >= 40 * page}
            columns={humColumns}
            data={humData}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}
