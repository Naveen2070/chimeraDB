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

export function convertObjectsToTable(
  tableName: string,
  objects: TableRow[]
): Table {
  if (objects.length === 0) {
    return { name: tableName, columns: [], rows: [] };
  }

  const columns = Object.keys(objects[0]);
  const rows = objects.map((obj) => columns.map((col) => obj[col]));

  return {
    name: tableName,
    columns,
    rows,
  };
}
