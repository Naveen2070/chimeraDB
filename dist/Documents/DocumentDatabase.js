"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentDatabase = void 0;
/**
 * Represents a database of documents.
 */
/**
 * Represents a database of documents.
 */
class DocumentDatabase {
    /**
     * Maps collection names to arrays of documents.
     * @example
     * const db = new DocumentDatabase();
     * console.log(db.collections); // Output: {}
     */
    collections = {};
    /**
     * Creates a new collection with the given name.
     *
     * @param {string} name - The name of the collection.
     * @throws {Error} Throws an error if a collection with the given name already exists.
     * @example
     * const db = new DocumentDatabase();
     * db.createCollection('posts');
     * console.log(db.collections); // Output: { posts: [] }
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
     * @example
     * const db = new DocumentDatabase();
     * db.createCollection('posts');
     * const doc = new Document({ title: 'Hello World', content: 'This is my first post' });
     * db.insertIntoCollection('posts', doc);
     * console.log(db.collections.posts); // Output: [{ title: 'Hello World', content: 'This is my first post' }]
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
     * @example
     * const db = new DocumentDatabase();
     * db.createCollection('posts');
     * const doc1 = new Document({ title: 'Hello World', content: 'This is my first post' });
     * const doc2 = new Document({ title: 'Another Post', content: 'This is another post' });
     * db.insertIntoCollection('posts', doc1);
     * db.insertIntoCollection('posts', doc2);
     * const posts = db.selectFromCollection('posts');
     * console.log(posts); // Output: [{ title: 'Hello World', content: 'This is my first post' }, { title: 'Another Post', content: 'This is another post' }]
     */
    selectFromCollection(name) {
        const collection = this.collections[name];
        if (!collection) {
            throw new Error(`Collection ${name} does not exist.`);
        }
        return collection;
    }
    /**
     * Drops (deletes) a collection from the database.
     *
     * @param {string} name - The name of the collection to drop.
     * @returns {void}
     * @example
     * const db = new DocumentDatabase();
     * db.createCollection('posts');
     * db.dropCollection('posts');
     * console.log(db.collections); // Output: {}
     */
    dropCollection(name) {
        if (!this.collections[name]) {
            throw new Error(`Collection ${name} does not exist.`);
        }
        delete this.collections[name];
    }
    /**
     * Retrieves all collections in the database.
     *
     * @returns {{
     *     [key: string]: Document[];
     * }} A map of collection names to arrays of documents.
     * @example
     * const db = new DocumentDatabase();
     * db.createCollection('posts');
     * const collections = db.getCollections();
     * console.log(collections); // Output: { posts: [] }
     */
    getCollections() {
        return this.collections;
    }
    /**
     * Sets the collections of the database.
     *
     * @param { { [key: string]: Document[] } } collections - The collections to set.
     * @example
     * const db = new DocumentDatabase();
     * const collections = { posts: [] };
     * db.setCollections(collections);
     * console.log(db.collections); // Output: { posts: [] }
     */
    setCollections(collections) {
        this.collections = collections;
    }
}
exports.DocumentDatabase = DocumentDatabase;
//# sourceMappingURL=DocumentDatabase.js.map