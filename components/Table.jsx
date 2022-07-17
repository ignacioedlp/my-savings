import { useTable } from 'react-table'
import { classNames } from '../lib/Utils'
import { useMemo } from 'react'

function CurrencyPill({ value }) {
  const status = value ? value.toLowerCase() : 'unknown'

  return (
    <span
      className={classNames(
        'px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm',
        status.startsWith('usd')
          ? 'bg-green-100 text-green-800'
          : status.startsWith('ars')
          ? 'bg-blue-100 text-blue-800'
          : 'bg-yellow-100 text-yellow-800',
      )}
    >
      {status}
    </span>
  )
}

const Table = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Category',
        accessor: 'category', // accessor is the "key" in the data
      },
      {
        Header: 'Concept',
        accessor: 'concept',
      },
      {
        Header: 'Currency',
        accessor: 'currency',
        Cell: CurrencyPill,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
      },
    ],
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <div className="mt-2 flex flex-col w-full">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        key={index}
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-white divide-y divide-gray-200"
              >
                {rows.map((row, index) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()} key={index}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-4 whitespace-nowrap"
                            key={index}
                          >
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
