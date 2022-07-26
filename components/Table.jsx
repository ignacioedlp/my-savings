import { useTable, useSortBy } from 'react-table';
import { classNames } from '../lib/utils';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import saving from '../pages/saving/[saving]';

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

  const router = useRouter();

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
                    <tr
                      {...row.getRowProps()}
                      key={index}
                      onClick={() => {
                        router.push({
                          pathname:
                            'https://my-savings.vercel.app/saving/[saving]',
                          query: { saving: row.original.id },
                        });
                      }}
                    >
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
