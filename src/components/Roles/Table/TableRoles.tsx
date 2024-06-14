import axios, { AxiosError } from 'axios';
import React, { useEffect, useState, forwardRef, useImperativeHandle, useCallback, ReactNode } from 'react';

import { columnsRole, RoleTable } from '@/components/Roles/Table/columns';
import { DataTableRole } from '@/components/Roles/Table/data-table';
import { useToast } from '@/components/ui/use-toast';

import useAxiosAuth from '@/lib/hooks/useAxiosAuth';

const TableRoles = forwardRef((props, ref) => {
  const axiosAuth = useAxiosAuth();
  const [data, setData] = useState<RoleTable[]>([]);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      const roles = await axiosAuth.get('/roles/resources');
      //console.log(roles.data);
      setData(roles.data);
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
    }
  }, [axiosAuth, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Función para actualizar los roles después de eliminarlos
  const handleRolesUpdated = useCallback(async () => {
    try {
      await fetchData();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron actualizar los roles. Por favor, recarga la página.',
      });
    }
  }, [fetchData, toast]);

  useImperativeHandle(ref, () => ({
    fetchData,
    updateRoles: handleRolesUpdated,
  }));

  return (
    <div>
      <DataTableRole columns={columnsRole} data={data} onRolesUpdated={handleRolesUpdated} />
    </div>
  );
});

TableRoles.displayName = 'TableRoles';

export default TableRoles;
