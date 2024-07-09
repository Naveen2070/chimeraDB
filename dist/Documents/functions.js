"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentFunctions = void 0;
const chimera_1 = require("../core/chimera");
exports.documentFunctions = {
    getById: (dbName, id) => {
        const documents = (0, chimera_1.getFile)(dbName).documents || [];
        return documents.find((doc) => doc.id === id);
    },
    getByParams: (dbName, params) => {
        const documents = (0, chimera_1.getFile)(dbName).documents || [];
        return documents.filter((doc) => {
            return Object.keys(params).every((key) => doc[key] === params[key]);
        });
    },
    getByKeyValue: (dbName, key, value) => {
        const documents = (0, chimera_1.getFile)(dbName).documents || [];
        return documents.filter((doc) => doc[key] === value);
    },
    addDocument: (dbName, document) => {
        const db = (0, chimera_1.getFile)(dbName);
        db.documents = db.documents || [];
        db.documents.push(document);
        (0, chimera_1.saveFile)(dbName, db);
    },
    updateDocument: (dbName, id, newDocument) => {
        const db = (0, chimera_1.getFile)(dbName);
        const documents = db.documents || [];
        const index = documents.findIndex((doc) => doc.id === id);
        if (index !== -1) {
            documents[index] = { ...documents[index], ...newDocument };
            db.documents = documents;
            (0, chimera_1.saveFile)(dbName, db);
            return true;
        }
        return false;
    },
    deleteDocument: (dbName, id) => {
        const db = (0, chimera_1.getFile)(dbName);
        const documents = db.documents || [];
        const index = documents.findIndex((doc) => doc.id === id);
        if (index !== -1) {
            documents.splice(index, 1);
            db.documents = documents;
            (0, chimera_1.saveFile)(dbName, db);
            return true;
        }
        return false;
    },
};
//# sourceMappingURL=functions.js.map