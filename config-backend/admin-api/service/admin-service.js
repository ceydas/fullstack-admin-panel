import { db } from "../../firebase.js";

import dotenv from "dotenv";
import {
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
      console.error(REQUEST_ERROR_MESSAGES.CONFIG_PARAMS_REQUIRED);
      throw new Error(REQUEST_ERROR_MESSAGES.CONFIG_PARAMS_REQUIRED);
    }

    try {
      const refToDoc = configParametersCollectionRef.doc(configObject.key);
      configObject.version = 1;
      const snapshot = await refToDoc.set(configObject);
      return snapshot;
    } catch (error) {
      console.error(FIRESTORE_ERROR_MESSAGES.CREATE_ERROR);
      throw new Error(FIRESTORE_ERROR_MESSAGES.CREATE_ERROR);
    }
  },

  deleteConfig: async (key) => {
    if (!key) {
      console.error(REQUEST_ERROR_MESSAGES.CONFIG_KEY_REQUIRED);
      throw new Error(REQUEST_ERROR_MESSAGES.CONFIG_KEY_REQUIRED);
    }

    try {
      const refToDoc = configParametersCollectionRef.doc(key);
      var snapshot = await refToDoc.delete();
      return snapshot;
    } catch (error) {
      console.error(FIRESTORE_ERROR_MESSAGES.DELETE_ERROR);
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

      await refToDoc.firestore.runTransaction(async (transaction) => {
        const docSnapshot = await transaction.get(refToDoc);

        if (!docSnapshot.exists) {
          throw new Error(FIRESTORE_ERROR_MESSAGES.NON_EXISTENT_DOCUMENT);
        }

        // Compare version in firestore vs the version from client
        const currentVersion = docSnapshot.get("version");
        const newVersion = configObject.version;

        console.log("current: ", currentVersion, " new: ", newVersion);
        if (currentVersion !== newVersion) {
          throw new Error(FIRESTORE_ERROR_MESSAGES.VERSION_MISMATCH);
        }

        // Increment version for the update
        configObject.version = currentVersion + 1;

        const updatedObject = transaction.update(refToDoc, configObject);
        return updatedObject;
      });
    } catch (error) {
      console.error("Update Error:", error);
      throw new Error(FIRESTORE_ERROR_MESSAGES.UPDATE_ERROR);
    }
  },
};
