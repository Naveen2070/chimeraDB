import { Table } from '../Tables/Table';
export interface TableRow {
    id: number;
    [key: string]: any;
}
export declare function convertTableToObjects(table: Table): TableRow[];
//# sourceMappingURL=ObjectMaker.d.ts.map