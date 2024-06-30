import express from "express";
import {
  deleteConfig,
  getAllConfigs,
  postConfig,
  updateConfig,
} from "../admin-api/controller/admin-controller.js";

import { authenticateAdmin } from "../general/middleware/config-middleware.js";

export const adminRoutes = express.Router();

adminRoutes.get("/configs", authenticateAdmin, getAllConfigs);
adminRoutes.post("/configs", authenticateAdmin, postConfig);
adminRoutes.delete("/configs/:key", authenticateAdmin, deleteConfig);
adminRoutes.put("/configs/:key", authenticateAdmin, updateConfig);

