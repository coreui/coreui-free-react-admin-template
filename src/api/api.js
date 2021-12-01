/* eslint-disable */
import { Appwrite } from "appwrite";
import { Server } from "../utils/config";

let api = {
    sdk: null,

    provider: () => {
        if (api.sdk) {
            return api.sdk;
        }
        let appwrite = new Appwrite();
        appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
        api.sdk = appwrite;
        return appwrite;
    },

    createAccount: (email, password, name) => {
        return api.provider().account.create(email, password, name);
    },

    getAccount: () => {
        return api.provider().account.get();
    },

    createSession: (email, password) => {
        return api.provider().account.createSession(email, password);
    },

    getSession: (id) => {
        return api.provider().account.getSession(id);
    },

    deleteCurrentSession: () => {
        return api.provider().account.deleteSession('current');
    },

    createDocument: (collectionId, data, read, write) => {
        return api
            .provider()
            .database.createDocument(collectionId, data, read, write);
    },

    listDocuments: (collectionId) => {
        return api.provider().database.listDocuments(collectionId);
    },

    updateDocument: (collectionId, documentId, data, read, write) => {
        return api
            .provider()
            .database.updateDocument(collectionId, documentId, data, read, write);
    },

    deleteDocument: (collectionId, documentId) => {
        return api.provider().database.deleteDocument(collectionId, documentId);
    },
};

export default api;
