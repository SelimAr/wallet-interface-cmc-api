"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import {
  ShoppingCart,
  Star,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { DataList } from "@/types";

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

export default function CryptoList({ data }: { data: DataList[] }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [isData, setIsData] = useState<DataList[]>(data);

  const slice = (s: string, n: number) => {
    return s.length > n && s.substring(0, n - 1) + "$";
  };

  const columns = useMemo<ColumnDef<DataList>[]>(
    () => [
      {
        accessorFn: (row) => row.id,
        id: "id",
        cell: ({ row }) => {
          return (
            <Star size={20} className="cursor-pointer hover:text-yellow-300" />
          );
        },
        header: () => <span></span>,
        filterFn: "includesString",
      },
      {
        accessorFn: (row) => row.name,
        id: "name",
        cell: ({ row }) => {
          return <div className="font-orbitron">{row.original.name}</div>;
        },
        header: () => <span className="font-arimo">Nom</span>,
        filterFn: "includesString",
      },
      {
        accessorFn: (row) => row.quote.USD.price,
        id: "price",
        cell: ({ row }) => {
          return (
            <div className="font-arimo">
              {slice(`${row.original.quote.USD.price}`, 9)}
            </div>
          );
        },
        header: () => <span className="font-arimo">Prix</span>,
        filterFn: "includesString",
      },
      {
        accessorFn: (row) => row.quote.USD.volume_24h,
        id: "volume",
        cell: ({ row }) => {
          return (
            <div className="font-arimo">
              {row.original.quote.USD.volume_24h}
            </div>
          );
        },
        header: () => <span className="font-arimo">Volume 24h</span>,
        filterFn: "includesString",
      },
      {
        accessorFn: (row) => row.circulating_supply,
        id: "circulation",
        cell: ({ row }) => {
          return (
            <div className="font-arimo">{row.original.circulating_supply}</div>
          );
        },
        header: () => <span className="font-arimo">Offre total</span>,
        filterFn: "includesString",
      },
    ],
    []
  );

  const table = useReactTable({
    data: isData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-black/50 h-[calc(100vh-324px)] w-full rounded-xl text-white p-3 overflow-y-auto">
      <div>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="rounded-xl bg-black/20 p-2.5 w-full outline-none placeholder:font-arimo"
          placeholder="Rechercher une cryptomonaie..."
        />
      </div>
      <div className="bg-black/20 rounded-lg p-2.5 my-3 ">
        <table className="w-full h-full ">
          <thead className="text-left ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="py-2"
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none flex items-center space-x-1"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <ChevronUp size={20} />,
                              desc: <ChevronDown size={20} />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="border-y border-zinc-500 hover:bg-black/20"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="py-4 ">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                  <button className="h-full flex items-center w-fit cursor-pointer ">
                    <ShoppingCart size={23} />
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center space-x-3">
        <button
          className="border rounded p-1 cursor-pointer"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="flex items-center space-x-1 font-arimo">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </strong>
        </span>
        <button
          className="border rounded p-1 cursor-pointer"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    });

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
