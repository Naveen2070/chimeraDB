"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTableToObjects = convertTableToObjects;
function convertTableToObjects(table) {
    const { columns, rows } = table;
    return rows.map((row) => {
        return columns.reduce((acc, col, index) => {
            acc[col] = row[index];
            return acc;
        }, {});
    });
}
//# sourceMappingURL=ObjectMaker.js.map