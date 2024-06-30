import { ServingApiService } from "../service/serving-api-service.js";

/** The only function used by regular users : Get all
 *  configuration parameters for a specified country,
 * or default parameters if a country is not specified. **/

export const getConfigsByCountry = async (req, res) => {
  console.log(req.params);
  const { country } = req.params;
  const country_param = country || "default";

  try {
    const snapshot = await ServingApiService.getConfigsByCountry(country_param);
    return res.status(200).send(snapshot);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getDefaultConfigs = async (req, res) => {
  try {
    const snapshot = await ServingApiService.getConfigsByCountry("default");
    return res.status(200).send(snapshot);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
