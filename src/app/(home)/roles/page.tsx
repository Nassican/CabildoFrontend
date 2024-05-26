// src/app/roles/page.tsx

'use client';

import React, { useRef } from 'react';

import { CreateRoleSheet } from '@/components/Roles/CreateRole/create-role';
import TableRoles from '@/components/Roles/Table/TableRoles';
import { Label } from '@/components/ui/label';

const RolesPage: React.FC = () => {
  const tableRolesRef = useRef<{ fetchData: () => void }>(null);

  const handleRoleCreated = () => {
    tableRolesRef.current?.fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="">Administración de roles</Label>
        <CreateRoleSheet onRoleCreated={handleRoleCreated} />
      </div>
      <TableRoles ref={tableRolesRef} />
    </div>
  );
};

export default RolesPage;
