import { TableDatabase } from '../Tables/TableDatabase';
import { DocumentDatabase } from '../Documents/DocumentDatabase';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Interface for the data of a database.
 *
 * @interface DBData
 * @example
 * {
 *   tables: {
 *     users: {
 *       name: 'string',
 *       age: 'number',
 *       email: 'string'
 *     },
 *     posts: {
 *       title: 'string',
 *       content: 'string',
 *       authorId: 'number'
 *     }
 *   },
 *   collections: {
 *     users: [
 *       { name: 'John', age: 25, email: 'john@example.com' },
 *       { name: 'Jane', age: 30, email: 'jane@example.com' }
 *     ],
 *     posts: [
 *       { title: 'Hello World', content: 'This is my first post', authorId: 1 },
 *       { title: 'Another Post', content: 'This is another post', authorId: 2 }
 *     ]
 *   }
 * }
 */
interface DBData {
  /**
   * An object containing the tables in the database.
   * The keys are the table names and the values are the table schemas.
   *
   * @type {Record<string, any>}
   */
  tables: Record<string, any>;

  /**
   * An object containing the collections in the database.
   * The keys are the collection names and the values are the collections.
   *
   * @type {Record<string, any>}
   */
  collections: Record<string, any>;
}

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
   * An instance of TableDatabase.
   *
   * @type {TableDatabase}
   */
  private tableDB: TableDatabase;

  /**
   * An instance of DocumentDatabase.
   *
   * @type {DocumentDatabase}
   */
  private documentDB: DocumentDatabase;

  /**
   * The name of the database.
   *
   * @type {string}
   */
  private dbName: string;

  /**
   * Creates an instance of ChimeraDB.
   *
   * @param {string} dbName  The name of the database.
   */

  constructor(dbName: string) {
    this.tableDB = new TableDatabase();
    this.documentDB = new DocumentDatabase();
    this.dbName = dbName;
    this.initializeDB();
  }

  /**
   * Initializes the database. If the database file exists, it loads the data from it.
   * If the database file does not exist, it creates a new file.
   *
   * @returns {void}
   */
  private initializeDB(): void {
    const filePath = path.resolve(process.cwd(), `${this.dbName}.cdb.db`);
    if (fs.existsSync(filePath)) {
      this.loadDB();
    } else {
      this.saveDB();
      console.log(`Database ${this.dbName}.cdb.db created.`);
    }
  }

  /**
   * Saves the database to the physical .cdb.db file.
   *
   * @returns {void}
   */
  private saveDB(): void {
    const filePath = path.resolve(process.cwd(), `${this.dbName}.cdb.db`);
    const data = {
      tables: this.tableDB.getTables(),
      collections: this.documentDB.getCollections(),
    };

    fs.writeFileSync(filePath, JSON.stringify(data), 'binary');
  }

  /**
   * Loads the database from the physical .cdb.db file.
   *
   * @returns {void}
   */
  private loadDB(): void {
    const filePath = path.resolve(process.cwd(), `${this.dbName}.cdb.db`);
    if (fs.existsSync(filePath)) {
      const dbData: DBData = JSON.parse(fs.readFileSync(filePath, 'binary'));
      this.tableDB.setTables(dbData.tables);
      this.documentDB.setCollections(dbData.collections);
    }
  }

  /**
   * Creates a new table in the database.
   *
   * @param {string} name - The name of the table.
   * @param {string[]} columns - The columns of the table.
   * @example
   * // Create a new table
   * const db = new ChimeraDB('my_database');
   * db.createTable('users', ['id', 'name', 'email']);
   * @returns {void}
   */
  createTable(name: string, columns: string[]): void {
    this.tableDB.createTable(name, columns);
    this.saveDB();
  }

  /**
   * Inserts a row of values into the specified table.
   *
   * @param {string} name - The name of the table to insert into.
   * @param {any[]} values - The values to insert into the table.
   * @example
   * // Insert a row of values into the 'users' table
   * const db = new ChimeraDB('my_database');
   * db.insertIntoTable('users', [1, 'John Doe', 'john@example.com']);
   * @returns {void}
   */
  insertIntoTable(name: string, values: any[]): void {
    this.tableDB.insertIntoTable(name, values);
    this.saveDB();
  }

  /**
   * Retrieves all rows from the specified table.
   *
   * @param {string} name - The name of the table to retrieve from.
   * @example
   * // Retrieve all rows from the 'users' table
   * const db = new ChimeraDB('my_database');
   * const users = db.selectFromTable('users');
   * console.log(users);
   * @returns {any[][]} An array of rows in the specified table.
   */
  selectFromTable(name: string): any[][] {
    return this.tableDB.selectFromTable(name);
  }

  /**
   * Creates a new collection in the database.
   *
   * @param {string} name - The name of the collection.
   * @example
   * // Create a new collection
   * const db = new ChimeraDB('my_database');
   * db.createCollection('posts');
   * @returns {void}
   */
  createCollection(name: string): void {
    this.documentDB.createCollection(name);
    this.saveDB();
  }

  /**
   * Inserts a document into the specified collection.
   *
   * @param {string} name - The name of the collection to insert into.
   * @param {any} doc - The document to insert.
   * @example
   * // Insert a document into the 'posts' collection
   * const db = new ChimeraDB('my_database');
   * db.insertIntoCollection('posts', { title: 'Hello World', content: 'This is my first post' });
   * @returns {void}
   */
  insertIntoCollection(name: string, doc: any): void {
    this.documentDB.insertIntoCollection(name, doc);
    this.saveDB();
  }

  /**
   * Retrieves all documents from the specified collection.
   *
   * @param {string} name - The name of the collection to retrieve from.
   * @example
   *  Retrieve all documents from the 'posts' collection
   * const db = new ChimeraDB('my_database');
   * const posts = db.selectFromCollection('posts');
   * console.log(posts);
   * Output:
   * [
   *   { title: 'Hello World', content: 'This is my first post' },
   *   { title: 'Another Post', content: 'This is another post' },
   *    ...
   *  ]
   * @returns {any[]} An array of documents in the specified collection.
   */
  selectFromCollection(name: string): any[] {
    /**
     * Retrieves all documents from the specified collection.
     *
     * @param {string} name - The name of the collection to retrieve from.
     * @returns {any[]} An array of documents in the specified collection.
     */
    return this.documentDB.selectFromCollection(name);
  }

  /**
   * Drops a table from the database.
   *
   * @param {string} name - The name of the table to drop.
   * @example
   * // Drop the 'users' table
   * const db = new ChimeraDB('my_database');
   * db.dropTable('users');
   *
   * @example
   * // Drop multiple tables
   * const db = new ChimeraDB('my_database');
   * db.dropTable('users');
   * db.dropTable('products');
   *
   * @returns {void}
   */
  dropTable(name: string): void {
    this.tableDB.dropTable(name);
    this.saveDB();
  }

  /**
   * Drops a collection from the database.
   *
   * @param {string} name - The name of the collection to drop.
   * @example
   * // Drop the 'posts' collection
   * const db = new ChimeraDB('my_database');
   * db.dropCollection('posts');
   *
   * @example
   * // Drop multiple collections
   * const db = new ChimeraDB('my_database');
   * db.dropCollection('posts');
   * db.dropCollection('comments');
   *
   * @returns {void}
   */
  /**
   * Drops a collection from the database.
   *
   * @param {string} name - The name of the collection to drop.
   * @returns {void}
   */
  dropCollection(name: string): void {
    this.documentDB.dropCollection(name);
    this.saveDB();
  }

  /**
   * Drops the entire database by deleting the .cdb.db file.
   *
   * This function drops the entire database by deleting the .cdb.db file.
   * The database is deleted from the file system, so all data in the database
   * is permanently lost.
   *
   * @example
   * // Drop the entire database
   * const db = new ChimeraDB('my_database');
   * db.dropDatabase();
   * console.log('Database deleted.');
   *
   * @returns {void}
   */
  dropDatabase(): void {
    const filePath = path.resolve(process.cwd(), `${this.dbName}.cdb.db`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`Database ${this.dbName}.cdb.db deleted.`);
    } else {
      console.error(`Database ${this.dbName}.cdb.db does not exist.`);
    }
  }
}

export { ChimeraDB };
