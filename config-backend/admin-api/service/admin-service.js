import { db } from "../../firebase.js";

import dotenv from "dotenv";
import {
  API_ERROR_MESSAGES,
  FIRESTORE_ERROR_MESSAGES,
  REQUEST_ERROR_MESSAGES,
} from "../../error/error-messages.js";

const configParametersCollectionRef = db.collection(
  process.env.CONFIG_COLLECTION_NAME
);

export const AdminService = {
  getAllConfigs: async () => {
    const snapshot = await configParametersCollectionRef.get();

    if (snapshot.empty) {
      throw new Error(FIRESTORE_ERROR_MESSAGES.NO_DOCUMENTS);
    }

    let documents = snapshot.docs.map((doc) => ({
      key: doc.id,
      ...doc.data(),
    }));

    return documents;
  },

  postConfig: async (configObject) => {
    if (!configObject) {
      throw new Error(REQUEST_ERROR_MESSAGES.CONFIG_PARAMS_REQUIRED);
    }

    try {
      const refToDoc = configParametersCollectionRef.doc(configObject.key);
      const snapshot = await refToDoc.set(configObject);
      return snapshot;
    } catch (error) {
      throw new Error(FIRESTORE_ERROR_MESSAGES.CREATE_ERROR);
    }
  },

  deleteConfig: async (key) => {
    if (!key) {
      throw new Error(REQUEST_ERROR_MESSAGES.CONFIG_KEY_REQUIRED);
    }

    try {
      const refToDoc = configParametersCollectionRef.doc(key);
      var snapshot = await refToDoc.delete();
      return snapshot;
    } catch (error) {
      throw new Error(FIRESTORE_ERROR_MESSAGES.DELETE_ERROR);
    }
  },

  updateConfig: async (configKey, configObject) => {
    if (!configKey) {
      throw new Error(REQUEST_ERROR_MESSAGES.CONFIG_KEY_REQUIRED);
    }

    if (!configObject) {
      throw new Error(REQUEST_ERROR_MESSAGES.CONFIG_PARAMS_REQUIRED);
    }

    try {
      const refToDoc = configParametersCollectionRef.doc(configKey);
      const updatedObject = await refToDoc.update(configObject);
      return updatedObject;
    } catch (error) {
      throw new Error(FIRESTORE_ERROR_MESSAGES.UPDATE_ERROR);
    }
  },
};
