import React from 'react';

import { CreateRoleSheet } from '@/components/Roles/CreateRole/create-role';
import { columns, Payment } from '@/components/Roles/Table/columns';
import { DataTableRole } from '@/components/Roles/Table/data-table';
import { Label } from '@/components/ui/label';

import { DataTableDemo } from '../../../components/Roles/example';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ];
}

const RolesPage: React.FC = async () => {
  const data = await getData();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="">Administración de roles</Label>
        <CreateRoleSheet />
      </div>
      <DataTableRole columns={columns} data={data} />
      <DataTableDemo />
    </div>
  );
};

export default RolesPage;
