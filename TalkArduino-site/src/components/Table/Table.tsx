import { FC, ReactElement, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Loader } from '../Loaders'

import './styles.scss'

type TTableProps = {
  columns: { [key: string]: string }
  data: any
  loading?: boolean
  onLoadMore?: (page: number) => void
  hasMore?: boolean
  className?: string
}

export const Table: FC<TTableProps> = ({ columns, data, loading, onLoadMore, hasMore, className }): ReactElement => {
  const titles = Object.values(columns)
  const { ref, inView } = useInView({
    threshold: 0,
  })
  const [page, setPage] = useState<number>(1)
  const keys = Object.keys(columns)
  const loaders = []

  const loadMore = () => {
    const newPage = page + 1
    setPage(newPage)

    if (onLoadMore && hasMore) {
      onLoadMore(newPage)
    }
  }

  for (let i = 0; i < 25; i++) {
    loaders[i] = i
  }

  useEffect(() => {
    if (inView) {
      loadMore()
    }
  }, [inView])

  return (
    <div className={['table__wrapper', className].join(' ')}>
      <table className="table">
        <thead className="table__head">
          <tr className="table__head_row">
            {titles?.map((title) => (
              <th key={title} className="table__head_column">
                {loading ? <Loader type="white" /> : title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table__body">
          {data?.map((val: any, i: number) => (
            <tr key={i} className="table__body_row">
              {keys?.map((key: string, j: number) => (
                <td key={val[key] + j} className="table__body_column">
                  {val[key]}
                </td>
              ))}
              
            </tr>
          ))}
          {loading &&
            loaders.map((val) => (
              <tr key={val} className="table__body_row">
                {keys.map((key: string, j: number) => (
                  <td key={j} className="table__body_column">
                    <Loader type="plain" />
                  </td>
                ))}
              </tr>
            ))}
          <tr ref={ref}></tr>
        </tbody>
      </table>
    </div>
  )
}
