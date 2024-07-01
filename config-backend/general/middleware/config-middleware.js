import admin from "firebase-admin";
import {
  AUTH_ERROR_MESSAGES,
  API_ERROR_MESSAGES,
} from "../../error/error-messages.js";
import dotenv from "dotenv";

export const verifyApiKey = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(400).send(API_ERROR_MESSAGES.API_KEY_REQUIRED);
  }

  try {
    const validApiKey = await admin
      .firestore()
      .collection(process.env.API_KEY_COLLECTION_NAME)
      .doc(apiKey)
      .get();

    if (!validApiKey.exists) {
      return res.status(401).send(API_ERROR_MESSAGES.INVALID_API_KEY);
    }

    const apiKeyData = validApiKey.data();
    if (!apiKeyData.active) {
      return res.status(401).send(API_ERROR_MESSAGES.API_KEY_EXPIRED);
    }
    next();
  } catch (error) {
    console.error(API_ERROR_MESSAGES.API_KEY_ERROR, error);
    return res.status(500).send(API_ERROR_MESSAGES.API_KEY_ERROR);
  }
};

export const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send(AUTH_ERROR_MESSAGES.AUTH_HEADER_REQUIRED);
  }
  const token = authHeader && authHeader.split("Bearer ")[1];

  try {
    // Verify the token and get user UID
    const decodedToken = await admin.auth().verifyIdToken(token);
    const isAdmin = decodedToken.admin;

    // Check if the user is an admin from claims
    if (isAdmin) {
      //admin.auth().setCustomUserClaims(uid, { admin: true });
      //req.user = userData; // Attach user data to the request
      next();
    } else {
      res.status(403).send(AUTH_ERROR_MESSAGES.FORBIDDEN);
    }
  } catch (error) {
    console.error(AUTH_ERROR_MESSAGES.ERROR_VERIFYING_TOKEN, error);
    res.status(500).send(AUTH_ERROR_MESSAGES.ERROR_VERIFYING_TOKEN);
  }
};
