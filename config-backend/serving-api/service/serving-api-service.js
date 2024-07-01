import { db } from "../../firebase.js";
import createServingApiResponse from "../../general/util/response-util.js";

const configParametersCollectionRef = db.collection("config-parameters");

export const ServingApiService = {
  getConfigsByCountry: async (country) => {
    var snapshot = await configParametersCollectionRef.get();

    if (snapshot.empty) {
      throw new Error("No matching documents.");
    }

    const response = createServingApiResponse(snapshot, country);
    return response;
  },
};
