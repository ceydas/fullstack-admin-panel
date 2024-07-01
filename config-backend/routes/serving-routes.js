import express from "express";
import {
  getConfigsByCountry,
  getDefaultConfigs,
} from "../serving-api/controller/serving-api-controller.js";
import { verifyApiKey } from "../general/middleware/config-middleware.js";

export const servingRoutes = express.Router();

servingRoutes.get(
  "/configs/country/:country",
  verifyApiKey,
  getConfigsByCountry
);

servingRoutes.get("/configs/country/", getDefaultConfigs);
