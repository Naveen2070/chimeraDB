"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChimeraDB = void 0;
const TableDatabase_1 = require("./Tables/TableDatabase");
const DocumentDatabase_1 = require("./Documents/DocumentDatabase");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
/**
 * Represents a ChimeraDB instance.
 *
 * @class ChimeraDB
 */
class ChimeraDB {
    /**
     * Database name.
     *
     * @private
     * @type {string}
     */
    dbName;
    /**
     * Table database.
     *
     * @private
     * @type {TableDatabase}
     */
    tableDB;
    /**
     * Document database.
     *
     * @private
     * @type {DocumentDatabase}
     */
    documentDB;
    /**
     * Creates an instance of ChimeraDB.
     *
     * @param {string} dbName - The name of the database.
     */
    constructor(dbName) {
        // Create an instance of TableDatabase and assign it to the tableDB property
        this.tableDB = new TableDatabase_1.TableDatabase();
        // Create an instance of DocumentDatabase and assign it to the documentDB property
        this.documentDB = new DocumentDatabase_1.DocumentDatabase();
        // Assign the provided database name to the dbName property
        this.dbName = dbName;
    }
    /**
     * Creates a new database file.
     *
     * @returns {void}
     */
    createDB() {
        // Resolve the file path for the database file
        const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);
        // Create an empty file in binary format
        fs.writeFileSync(filePath, '', 'binary');
        // Log that the database was created
        console.log(`Database ${this.dbName}.cdb created.`);
    }
    /**
     * Saves the database to a file in hex format.
     *
     * @returns {void}
     */
    saveDB() {
        // Resolve the file path for the database file
        const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);
        // Prepare the data to be saved
        const data = {
            tables: this.tableDB.getTables(), // Get the tables from the table database
            collections: this.documentDB.getCollections(), // Get the collections from the document database
        };
        // Convert the data to JSON string
        const jsonData = JSON.stringify(data);
        // Convert the JSON string to binary data
        const binaryData = Buffer.from(jsonData, 'utf-8');
        // Convert the binary data to hex format
        const hexData = binaryData.toString('hex');
        // Write the hex data to the file
        fs.writeFileSync(filePath, hexData, 'binary');
        // Log that the database was saved
        console.log(`Database ${this.dbName}.cdb saved.`);
    }
    /**
     * Loads an existing database file.
     *
     * @param {string} dbName - The name of the database to load.
     * @returns {void}
     */
    use(dbName) {
        // Resolve the file path for the database file
        const filePath = path.resolve(__dirname, `${dbName}.cdb`);
        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`Database ${dbName}.cdb does not exist.`);
        }
        // Read the file in binary format
        const hexData = fs.readFileSync(filePath, 'binary');
        // Convert the hex data to binary data
        const binaryData = Buffer.from(hexData, 'hex');
        // Convert the binary data to JSON format
        const jsonData = binaryData.toString('utf-8');
        // Parse the JSON data into an object
        const data = JSON.parse(jsonData);
        // Set the database name and tables/collections
        this.dbName = dbName;
        this.tableDB.setTables(data.tables);
        this.documentDB.setCollections(data.collections);
        // Log that the database was loaded
        console.log(`Database ${dbName}.cdb loaded.`);
    }
    /**
     * Creates a new table in the database.
     *
     * @param {string} name - Table name.
     * @param {string[]} columns - Columns of the table.
     * @returns {void}
     */
    createTable(name, columns) {
        this.tableDB.createTable(name, columns);
    }
    /**
     * Inserts a row of values into the specified table.
     *
     * @param {string} name - Table name to insert into.
     * @param {any[]} values - Values to insert into the table.
     * @returns {void}
     */
    insertIntoTable(name, values) {
        this.tableDB.insertIntoTable(name, values);
    }
    /**
     * Retrieves all rows from the specified table.
     *
     * @param {string} name - Table name to retrieve from.
     * @returns {any[][]} Array of rows in the specified table.
     */
    selectFromTable(name) {
        return this.tableDB.selectFromTable(name);
    }
    /**
     * Creates a new collection in the database.
     *
     * @param {string} name - Collection name.
     * @returns {void}
     */
    createCollection(name) {
        this.documentDB.createCollection(name);
    }
    /**
     * Inserts a document into the specified collection.
     *
     * @param {string} name - Collection name to insert into.
     * @param {any} doc - Document to insert.
     * @returns {void}
     */
    insertIntoCollection(name, doc) {
        this.documentDB.insertIntoCollection(name, doc);
    }
    /**
     * Retrieves all documents from the specified collection.
     *
     * @param {string} name - Collection name to retrieve from.
     * @returns {any[]} Array of documents in the specified collection.
     */
    selectFromCollection(name) {
        return this.documentDB.selectFromCollection(name);
    }
}
exports.ChimeraDB = ChimeraDB;
//# sourceMappingURL=chimera.js.map