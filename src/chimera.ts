import { TableDatabase } from './Tables/TableDatabase';
import { DocumentDatabase } from './Documents/DocumentDatabase';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Represents a ChimeraDB instance.
 *
 * @class ChimeraDB
 */
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
   * Constructs a new instance of ChimeraDB.
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
    // Resolve the file path
    const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);

    // Write an empty string to the file
    fs.writeFileSync(filePath, '', 'binary');

    // Log that the database was created
    console.log(`Database ${this.dbName}.cdb created.`);
  }

  /**
   * Saves the database to a file.
   *
   * @returns {void}
   */
  private saveDB(): void {
    // Resolve the file path
    const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);

    // Get the tables and collections from the databases
    const data = {
      tables: this.tableDB.getTables(),
      collections: this.documentDB.getCollections(),
    };

    // Convert the data to JSON format
    const jsonData = JSON.stringify(data);

    // Convert the JSON data to a binary buffer
    const binaryData = Buffer.from(jsonData, 'utf-8');

    // Convert the binary buffer to a hexadecimal string
    const hexData = binaryData.toString('hex');

    // Write the hexadecimal string to the file
    fs.writeFileSync(filePath, hexData, 'binary');
  }

  /**
   * Loads the database from a file.
   *
   * @returns {void}
   */
  private loadDB(): void {
    // Resolve the file path
    const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`Database ${this.dbName}.cdb does not exist.`);
    }

    // Read the file as a binary buffer
    const hexData = fs.readFileSync(filePath, 'binary');

    // Convert the binary buffer to a binary buffer
    const binaryData = Buffer.from(hexData, 'hex');

    // Convert the binary buffer to a string
    const jsonData = binaryData.toString('utf-8');

    // Parse the JSON string into an object
    const data = JSON.parse(jsonData);

    // Set the tables and collections in the databases
    this.tableDB.setTables(data.tables);
    this.documentDB.setCollections(data.collections);
  }

  /**
   * Creates a new table in the database.
   *
   * @param {string} name - The name of the table.
   * @param {string[]} columns - The columns of the table.
   * @returns {void}
   */
  createTable(name: string, columns: string[]): void {
    // Load the database
    this.loadDB();

    // Create the table
    this.tableDB.createTable(name, columns);

    // Save the database
    this.saveDB();
  }

  /**
   * Inserts a row of values into the specified table.
   *
   * @param {string} name - The name of the table to insert into.
   * @param {any[]} values - The values to insert into the table.
   * @returns {void}
   */
  insertIntoTable(name: string, values: any[]): void {
    // Load the database
    this.loadDB();

    // Insert the values into the table
    this.tableDB.insertIntoTable(name, values);

    // Save the database
    this.saveDB();
  }

  /**
   * Retrieves all rows from the specified table.
   *
   * @param {string} name - The name of the table to retrieve from.
   * @returns {any[][]} An array of rows in the specified table.
   */
  selectFromTable(name: string): any[][] {
    // Load the database
    this.loadDB();

    // Retrieve the rows from the table
    return this.tableDB.selectFromTable(name);
  }

  /**
   * Creates a new collection in the database.
   *
   * @param {string} name - The name of the collection.
   * @returns {void}
   */
  createCollection(name: string): void {
    // Load the database
    this.loadDB();

    // Create the collection
    this.documentDB.createCollection(name);

    // Save the database
    this.saveDB();
  }

  /**
   * Inserts a document into the specified collection.
   *
   * @param {string} name - The name of the collection to insert into.
   * @param {any} doc - The document to insert.
   * @returns {void}
   */
  insertIntoCollection(name: string, doc: any): void {
    // Load the database
    this.loadDB();

    // Insert the document into the collection
    this.documentDB.insertIntoCollection(name, doc);

    // Save the database
    this.saveDB();
  }

  /**
   * Retrieves all documents from the specified collection.
   *
   * @param {string} name - The name of the collection to retrieve from.
   * @returns {any[]} An array of documents in the specified collection.
   */
  selectFromCollection(name: string): any[] {
    // Load the database
    this.loadDB();

    // Retrieve the documents from the collection
    return this.documentDB.selectFromCollection(name);
  }

  /**
   * Loads an existing database file.
   *
   * @param {string} dbName - The name of the database to load.
   * @returns {void}
   */
  use(dbName: string): void {
    // Resolve the file path
    const filePath = path.resolve(__dirname, `${dbName}.cdb`);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`Database ${dbName}.cdb does not exist.`);
    }

    // Read the file as a binary buffer
    const hexData = fs.readFileSync(filePath, 'binary');

    // Convert the binary buffer to a binary buffer
    const binaryData = Buffer.from(hexData, 'hex');

    // Convert the binary buffer to a string
    const jsonData = binaryData.toString('utf-8');

    // Parse the JSON string into an object
    const data = JSON.parse(jsonData);

    // Set the database name and tables and collections in the databases
    this.dbName = dbName;
    this.tableDB.setTables(data.tables);
    this.documentDB.setCollections(data.collections);

    // Log that the database was loaded
    console.log(`Database ${dbName}.cdb loaded.`);
  }
}

export { ChimeraDB };
