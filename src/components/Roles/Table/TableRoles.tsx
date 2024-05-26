import React, { useEffect, useState, forwardRef, useImperativeHandle, useCallback } from 'react';

import { columnsRole, RoleTable } from '@/components/Roles/Table/columns';
import { DataTableRole } from '@/components/Roles/Table/data-table';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

const TableRoles = forwardRef((props, ref) => {
  const axiosAuth = useAxiosAuth();
  const [data, setData] = useState<RoleTable[]>([]);

  const fetchData = useCallback(async () => {
    const roles = await axiosAuth.get('/roles');
    //console.log(roles.data);
    setData(roles.data);
  }, [axiosAuth]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Función para actualizar los roles después de eliminarlos
  const handleRolesUpdated = async () => {
    await fetchData(); // Actualiza los datos
  };

  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  return (
    <div>
      <DataTableRole columns={columnsRole} data={data} onRolesUpdated={handleRolesUpdated} />
    </div>
  );
});

TableRoles.displayName = 'TableRoles';

export default TableRoles;
