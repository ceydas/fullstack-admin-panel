import express from "express";
import { db } from "./firebase.js";
import {
  authenticateToken,
  authenticateAdmin,
} from "./config-api/middleware/config-middleware.js";
import createServingApiResponse from "./config-api/controller/response-util.js";

const app = express();
const apiRouter = express.Router();
const allowedOrigin = process.env.CLIENT_URL;
const configParametersCollectionRef = db.collection("config-parameters");

app.use(express.json());

// Set CORS headers for all routes
app.use((req, res, next) => {
  if (allowedOrigin) res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Handle preflight requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.sendStatus(200);
});

app.get("/configs/country/", (req, res) => {
  return res.redirect("/configs/country/default");
});

// Get all configs - admin only
app.get("/configs", authenticateAdmin, async (req, res) => {
  var snapshot = await configParametersCollectionRef.get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return res.sendStatus(400);
  }

  let documents = [];
  snapshot.forEach((doc) => {
    documents.push({ key: doc.parameter_key, ...doc.data() });
  });

  return res.status(200).send(documents);
});

app.post("/configs", authenticateAdmin, async (req, res) => {
  const configObject = req.body;

  if (!configObject) {
    return res
      .status(400)
      .send({ error: "Configuration parameters required." });
  }

  const refToDoc = configParametersCollectionRef.doc(configObject.key);
  var snapshot = await refToDoc.set(configObject);

  res.status(200).send(configObject);
});

app.delete("/configs/:key", authenticateAdmin, async (req, res) => {
  const { key } = req.params;

  if (!key) {
    return res.status(400).send({ error: "Key required" });
  }

  const refToDoc = configParametersCollectionRef.doc(key);
  var snapshot = await refToDoc.delete();

  res.status(200).send(key);
});

/** The only function used by regular users : Get all
 *  configuration parameters for a specified country,
 * or default parameters if a country is not specified. **/

app.get("/configs/country/:country", authenticateToken, async (req, res) => {
  const { country } = req.params;
  const country_param = country || "default";
  var snapshot = await configParametersCollectionRef.get();

  if (snapshot.empty) {
    console.log("No matching documents.");
    return res.sendStatus(400);
  }

  const response = createServingApiResponse(snapshot, country_param);
  return res.status(200).send(response);
});

app.put("/configs/:key", authenticateAdmin, async (req, res) => {
  const configKey = req.params.key;
  const configObject = req.body;

  if (!configObject) {
    return res
      .status(400)
      .send({ error: "Configuration parameters required." });
  }

  if (!configKey) {
    return res.status(400).send({ error: "Configuration key required." });
  }

  try {
    const refToDoc = configParametersCollectionRef.doc(configKey);
    await refToDoc.update(configObject);

    res.status(200).send(configObject);
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).send({ error: "Failed to update configuration." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
