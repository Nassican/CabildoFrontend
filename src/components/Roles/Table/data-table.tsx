'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import axios, { AxiosError } from 'axios';
import { ReactNode, useState } from 'react';
import '@/types/table-types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

import { AlertDialogButton } from '../../AlertDialog/AlertDialog';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableRole<TData, TValue>({
  columns,
  data,
  onRolesUpdated,
}: DataTableProps<TData, TValue> & { onRolesUpdated: () => void }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [, setSelectedRows] = useState<TData[]>([]);
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();

  //console.log('data', data);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      updateRole: async () => {
        onRolesUpdated();
        table.resetRowSelection();
      },
    },
  });
  const handleDeleteRoles = async () => {
    // Aquí puedes implementar la lógica para eliminar los roles seleccionados
    // utilizando la API o la función que desees
    //console.log('Roles seleccionados para eliminar:', selectedRows);

    try {
      const idsToDelete = (selectedRows as { id: string }[]).map(({ id }) => id);
      await axiosAuth.delete('/roles/bulk/delete', { data: { ids: idsToDelete } });

      //console.log(response.data);
      table.resetRowSelection();
      setSelectedRows([]);
      // Recargar la tabla después de eliminar los roles
      onRolesUpdated();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{
          message: ReactNode;
          error: string;
        }>;
        if (axiosError.response) {
          toast({
            title: 'Error',
            description: axiosError.response.data.message,
          });
          return;
        }
      }
      toast({
        title: 'Error',
        description: 'Error al crear el rol. Por favor, intenta de nuevo.',
      });
    }
    table.resetRowSelection();
    setSelectedRows([]);
  };

  const selectedRows = table.getFilteredSelectedRowModel().rows.map((row) => row.original);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar nombres..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className=""
        />
        {selectedRows.length > 0 && (
          <AlertDialogButton
            btnText={`Eliminar ${selectedRows.length} seleccionados`}
            alrtTitle="Confirmar eliminación"
            alrtDesc="¿Estás seguro de que deseas eliminar los roles seleccionados?"
            onConfirm={handleDeleteRoles}
          />
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} fila(s)
          seleccionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
