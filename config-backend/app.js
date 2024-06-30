import express from "express";
import { adminRoutes } from "./routes/admin-routes.js";
import { servingRoutes } from "./routes/serving-routes.js";

const app = express();
const allowedOrigin = process.env.CLIENT_URL;
const allOrigins = "*";

app.use(express.json());

// Set CORS headers for all routes
app.use((req, res, next) => {
  setCorsHeaders(res);
  next();
});

// Handle preflight requests
app.options("*", (req, res) => {
  setCorsHeaders(res);
  res.sendStatus(200);
});

const setCorsHeaders = (res) => {
  if (res) {
    res.header("Access-Control-Allow-Origin", allOrigins);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key"
    );
  }
};

app.use("/api/admin", adminRoutes);
app.use("/api/serving", servingRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
