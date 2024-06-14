'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import '@/types/table-types';

import { ResourceBadge } from '../ResourceItems/ResourceBadge';
import { ResourcesModal } from '../ResourceItems/ResourcesModal';
import { EditRoleSheet } from '../RoleItems/edit-role';

export type Resource = {
  id: number;
  name: string;
};

export type RoleTable = {
  id: number;
  name: string;
  recursos: Resource[];
};

export const columnsRole: ColumnDef<RoleTable>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: { getIsSelected: () => boolean; toggleSelected: (value: boolean) => void } }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
      <div className="capitalize">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'recursos',
    header: 'Recursos',
    cell: ({ row }) => {
      const role = row.original;
      const resources = role.recursos || [];
      const displayResources = resources.slice(0, 3);
      const hasMore = resources.length > 3;

      return (
        <div className="flex flex-wrap items-center gap-2">
          {hasMore && (
            <ResourcesModal roleName={role.name} resources={resources}>
              <Badge variant="outline" className="cursor-pointer">
                +{resources.length - 3}
              </Badge>
            </ResourcesModal>
          )}
          {displayResources.map((resource) => (
            <ResourceBadge key={resource.id} name={resource.name} />
          ))}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const role = row.original;

      const handleUpdate = async () => {
        try {
          await table.options.meta?.updateRole();
          console.log('Role updated');
        } catch (error) {
          console.error(error);
        }
      };

      return <EditRoleSheet role={role} onUpdate={handleUpdate} />;
    },
  },
];
