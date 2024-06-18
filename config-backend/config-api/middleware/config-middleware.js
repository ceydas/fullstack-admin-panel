import admin from "firebase-admin";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("No token found"); // No token found
  }

  await admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      res.status(403).send("Token verification failed"); // Token verification failed
    });
};

export const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    // Verify the token and get user UID
    const decodedToken = await admin.auth().verifyIdToken(bearerToken);
    const uid = decodedToken.uid;

    // Fetch the user's document from Firestore
    const userDoc = await admin.firestore().collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).send("User not found");
    }

    const userData = userDoc.data();

    // Check if the user is an admin
    if (userData.isAdmin) {
      req.user = userData; // Attach user data to the request
      next();
    } else {
      res.status(403).send("Forbidden: Admins only");
    }
  } catch (error) {
    console.error("Error verifying token or fetching user data:", error);
    res.status(500).send("Internal Server Error");
  }
};
