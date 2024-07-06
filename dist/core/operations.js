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
exports.connect = connect;
exports.create = create;
const chimera_1 = require("./chimera");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Connects to an existing ChimeraDB database.
 *
 * This function takes the name of the database as a parameter and returns an instance of ChimeraDB.
 * If the specified database does not exist, it throws an error.
 *
 * @example
 * // Connect to an existing database
 * const db = connect('my_database');
 *
 * @param {string} dbName - The name of the database to connect to.
 * @returns {ChimeraDB} An instance of ChimeraDB.
 * @throws {Error} Throws an error if the specified database does not exist.
 */
function connect(dbName) {
    const filePath = path.resolve(process.cwd(), `${dbName}.cdb.db`);
    if (fs.existsSync(filePath)) {
        return new chimera_1.ChimeraDB(dbName);
    }
    else {
        throw new Error(`Database ${dbName}.cdb.db does not exist.`);
    }
}
/**
 * Creates a new database.
 *
 * This function takes the name of the database as a parameter and returns an instance of ChimeraDB.
 * If the specified database already exists, it throws an error.
 *
 * @example
 * // Create a new database
 * const db = create('my_database');
 *
 * @param {string} dbName - The name of the database to create.
 * @returns {ChimeraDB} An instance of ChimeraDB.
 * @throws {Error} Throws an error if the specified database already exists.
 */
function create(dbName) {
    const filePath = path.resolve(process.cwd(), `${dbName}.cdb.db`);
    if (fs.existsSync(filePath)) {
        throw new Error(`Database ${dbName}.cdb.db already exists.`);
    }
    else {
        return new chimera_1.ChimeraDB(dbName);
    }
}
//# sourceMappingURL=operations.js.map