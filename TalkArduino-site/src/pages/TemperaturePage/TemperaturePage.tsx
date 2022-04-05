import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react'

import { Url, useRequest } from '../../hooks'
import {
  Table,
  Format,
  useSnack,
  LineChart,
  Statistic,
  Loader,
  Spinner,
} from '../../components'
import { TResponse, TTemperature } from '../../types'
import { getDataByDate, getDataByMonth, getDataByWeek, getDataByYear, SortBy } from '../../utils'

import './styles.scss'
import { Undo } from '../../assets/Undo'
import { useInterval } from '../../hooks/useInterval'

const tempColumns = {
  lm: 'LM35DS',
  bme: 'BME280',
  dht: 'DHT-22',
  date: 'TIME',
}

export const TemperaturePage: FC = (): ReactElement => {
  const { request, loading } = useRequest()
  const [temperature, setTemperature] = useState<TResponse<TTemperature> | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DAY)
  const { addSnack } = useSnack()
  const getTemperature = async () => {
    const { body, status } = await request<TResponse<TTemperature>>(Url.TEMPERATURE)

    if (status === 200) {
      setTemperature(body)
    }
  }

  const onRefetch = () => {
    setTemperature(undefined);
    getTemperature();
    addSnack({ title: 'Updated', content: 'Data was updated', level: 'info' })
  }

  useInterval({
    callback: useCallback(() => {
      getTemperature()
      addSnack({ title: 'Updated', content: 'Data was updated', level: 'info' })
    }, []),
    timeout: 1000 * 30 * 60,
  })
  useEffect(() => {
    getTemperature()
  }, [])

  const tempData = useMemo(
    () =>
      temperature?.Items.map((val: TTemperature) => ({
        lm: <span className={`table__${val.lm > 26 || val.lm < 14 ? 'down' : 'up'}`}>{val.lm}</span>,
        bme: <span className={`table__${val.bme > 26 || val.bme < 14 ? 'down' : 'up'}`}>{val.bme}</span>,
        dht: <span className={`table__${val.dht > 26 || val.dht < 14 ? 'down' : 'up'}`}>{val.dht}</span>,
        date: <Format type="timeAgo" value={val.ISO_date} />,
      })).slice(0, 40 * page),
    [temperature, page]
  )
  const tempPoints = useMemo(() => {
    if (!temperature?.Items) {
      return undefined
    }

    let data

    switch (sortBy) {
      case SortBy.DAY:
        data = getDataByDate(temperature.Items)
        break
      case SortBy.WEEK:
        data = getDataByWeek(temperature.Items)
        break
      case SortBy.MONTH:
        data = getDataByMonth(temperature.Items)
        break
      case SortBy.YEAR:
        data = getDataByYear(temperature.Items)
        break
      default:
        return
    }

    return [
      {
        id: 'BME280',
        data: data?.bme,
      },
      {
        id: 'LM35DS',
        data: data?.lm,
      },
      {
        id: 'DHT-22',
        data: data?.dht,
      },
    ]
  }, [temperature, sortBy])

  return (
    <div className="temperature-page">
      <div className="temperature-page__header">
        <div className="header__info">
          {temperature?.Count ? <span className="header__title">Temperature</span> : <Loader type="plain" />}
          {temperature?.Count ? (
            <span className="header__subtitle">
              Total count: <strong>{temperature?.Count}</strong> Records
            </span>
          ) : (
            <Loader type="plain" />
          )}
        </div>
        <div className="header__undo">{loading ? <Spinner type='dark' className='header__loader'/> : <Undo onClick={onRefetch} size={15} />}</div>
      </div>
      <div className="temperature-page__content">
        <div className="temperature-page__info">
          <div className="temp-statistic-wrapper">
            <Statistic
              value={temperature?.Items[0].bme}
              className="temp-statistic-wrapper__statistic"
              title="BME280"
              description={
                temperature?.Items && (temperature.Items[0].bme > 26 || temperature.Items[0].bme < 14)
                  ? 'Danger'
                  : 'Good'
              }
              loading={loading}
              color={
                temperature?.Items &&
                (temperature.Items[0].bme > 26 || temperature.Items[0].bme < 14 ? 'danger' : 'good')
              }
            />
            <Statistic
              value={temperature?.Items[0].lm}
              className="temp-statistic-wrapper__statistic"
              title="LM35DS"
              description={
                temperature?.Items && (temperature.Items[0].lm > 26 || temperature.Items[0].lm < 14) ? 'Danger' : 'Good'
              }
              loading={loading}
              color={
                temperature?.Items && (temperature.Items[0].lm > 26 || temperature.Items[0].lm < 14 ? 'danger' : 'good')
              }
            />
            <Statistic
              value={temperature?.Items[0].dht}
              className="temp-statistic-wrapper__statistic"
              title="DHT-22"
              description={
                temperature?.Items && (temperature.Items[0].dht > 26 || temperature.Items[0].dht < 14)
                  ? 'Danger'
                  : 'Good'
              }
              loading={loading}
              color={
                temperature?.Items &&
                (temperature.Items[0].dht > 26 || temperature.Items[0].dht < 14 ? 'danger' : 'good')
              }
            />
          </div>
          <LineChart
            loading={loading}
            onSort={setSortBy}
            wrapperClassName="temperature-page__graphic-wrapper"
            className="temperature-page__graphic"
            data={tempPoints}
          />
        </div>
        <div>
          <Table
            columns={tempColumns}
            data={tempData}
            loading={loading}
            onLoadMore={setPage}
            className="temperature-page__table"
            hasMore={!!temperature?.Count && temperature.Count >= 40 * page}
          />
        </div>
      </div>
    </div>
  )
}
