import { TimeConfiguration } from "@pontalti/types/time-configuration.types";
import { CommonRequest } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/time-configuration";

const getAllTimeConfigurations = async (filters: CommonRequest<TimeConfiguration>) => {
  return await repository.getTimeConfigurations(filters)
};

const getTimeConfigurationById = async (id: number) => {
  return await repository.getTimeConfigurationById(id)
};

const updatePartialTimeConfiguration = async (id: number, data: unknown) => {
  return await repository.updatePartialTimeConfiguration(id, data)
};

const deleteTimeConfiguration = async (id: number) => {
  return await repository.deleteTimeConfiguration(id)
};

export default {
  getTimeConfigurationById,
  getAllTimeConfigurations,
  updatePartialTimeConfiguration,
  deleteTimeConfiguration
};
