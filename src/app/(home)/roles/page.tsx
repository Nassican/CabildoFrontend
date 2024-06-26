// src/app/roles/page.tsx

'use client';

import { GitFork } from 'lucide-react';
import React, { useRef } from 'react';

import { CreateRoleSheet } from '@/components/Roles/RoleItems/create-role';
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
        <div className="flex items-center">
          <GitFork size={15} className="mr-2" />
          <Label className="">Administración de roles</Label>
        </div>
        <CreateRoleSheet onRoleCreated={handleRoleCreated} />
      </div>
      <TableRoles ref={tableRolesRef} />
    </div>
  );
};

export default RolesPage;
