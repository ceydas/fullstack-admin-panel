import express from "express";
import { db } from "../../firebase.js";
import { authenticateToken } from "../middleware/config-middleware.js";
import { log } from "three/examples/jsm/nodes/Nodes.js";
const app = express();
const port = 8383;

const configParametersCollectionRef = db.collection("config-parameters");

app.use(express.json());

// Set CORS headers for all routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Handle preflight requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.sendStatus(200);
});

app.get("/configs", authenticateToken, async (req, res) => {
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

app.post("/configs", async (req, res) => {
  const { configObject } = req.body;

  if (!configObject) {
    return res
      .status(400)
      .send({ error: "Configuration parameters required." });
  }

  const refToDoc = configParametersCollectionRef.doc(configObject.key);
  var snapshot = await refToDoc.set(configObject);

  console.log(req.body);
  res.status(200).send(configObject);
});

app.get("/configs/:country", async (req, res, next) => {
  const { country } = req.params;
  var country_param = "default";
  if (country) {
    country_param = country;
  }
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
