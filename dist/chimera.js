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
class ChimeraDB {
    /**
     * The table database instance.
     *
     * @private
     * @type {TableDatabase}
     */
    tableDB;
    /**
     * The document database instance.
     *
     * @private
     * @type {DocumentDatabase}
     */
    documentDB;
    /**
     * The name of the database.
     *
     * @private
     * @type {string}
     */
    dbName;
    /**
     * Creates an instance of ChimeraDB.
     *
     * @constructor
     * @param {string} dbName - The name of the database.
     */
    constructor(dbName) {
        this.tableDB = new TableDatabase_1.TableDatabase();
        this.documentDB = new DocumentDatabase_1.DocumentDatabase();
        this.dbName = dbName;
    }
    /**
     * Creates a new database file.
     *
     * @returns {void}
     */
    createDB() {
        const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);
        fs.writeFileSync(filePath, '', 'binary');
        console.log(`Database ${this.dbName}.cdb created.`);
    }
    /**
     * Saves the database to a file.
     *
     * @returns {void}
     */
    saveDB() {
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
    createTable(name, columns) {
        this.tableDB.createTable(name, columns);
    }
    /**
     * Inserts a row of values into the specified table.
     *
     * @param {string} name - The name of the table to insert into.
     * @param {any[]} values - The values to insert into the table.
     * @returns {void}
     */
    insertIntoTable(name, values) {
        this.tableDB.insertIntoTable(name, values);
    }
    /**
     * Retrieves all rows from the specified table.
     *
     * @param {string} name - The name of the table to retrieve from.
     * @returns {any[][]} An array of rows in the specified table.
     */
    selectFromTable(name) {
        return this.tableDB.selectFromTable(name);
    }
    /**
     * Creates a new collection in the database.
     *
     * @param {string} name - The name of the collection.
     * @returns {void}
     */
    createCollection(name) {
        this.documentDB.createCollection(name);
    }
    /**
     * Inserts a document into the specified collection.
     *
     * @param {string} name - The name of the collection to insert into.
     * @param {any} doc - The document to insert.
     * @returns {void}
     */
    insertIntoCollection(name, doc) {
        this.documentDB.insertIntoCollection(name, doc);
    }
    /**
     * Retrieves all documents from the specified collection.
     *
     * @param {string} name - The name of the collection to retrieve from.
     * @returns {any[]} An array of documents in the specified collection.
     */
    selectFromCollection(name) {
        return this.documentDB.selectFromCollection(name);
    }
}
exports.ChimeraDB = ChimeraDB;
//# sourceMappingURL=chimera.js.map