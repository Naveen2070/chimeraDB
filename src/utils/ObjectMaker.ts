import { Table } from '../Tables/Table';

export interface TableRow {
  id: number;
  [key: string]: any;
}
export function convertTableToObjects(table: Table): TableRow[] {
  const { columns, rows } = table;
  return rows.map((row) => {
    return columns.reduce((acc, col, index) => {
      acc[col] = row[index];
      return acc;
    }, {} as TableRow);
  });
}
