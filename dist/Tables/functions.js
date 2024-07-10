"use strict";
// src/Tables/tableOperations.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableFunctions = void 0;
const chimera_1 = require("../core/chimera");
const ObjectMaker_1 = require("../utils/ObjectMaker");
exports.tableFunctions = {
    getById: (dbName, tableName, id) => {
        const tables = (0, chimera_1.getFile)(dbName).tables || {};
        const table = (0, ObjectMaker_1.convertTableToObjects)(tables[tableName]) || [];
        const result = table.find((row) => row.id === id);
        return result;
    },
    getByParams: (dbName, tableName, params) => {
        const tables = (0, chimera_1.getFile)(dbName).tables || {};
        const table = (0, ObjectMaker_1.convertTableToObjects)(tables[tableName]) || [];
        return table.filter((row) => {
            return Object.keys(params).every((key) => row[key] === params[key]);
        });
    },
    getByKeyValue: (dbName, tableName, key, value) => {
        const tables = (0, chimera_1.getFile)(dbName).tables || {};
        const table = (0, ObjectMaker_1.convertTableToObjects)(tables[tableName]) || [];
        return table.filter((row) => row[key] === value);
    },
    addRow: (dbName, tableName, row) => {
        const db = (0, chimera_1.getFile)(dbName);
        db.tables = db.tables || {};
        db.tables[tableName] = db.tables[tableName] || [];
        db.tables[tableName].push(row);
        (0, chimera_1.saveFile)(dbName, db);
    },
    updateRow: (dbName, tableName, id, newRow) => {
        const db = (0, chimera_1.getFile)(dbName);
        const tables = db.tables || {};
        const table = tables[tableName] || [];
        const index = table.findIndex((row) => row.id === id);
        if (index !== -1) {
            table[index] = { ...table[index], ...newRow };
            db.tables[tableName] = table;
            (0, chimera_1.saveFile)(dbName, db);
            return true;
        }
        return false;
    },
    deleteRow: (dbName, tableName, id) => {
        const db = (0, chimera_1.getFile)(dbName);
        const tables = db.tables || {};
        const table = (0, ObjectMaker_1.convertTableToObjects)(tables[tableName]) || [];
        const index = table.findIndex((row) => row.id === id);
        if (index !== -1) {
            table.splice(index, 1);
            const updatedTable = (0, ObjectMaker_1.convertObjectsToTable)('users', table);
            db.tables[tableName] = updatedTable.rows;
            (0, chimera_1.saveFile)(dbName, db);
            return true;
        }
        return false;
    },
};
//# sourceMappingURL=functions.js.map