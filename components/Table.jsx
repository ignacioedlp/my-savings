import { useTable, useSortBy } from 'react-table';
import { classNames } from '../lib/utils';
import { useMemo } from 'react';

function CurrencyPill({ value }) {
  const status = value ? value.toLowerCase() : 'unknown';

  return (
    <span
      className={classNames(
        'px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm',
        status.startsWith('usd')
          ? 'bg-green-100 text-green-800'
          : status.startsWith('ars')
          ? 'bg-blue-100 text-blue-800'
          : 'bg-yellow-100 text-yellow-800'
      )}
    >
      {status}
    </span>
  );
}

function AmountCell({ value }) {
  return <span>$ {value}</span>;
}

function CategoryPill({ value }) {
  const status = value ? value.toLowerCase() : 'unknown';

  let platform = '';

  switch (status) {
    case 'fiat':
    case 'usd fisico':
      platform = 'bg-green-100 text-green-800';
      break;
    case 'cripto':
      platform = 'bg-yellow-100 text-yellow-800';
      break;
    case 'ontop':
      platform = 'bg-red-100 text-red-800';
      break;
    case 'lemon':
      platform = 'bg-lime-100 text-lime-800';
      break;
    case 'cuenta dni':
      platform = 'bg-gradient-to-r from-green-400 to-green-600 text-white';
      break;
    case 'payoneer':
      platform = 'bg-gradient-to-r from-green-400 to-blue-500 text-white';
      break;
    case 'mercado libre':
      platform = 'bg-blue-100 text-blue-800';
      break;
  }

  return (
    <span
      className={classNames(
        'px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm',
        platform
      )}
    >
      {status}
    </span>
  );
}

const Table = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Category',
        accessor: 'category', // accessor is the "key" in the data
        Cell: CategoryPill,
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
        Cell: AmountCell,
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  function SortIcon({ className }) {
    return (
      <svg
        className={className}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 320 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
      </svg>
    );
  }

  function SortUpIcon({ className }) {
    return (
      <svg
        className={className}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 320 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
      </svg>
    );
  }

  function SortDownIcon({ className }) {
    return (
      <svg
        className={className}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 320 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
      </svg>
    );
  }

  return (
    <div className="mt-2 flex flex-col w-full   py-3">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-slate-800 "
            >
              <thead className="bg-slate-700 ">
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column) => (
                      <th
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        key={index}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' ▼'
                              : ' ▲'
                            : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="bg-slate-700  divide-y divide-slate-800"
              >
                {rows.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={index}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className="px-6 py-4 whitespace-nowrap text-white"
                            key={index}
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
