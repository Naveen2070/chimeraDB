// src/Tables/tableOperations.ts

import { getFile, saveFile } from '../core/chimera';
import {
  convertObjectsToTable,
  convertTableToObjects,
} from '../utils/ObjectMaker';

/**
 * Represents a table row.
 *
 * @interface TableRow
 * @property {number} id - The id of the row.
 * @property {any} [key: string] - The value of a column.
 */
export interface TableRow {
  id: number;
  [key: string]: any;
}

/**
 * The type of table functions
 *
 * @interface tableFunctionsType
 * @property {(dbName: string, tableName: string, id: number) => TableRow | undefined} getById - Get a row by id
 * @property {(dbName: string, tableName: string, params: Partial<TableRow>) => TableRow[]} getByParams - Get rows by params
 * @property {(dbName: string, tableName: string, key: string, value: any) => TableRow[]} getByKeyValue - Get rows by key value
 * @property {(dbName: string, tableName: string, row: TableRow) => void} addRow - Add a row
 * @property {(dbName: string, tableName: string, id: number, newRow: Partial<TableRow>) => boolean} updateRow - Update a row
 * @property {(dbName: string, tableName: string, id: number) => boolean} deleteRow - Delete a row
 */
export type tableFunctionsType = {
  /**
   * Get a row by id
   * @example
   * tableFunctions.getById('databaseName', 'tableName', 1);
   * @param {string} dbName - The name of the database. Default to binded db
   * @param {string} tableName - The name of the table
   * @param {number} id - The id of the row
   * @returns {TableRow | undefined} The row or undefined if not found
   */
  getById: (
    dbName: string,
    tableName: string,
    id: number
  ) => TableRow | undefined;
  /**
   * Get rows by params
   * @example
   * tableFunctions.getByParams('databaseName', 'tableName', {key: 'value'});
   * @param {string} dbName - The name of the database. Default to binded db
   * @param {string} tableName - The name of the table
   * @param {Partial<TableRow>} params - The params to search for
   * @returns {TableRow[]} The array of rows which match the params
   */
  getByParams: (
    dbName: string,
    tableName: string,
    params: Partial<TableRow>
  ) => TableRow[];
  /**
   * Get rows by key value
   * @example
   * tableFunctions.getByKeyValue('databaseName', 'tableName', 'key', 'value');
   * @param {string} dbName - The name of the database. Default to binded db
   * @param {string} tableName - The name of the table
   * @param {string} key - The key to search for
   * @param {any} value - The value to search for
   * @returns {TableRow[]} The array of rows which match the key value
   */
  getByKeyValue: (
    dbName: string,
    tableName: string,
    key: string,
    value: any
  ) => TableRow[];
  /**
   * Add a row
   * @example
   * tableFunctions.addRow('databaseName', 'tableName', {id: 1, key: 'value'});
   * @param {string} dbName - The name of the database. Default to binded db
   * @param {string} tableName - The name of the table
   * @param {TableRow} row - The row to add
   */
  addRow: (dbName: string, tableName: string, row: TableRow) => void;
  /**
   * Update a row
   * @example
   * tableFunctions.updateRow('databaseName', 'tableName', 1, {key: 'newValue'});
   * @param {string} dbName - The name of the database. Default to binded db
   * @param {string} tableName - The name of the table
   * @param {number} id - The id of the row
   * @param {Partial<TableRow>} newRow - The new values for the row
   * @returns {boolean} True if the row was updated, false otherwise
   */
  updateRow: (
    dbName: string,
    tableName: string,
    id: number,
    newRow: Partial<TableRow>
  ) => boolean;
  /**
   * Delete a row
   * @example
   * tableFunctions.deleteRow('databaseName', 'tableName', 1);
   * @param {string} dbName - The name of the database. Default to binded db
   * @param {string} tableName - The name of the table
   * @param {number} id - The id of the row
   * @returns {boolean} True if the row was deleted, false otherwise
   */
  deleteRow: (dbName: string, tableName: string, id: number) => boolean;
};

export const tableFunctions: tableFunctionsType = {
  getById: (
    dbName: string,
    tableName: string,
    id: number
  ): TableRow | undefined => {
    const tables = getFile(dbName).tables || {};
    const table = convertTableToObjects(tables[tableName]) || [];
    const result = table.find((row: TableRow) => row.id === id);
    return result;
  },
  getByParams: (
    dbName: string,
    tableName: string,
    params: Partial<TableRow>
  ): TableRow[] => {
    const tables = getFile(dbName).tables || {};
    const table = convertTableToObjects(tables[tableName]) || [];
    return table.filter((row: TableRow) => {
      return Object.keys(params).every((key) => row[key] === params[key]);
    });
  },
  getByKeyValue: (
    dbName: string,
    tableName: string,
    key: string,
    value: any
  ): TableRow[] => {
    const tables = getFile(dbName).tables || {};
    const table = convertTableToObjects(tables[tableName]) || [];
    return table.filter((row: TableRow) => row[key] === value);
  },
  addRow: (dbName: string, tableName: string, row: TableRow): void => {
    const db = getFile(dbName);
    db.tables = db.tables || {};
    db.tables[tableName] = db.tables[tableName] || [];
    db.tables[tableName].push(row);
    saveFile(dbName, db);
  },
  updateRow: (
    dbName: string,
    tableName: string,
    id: number,
    newRow: Partial<TableRow>
  ): boolean => {
    const db = getFile(dbName);
    const tables = db.tables || {};
    const table = tables[tableName] || [];
    const index = table.findIndex((row: TableRow) => row.id === id);
    if (index !== -1) {
      table[index] = { ...table[index], ...newRow };
      db.tables[tableName] = table;
      saveFile(dbName, db);
      return true;
    }
    return false;
  },
  deleteRow: (dbName: string, tableName: string, id: number): boolean => {
    const db = getFile(dbName);
    const tables = db.tables || {};
    const table = convertTableToObjects(tables[tableName]) || [];
    const index = table.findIndex((row: TableRow) => row.id === id);
    if (index !== -1) {
      table.splice(index, 1);
      const updatedTable = convertObjectsToTable('users', table);
      db.tables[tableName] = updatedTable.rows;
      saveFile(dbName, db);
      return true;
    }
    return false;
  },
};
