export const API_ERROR_MESSAGES = {
  API_KEY_REQUIRED: "API key must be provided.",
  INVALID_API_KEY: "Invalid API key.",
  API_KEY_EXPIRED: "API key expired.",

  API_KEY_ERROR: "Failed to verify API key or fetch data:",
};

export const AUTH_ERROR_MESSAGES = {
  FORBIDDEN: "Forbidden: Admins only.",
  AUTH_TOKEN_REQUIRED: "Authorization token must be provided.",
  ERROR_VERIFYING_TOKEN: "Error verifying token.",
  AUTH_HEADER_REQUIRED: "Authorization header required.",
};

// errorMessages.js
export const FIRESTORE_ERROR_MESSAGES = {
  NO_DOCUMENTS: "No matching documents.",
  UPDATE_ERROR: "Failed to update configuration.",
  CREATE_ERROR: "Failed to create new configuration.",
  DELETE_ERROR: "Failed to delete document.",
};

export const REQUEST_ERROR_MESSAGES = {
  CONFIG_PARAMS_REQUIRED: "Configuration parameters required.",
  KEY_REQUIRED: "Key required.",
  CONFIG_KEY_REQUIRED: "Configuration key required.",
};
