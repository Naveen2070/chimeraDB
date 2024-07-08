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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = connect;
exports.create = create;
const chimera_1 = require("./chimera");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const functions_1 = __importDefault(require("../Documents/functions"));
const functions_2 = __importDefault(require("../Tables/functions"));
/**
 * Connects to an existing ChimeraDB database.
 *
 * This function creates an instance of ChimeraDB with bound functions by connecting to an existing database.
 * It takes the name of the database as a parameter and checks if the specified database exists.
 * If the specified database exists, it creates a proxy with a handler that binds the dbName to all function calls.
 * This proxy is then returned as an instance of ChimeraDB with bound functions.
 *
 * @example
 * // Connect to an existing database
 * const db = connect('my_database');
 * // Use the bound functions
 * db.createTable('users', ['id', 'name', 'email']);
 * db.insertIntoTable('users', [1, 'John Doe', 'john@example.com']);
 *
 * @param {string} dbName - The name of the database to connect to.
 * @returns {ChimeraDB & documentFunctionsType & tableFunctionsType} An instance of ChimeraDB with bound functions.
 * @throws {Error} Throws an error if the specified database does not exist.
 */
function connect(dbName) {
    // Resolve the file path of the database
    const filePath = path.resolve(process.cwd(), `${dbName}.cdb.db`);
    // Check if the database exists
    if (fs.existsSync(filePath)) {
        // Create a new instance of ChimeraDB with the specified dbName
        const dbInstance = new chimera_1.ChimeraDB(dbName);
        // Create a proxy handler that binds the dbName to all function calls
        const proxyHandler = {
            get(target, prop) {
                // If the property exists in the target object
                if (prop in target) {
                    const value = target[prop];
                    // If the value is a function, bind it to the target object
                    if (typeof value === 'function') {
                        return value.bind(target);
                    }
                    // Return the value as is
                    return value;
                }
                else if (prop in functions_1.default || prop in functions_2.default) {
                    // If the property exists in documentFunctions or tableFunctions, create a function that calls the corresponding function with the dbName and the provided arguments
                    const func = functions_1.default[prop] || functions_2.default[prop];
                    return (...args) => func(dbName, ...args);
                }
                else {
                    // Throw an error if the property does not exist
                    throw new Error(`Function ${prop} does not exist.`);
                }
            },
        };
        // Create a proxy of the combined dbInstance, documentFunctions, and tableFunctions objects with the proxy handler
        return new Proxy({ ...dbInstance, ...functions_1.default, ...functions_2.default }, proxyHandler);
    }
    else {
        // Throw an error if the database does not exist
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
 * console.log(db.dbName); // Output: my_database
 *
 * @param {string} dbName - The name of the database to create.
 * @returns {ChimeraDB} An instance of ChimeraDB.
 * @throws {Error} Throws an error if the specified database already exists.
 */
function create(dbName) {
    // Resolve the file path of the database
    const filePath = path.resolve(process.cwd(), `${dbName}.cdb.db`);
    // Check if the database already exists
    if (fs.existsSync(filePath)) {
        // Throw an error if the database already exists
        throw new Error(`Database ${dbName}.cdb.db already exists.`);
    }
    else {
        // Create a new instance of ChimeraDB with the specified dbName
        return new chimera_1.ChimeraDB(dbName);
    }
}
//# sourceMappingURL=operations.js.map