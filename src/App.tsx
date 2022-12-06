import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { AiTwotoneStar } from 'react-icons/ai';
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
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id
  }),
  columnHelper.accessor((row) => row.title, {
    id: 'title',
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Title</span>,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('price', {
    header: () => 'Price',
    cell: (info) => <i>{`$${info.getValue()}`}</i>,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('description', {
    header: () => <span>Description</span>,
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('image', {
    header: 'Image',
    footer: (info) => info.column.id,
    cell: (info) => <img src={info.getValue()} alt='product' className='h-full ' />
  }),
  columnHelper.accessor('rating', {
    header: 'Rating',
    footer: (info) => info.column.id,
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
  const { data, isLoading, isLoadingError, isFetched, refetch, error, isError } = useQuery(
    ['productsData'],
    getProducts
  );
  const rerender = refetch;
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-pink-100 p-2'>
      <table className='overflow-x-auto border border-collapse border-blue-700 bg-slate-50'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table?.getRowModel() &&
            table?.getRowModel().rows &&
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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
      <div className='h-4' />
      <button onClick={() => rerender()} className='border p-2 rounded-lg bg-gray-800 text-white'>
        Rerender
      </button>
    </div>
  );
}

export default App;
