import { Document } from './Document';
/**
 * Represents a database of documents.
 */
export declare class DocumentDatabase {
    /**
     * Maps collection names to arrays of documents.
     */
    private collections;
    /**
     * Creates a new collection with the given name.
     *
     * @param {string} name - The name of the collection.
     * @throws {Error} Throws an error if a collection with the given name already exists.
     */
    createCollection(name: string): void;
    /**
     * Inserts a document into the specified collection.
     *
     * @param {string} name - The name of the collection to insert into.
     * @param {Document} doc - The document to insert.
     * @throws {Error} Throws an error if the collection does not exist.
     */
    insertIntoCollection(name: string, doc: Document): void;
    /**
     * Retrieves all documents from the specified collection.
     *
     * @param {string} name - The name of the collection to retrieve from.
     * @throws {Error} Throws an error if the collection does not exist.
     * @returns {Document[]} An array of documents in the specified collection.
     */
    selectFromCollection(name: string): Document[];
    /**
     * Retrieves all collections in the database.
     *
     * @returns {{
     *     [key: string]: Document[];
     * }} A map of collection names to arrays of documents.
     */
    getCollections(): {
        [key: string]: Document[];
    };
    /**
     * Sets the collections of the database.
     *
     * @param { { [key: string]: Document[] } } collections - The collections to set.
     */
    setCollections(collections: {
        [key: string]: Document[];
    }): void;
}
//# sourceMappingURL=DocumentDatabase.d.ts.map