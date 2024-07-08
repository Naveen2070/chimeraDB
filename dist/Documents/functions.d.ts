import { Document } from './Document';
/**
 * Type definition for document functions
 *
 * @interface documentFunctionsType
 * @property {(dbName: string, id: string) => Document | undefined} getById - Get document by id
 * @property {(dbName: string, params: Partial<Document>) => Document[]} getByParams - Get documents by params
 * @property {(dbName: string, key: string, value: any) => Document[]} getByKeyValue - Get documents by key value
 * @property {(dbName: string, document: Document) => void} addDocument - Add a document
 * @property {(dbName: string, id: string, document: Partial<Document>) => boolean} updateDocument - Update a document
 * @property {(dbName: string, id: string) => boolean} deleteDocument - Delete a document
 *
 * @example
 * const myDB = 'myDB';
 * const documentFunctions: documentFunctionsType = {
 *   getById: (dbName, id) => getFile(dbName).documents.find(doc => doc.id === id),
 *   getByParams: (dbName, params) => getFile(dbName).documents.filter(doc =>
 *     Object.keys(params).every(key => doc[key] === params[key])
 *   ),
 *   getByKeyValue: (dbName, key, value) => getFile(dbName).documents.filter(doc => doc[key] === value),
 *   addDocument: (dbName, document) => {
 *     const db = getFile(dbName);
 *     db.documents = db.documents || [];
 *     db.documents.push(document);
 *     saveFile(dbName, db);
 *   },
 *   updateDocument: (dbName, id, document) => {
 *     const db = getFile(dbName);
 *     const documents = db.documents || [];
 *     const index = documents.findIndex(doc => doc.id === id);
 *     if (index !== -1) {
 *       documents[index] = { ...documents[index], ...document };
 *       db.documents = documents;
 *       saveFile(dbName, db);
 *       return true;
 *     }
 *     return false;
 *   },
 *   deleteDocument: (dbName, id) => {
 *     const db = getFile(dbName);
 *     const documents = db.documents || [];
 *     const index = documents.findIndex(doc => doc.id === id);
 *     if (index !== -1) {
 *       documents.splice(index, 1);
 *       db.documents = documents;
 *       saveFile(dbName, db);
 *       return true;
 *     }
 *     return false;
 *   },
 * };
 */
export type documentFunctionsType = {
    /**
     * Returns a document from the specified database by its ID.
     * @param dbName - The name of the database to search in. Binded to the db by default
     * @param id - The ID of the document to retrieve.
     * @returns The document with the specified ID, or `undefined` if not found.
     * @example
     * const document = getById('users', '123');
     */
    getById: (dbName: string, id: string) => Document | undefined;
    /**
     * Returns an array of documents from the specified database that match the given parameters.
     * @param dbName - The name of the database to search in. Binded to the db by default
     * @param params - The parameters to match against the documents.
     * @returns An array of documents that match the given parameters.
     * @example
     * const documents = getByParams('users', { name: 'John', age: 30 });
     */
    getByParams: (dbName: string, params: Partial<Document>) => Document[];
    /**
     * Returns an array of documents from the specified database that have a specific key-value pair.
     * @param dbName - The name of the database to search in. Binded to the db by default
     * @param key - The key to search for.
     * @param value - The value to match against.
     * @returns An array of documents that have the specified key-value pair.
     * @example
     * const documents = getByKeyValue('users', 'name', 'John');
     */
    getByKeyValue: (dbName: string, key: string, value: any) => Document[];
    /**
     * Adds a new document to the specified database.
     * @param dbName - The name of the database to add the document to. Binded to the db by default
     * @param document - The document to add.
     * @example
     * addDocument('users', { name: 'John', age: 30 });
     */
    addDocument: (dbName: string, document: Document) => void;
    /**
     * Updates an existing document in the specified database.
     * @param dbName - The name of the database to update the document in. Binded to the db by default
     * @param id - The ID of the document to update.
     * @param document - The updated document.
     * @returns `true` if the document was successfully updated, `false` otherwise.
     * @example
     * const success = updateDocument('users', '123', { name: 'Jane' });
     */
    updateDocument: (dbName: string, id: string, document: Partial<Document>) => boolean;
    /**
     * Deletes a document from the specified database.
     * @param dbName - The name of the database to delete the document from. Binded to the db by default
     * @param id - The ID of the document to delete.
     * @returns `true` if the document was successfully deleted, `false` otherwise.
     * @example
     * const success = deleteDocument('users', '123');
     */
    deleteDocument: (dbName: string, id: string) => boolean;
};
declare const documentFunctions: documentFunctionsType;
export default documentFunctions;
//# sourceMappingURL=functions.d.ts.map