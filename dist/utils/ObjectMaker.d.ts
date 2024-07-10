import { Table } from '../Tables/Table';
export interface TableRow {
    id: number;
    [key: string]: any;
}
export declare function convertTableToObjects(table: Table): TableRow[];
export declare function convertObjectsToTable(tableName: string, objects: TableRow[]): Table;
//# sourceMappingURL=ObjectMaker.d.ts.map