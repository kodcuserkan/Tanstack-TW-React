import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { AiOutlineLoading, AiTwotoneStar } from 'react-icons/ai';
import { FaUsers } from 'react-icons/fa';
import { getProducts } from './api';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor('id', {
    header: () => <span>#</span>,
    cell: (info) => <span className='p-2'>{info.getValue()}</span>
  }),
  columnHelper.accessor((row) => row.title, {
    id: 'title',
    cell: (info) => <div className='p-1'>{info.getValue()}</div>,
    header: () => <span>Title</span>
  }),
  columnHelper.accessor('price', {
    header: () => 'Price',
    cell: (info) => <div className='p-1 capitalize text-center'>{`$${info.getValue()}`}</div>
  }),
  columnHelper.accessor('description', {
    header: () => <span>Description</span>,
    cell: (info) => <div className='p-1'>{info.getValue()}</div>
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: (info) => <div className='p-1 capitalize'>{info.getValue()}</div>
  }),
  columnHelper.accessor('image', {
    header: 'Image',
    cell: (info) => <img src={info.getValue()} alt='product' className='h-full p-1' />
  }),
  columnHelper.accessor('rating', {
    header: 'Rating',
    cell: (info) => {
      const { rate, count } = info.getValue();
      return (
        <div className='flex justify-between align-middle p-2 gap-2 '>
          <span>
            <AiTwotoneStar className='text-yellow-400' />
            {rate}
          </span>
          <span>
            <FaUsers className='text-blue-400' />
            {count}
          </span>
        </div>
      );
    }
  })
];

function App() {
  const { data, isLoading, isFetching, isFetched, refetch, error, isError } = useQuery(
    ['productsData'],
    getProducts,
    {
      refetchOnWindowFocus: false, // Use this to prevent refetching when window is focused
      refetchInterval: 60000 // Use this to refetch on interval
      // refetchOnMount: false, Use this to prevent refetching when component is mounted
      // refetchOnReconnect: false, Use this to prevent refetching when connection is reconnected
      // refetchInterval: false, Use this to prevent refetching on interval
      // refetchIntervalInBackground: false, Use this to prevent refetching on interval when window is not focused,
    }
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <AiOutlineLoading />
      </div>
    );
  }

  return (
    <div className='bg-rose-50 p-2'>
      <div className='flex justify-center align-middle font-semibold my-2 w-full bg-gray-50 rounded-sm text-lg'>
        Welcome to React Table
      </div>
      <div className='flex justifiy-start overflow-x-auto'>
        <table className='overflow-x-auto border-collapse bg-slate-50'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className='border border-gray-200 ' key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr className={i % 2 ? 'bg-gray-50' : 'bg-white'} key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className='border border-gray-200 ' key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.footer, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>

      <div className='flex justify-center align-middle p-3 gap-2'>
        <button
          onClick={() => refetch()}
          className='border w-96 h-12 flex items-center justify-center p-2 rounded-lg bg-gray-800 text-white'>
          {isFetching ? <AiOutlineLoading /> : 'Refetch'}
        </button>
      </div>
    </div>
  );
}

export default App;
