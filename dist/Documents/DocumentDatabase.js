"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentDatabase = void 0;
/**
 * Represents a database of documents.
 *
 * @class DocumentDatabase
 * @export
 */
class DocumentDatabase {
    /**
     * A map of collection names to arrays of documents.
     */
    collections = {};
    /**
     * Creates a new collection with the given name.
     *
     * @param {string} name - The name of the collection.
     * @throws {Error} Throws an error if a collection with the given name already exists.
     */
    createCollection(name) {
        if (this.collections[name]) {
            throw new Error(`Collection ${name} already exists.`);
        }
        this.collections[name] = [];
    }
    /**
     * Inserts a document into the specified collection.
     *
     * @param {string} name - The name of the collection to insert into.
     * @param {Document} doc - The document to insert.
     * @throws {Error} Throws an error if the collection does not exist.
     */
    insertIntoCollection(name, doc) {
        const collection = this.collections[name];
        if (!collection) {
            throw new Error(`Collection ${name} does not exist.`);
        }
        collection.push(doc);
    }
    /**
     * Retrieves all documents from the specified collection.
     *
     * @param {string} name - The name of the collection to retrieve from.
     * @throws {Error} Throws an error if the collection does not exist.
     * @returns {Document[]} An array of documents in the specified collection.
     */
    selectFromCollection(name) {
        const collection = this.collections[name];
        if (!collection) {
            throw new Error(`Collection ${name} does not exist.`);
        }
        return collection;
    }
    /**
     * Retrieves all collections in the database.
     *
     * @returns {{
     *     [key: string]: Document[];
     * }} A map of collection names to arrays of documents.
     */
    getCollections() {
        return this.collections;
    }
}
exports.DocumentDatabase = DocumentDatabase;
//# sourceMappingURL=DocumentDatabase.js.map