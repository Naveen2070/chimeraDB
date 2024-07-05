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
    tableDB;
    documentDB;
    dbName;
    currentLogicalDB = null;
    constructor(dbName) {
        this.tableDB = new TableDatabase_1.TableDatabase();
        this.documentDB = new DocumentDatabase_1.DocumentDatabase();
        this.dbName = dbName;
        this.createPhysicalDB();
    }
    /**
     * Creates a new physical .cdb file.
     *
     * @returns {Promise<void>}
     */
    async createPhysicalDB() {
        const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);
        if (!fs.existsSync(filePath)) {
            await fs.promises.writeFile(filePath, JSON.stringify({}), 'binary');
            console.log(`Physical database file ${this.dbName}.cdb created.`);
        }
    }
    /**
     * Drops (deletes) the physical database file.
     *
     * @returns {Promise<void>}
     */
    async dropDatabaseGroup() {
        const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);
        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
            console.log(`Physical database group ${this.dbName}.cdb deleted.`);
        }
        else {
            throw new Error(`Physical database group ${this.dbName}.cdb does not exist.`);
        }
    }
    /**
     * Drops (deletes) a logical database from the physical .cdb file.
     *
     * @param {string} logicalDBName - The name of the logical database to drop.
     * @returns {Promise<void>}
     */
    async dropDatabase(logicalDBName) {
        const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);
        const dbData = JSON.parse(await fs.promises.readFile(filePath, 'binary'));
        if (!dbData[logicalDBName]) {
            throw new Error(`Logical database ${logicalDBName} does not exist.`);
        }
        delete dbData[logicalDBName];
        await fs.promises.writeFile(filePath, JSON.stringify(dbData), 'binary');
        console.log(`Logical database ${logicalDBName} dropped.`);
    }
    /**
     * Saves the current logical database to the physical .cdb file.
     *
     * @returns {Promise<void>}
     */
    async saveDB() {
        if (!this.currentLogicalDB) {
            console.error('No logical database selected.');
            return;
        }
        const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);
        const data = {
            tables: this.tableDB.getTables(),
            collections: this.documentDB.getCollections(),
        };
        const hexData = Buffer.from(JSON.stringify(data), 'utf-8').toString('hex');
        const dbData = JSON.parse(await fs.promises.readFile(filePath, 'binary'));
        dbData[this.currentLogicalDB] = hexData;
        await fs.promises.writeFile(filePath, JSON.stringify(dbData), 'binary');
    }
    /**
     * Loads the current logical database from the physical .cdb file.
     *
     * @returns {Promise<void>}
     */
    async loadDB() {
        if (!this.currentLogicalDB) {
            console.error('No logical database selected.');
            return;
        }
        const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);
        const dbData = JSON.parse(await fs.promises.readFile(filePath, 'binary'));
        if (!dbData[this.currentLogicalDB]) {
            throw new Error(`Logical database ${this.currentLogicalDB} does not exist.`);
        }
        const hexData = dbData[this.currentLogicalDB];
        const jsonData = Buffer.from(hexData, 'hex').toString('utf-8');
        const data = JSON.parse(jsonData);
        this.tableDB.setTables(data.tables);
        this.documentDB.setCollections(data.collections);
    }
    /**
     * Connects to an existing physical .cdb file.
     *
     * @param {string} dbName - The name of the physical database to connect to.
     * @returns {Promise<void>}
     */
    async connect(dbName) {
        const filePath = path.resolve(__dirname, `${dbName}.cdb`);
        if (!fs.existsSync(filePath)) {
            throw new Error(`Physical database file ${dbName}.cdb does not exist.`);
        }
        this.dbName = dbName;
        console.log(`Connected to physical database ${dbName}.cdb.`);
    }
    /**
     * Creates a new logical database within the physical .cdb file.
     *
     * @param {string} logicalDBName - The name of the logical database to create.
     * @returns {Promise<void>}
     */
    async createDB(logicalDBName) {
        const filePath = path.resolve(__dirname, `${this.dbName}.cdb`);
        const dbData = JSON.parse(await fs.promises.readFile(filePath, 'binary'));
        if (dbData[logicalDBName]) {
            throw new Error(`Logical database ${logicalDBName} already exists.`);
        }
        dbData[logicalDBName] = '';
        await fs.promises.writeFile(filePath, JSON.stringify(dbData), 'binary');
        console.log(`Logical database ${logicalDBName} created.`);
    }
    /**
     * Uses a logical database within the physical .cdb file.
     *
     * @param {string} logicalDBName - The name of the logical database to use.
     * @returns {Promise<void>}
     */
    async use(logicalDBName) {
        this.currentLogicalDB = logicalDBName;
        await this.loadDB();
        console.log(`Using logical database ${logicalDBName}.`);
    }
    /**
     * Creates a new table in the current logical database.
     *
     * @param {string} name - The name of the table.
     * @param {string[]} columns - The columns of the table.
     * @returns {Promise<void>}
     */
    async createTable(name, columns) {
        await this.loadDB();
        this.tableDB.createTable(name, columns);
        await this.saveDB();
    }
    /**
     * Inserts a row of values into the specified table.
     *
     * @param {string} name - The name of the table to insert into.
     * @param {any[]} values - The values to insert into the table.
     * @returns {Promise<void>}
     */
    async insertIntoTable(name, values) {
        await this.loadDB();
        this.tableDB.insertIntoTable(name, values);
        await this.saveDB();
    }
    /**
     * Retrieves all rows from the specified table.
     *
     * @param {string} name - The name of the table to retrieve from.
     * @returns {Promise<any[][]>}
     */
    async selectFromTable(name) {
        await this.loadDB();
        return this.tableDB.selectFromTable(name);
    }
    /**
     * Creates a new collection in the current logical database.
     *
     * @param {string} name - The name of the collection.
     * @returns {Promise<void>}
     */
    async createCollection(name) {
        await this.loadDB();
        this.documentDB.createCollection(name);
        await this.saveDB();
    }
    /**
     * Inserts a document into the specified collection.
     *
     * @param {string} name - The name of the collection to insert into.
     * @param {any} doc - The document to insert.
     * @returns {Promise<void>}
     */
    async insertIntoCollection(name, doc) {
        await this.loadDB();
        this.documentDB.insertIntoCollection(name, doc);
        await this.saveDB();
    }
    /**
     * Retrieves all documents from the specified collection.
     *
     * @param {string} name - The name of the collection to retrieve from.
     * @returns {Promise<any[]>}
     */
    async selectFromCollection(name) {
        await this.loadDB();
        return this.documentDB.selectFromCollection(name);
    }
    /**
     * Drops a table from the current logical database.
     *
     * @param {string} name - The name of the table to drop.
     * @returns {Promise<void>}
     */
    async dropTable(name) {
        await this.loadDB();
        this.tableDB.dropTable(name);
        await this.saveDB();
    }
    /**
     * Drops a collection from the current logical database.
     *
     * @param {string} name - The name of the collection to drop.
     * @returns {Promise<void>}
     */
    async dropCollection(name) {
        await this.loadDB();
        this.documentDB.dropCollection(name);
        await this.saveDB();
    }
}
exports.ChimeraDB = ChimeraDB;
//# sourceMappingURL=chimera.js.map