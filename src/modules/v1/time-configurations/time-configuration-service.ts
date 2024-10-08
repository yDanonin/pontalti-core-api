import { TimeConfiguration } from "@pontalti/types/time-configuration.types";
import { CommonRequest, DayOfWeek } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/time-configuration";

const convertDayOfWeekEnumToString = (employee: TimeConfiguration) => {
  const { day_of_week, ...othersAttributes } = employee;
  return { ...othersAttributes, day_of_week: DayOfWeek[day_of_week] };
}

const mapPaginationResponseClassification = (data: TimeConfiguration[]) => {
  return data.map(convertDayOfWeekEnumToString);
}

const getAllTimeConfigurations = async (filters: CommonRequest<TimeConfiguration>) => {
  return mapPaginationResponseClassification(await repository.getTimeConfigurations(filters))
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
