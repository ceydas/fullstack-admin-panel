import { AdminService } from "../service/admin-service.js";

// Get all configs - admin only
export const getAllConfigs = async (req, res) => {
  try {
    const snapshot = await AdminService.getAllConfigs();
    return res.status(200).send(snapshot);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Post config - admin only
export const postConfig = async (req, res) => {
  const configObject = req.body;

  try {
    const snapshot = await AdminService.postConfig(configObject);
    return res.status(201).send(snapshot);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Delete config - admin only
export const deleteConfig = async (req, res) => {
  const { key } = req.params;
  console.log(key);

  try {
    const snapshot = await AdminService.deleteConfig(key);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Update config data
export const updateConfig = async (req, res) => {
  const configKey = req.params.key;
  const configObject = req.body;

  try {
    const updatedObject = await AdminService.updateConfig(
      configKey,
      configObject
    );
    return res.status(200).send(updatedObject);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
