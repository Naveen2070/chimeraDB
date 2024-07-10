"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTableToObjects = convertTableToObjects;
exports.convertObjectsToTable = convertObjectsToTable;
function convertTableToObjects(table) {
    const { columns, rows } = table;
    return rows.map((row) => {
        return columns.reduce((acc, col, index) => {
            acc[col] = row[index];
            return acc;
        }, {});
    });
}
function convertObjectsToTable(tableName, objects) {
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
//# sourceMappingURL=ObjectMaker.js.map