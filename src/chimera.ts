import { TableDatabase } from './Tables/TableDatabase';
import { DocumentDatabase } from './Documents/DocumentDatabase';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Represents a ChimeraDB instance.
 *
 * @class ChimeraDB
 */
class ChimeraDB {
  /**
   * The table database instance.
   *
   * @private
   * @type {TableDatabase}
   */
  private tableDB: TableDatabase;

  /**
   * The document database instance.
   *
   * @private
   * @type {DocumentDatabase}
   */
  private documentDB: DocumentDatabase;

  /**
   * The name of the database.
   *
   * @private
   * @type {string}
   */
  private dbName: string;

  /**
   * Creates an instance of ChimeraDB.
   *
   * @constructor
   * @param {string} dbName - The name of the database.
   */
  constructor(dbName: string) {
    this.tableDB = new TableDatabase();
    this.documentDB = new DocumentDatabase();
    this.dbName = dbName;
  }

  /**
   * Creates a new database file.
   *
   * @returns {void}
   */
  createDB(): void {
    const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);
    fs.writeFileSync(filePath, '', 'binary');
    console.log(`Database ${this.dbName}.cdb created.`);
  }

  /**
   * Saves the database to a file.
   *
   * @returns {void}
   */
  saveDB(): void {
    const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);
    const data = {
      tables: this.tableDB.getTables(),
      collections: this.documentDB.getCollections(),
    };
    const binaryData = Buffer.from(JSON.stringify(data), 'utf-8');
    fs.writeFileSync(filePath, binaryData);
    console.log(`Database ${this.dbName}.cdb saved.`);
  }

  /**
   * Creates a new table in the database.
   *
   * @param {string} name - The name of the table.
   * @param {string[]} columns - The columns of the table.
   * @returns {void}
   */
  createTable(name: string, columns: string[]): void {
    this.tableDB.createTable(name, columns);
  }

  /**
   * Inserts a row of values into the specified table.
   *
   * @param {string} name - The name of the table to insert into.
   * @param {any[]} values - The values to insert into the table.
   * @returns {void}
   */
  insertIntoTable(name: string, values: any[]): void {
    this.tableDB.insertIntoTable(name, values);
  }

  /**
   * Retrieves all rows from the specified table.
   *
   * @param {string} name - The name of the table to retrieve from.
   * @returns {any[][]} An array of rows in the specified table.
   */
  selectFromTable(name: string): any[][] {
    return this.tableDB.selectFromTable(name);
  }

  /**
   * Creates a new collection in the database.
   *
   * @param {string} name - The name of the collection.
   * @returns {void}
   */
  createCollection(name: string): void {
    this.documentDB.createCollection(name);
  }

  /**
   * Inserts a document into the specified collection.
   *
   * @param {string} name - The name of the collection to insert into.
   * @param {any} doc - The document to insert.
   * @returns {void}
   */
  insertIntoCollection(name: string, doc: any): void {
    this.documentDB.insertIntoCollection(name, doc);
  }

  /**
   * Retrieves all documents from the specified collection.
   *
   * @param {string} name - The name of the collection to retrieve from.
   * @returns {any[]} An array of documents in the specified collection.
   */
  selectFromCollection(name: string): any[] {
    return this.documentDB.selectFromCollection(name);
  }
}

export { ChimeraDB };
