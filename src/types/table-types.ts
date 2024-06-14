// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RowData, Table } from '@tanstack/react-table';

export interface UpdateRoleFunction {
  (): Promise<void>;
}

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateRole: UpdateRoleFunction;
  }
}
