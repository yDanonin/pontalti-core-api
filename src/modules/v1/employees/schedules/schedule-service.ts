import { Schedule, ScheduleRegister} from "@pontalti/types/schedule.types";
import { CommonRequest, DayOfWeek, DefaultResponse, PaginationResponse } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/schedule";

const convertDayOfWeekEnumToString = (employee: Schedule) => {
  const { day_of_week, ...othersAttributes } = employee;
  return { ...othersAttributes, day_of_week: DayOfWeek[day_of_week] };
}

const mapPaginationResponseClassification = (data: Schedule[]) => {
  return data.map(convertDayOfWeekEnumToString);
}

const createSchedule = async (data: ScheduleRegister) => {
  try{
    return await repository.createSchedule(data)
  } catch(e){
    throw e
  }
};

const getAllSchedules = async (filters: CommonRequest<ScheduleRegister>) => {
  console.log(filters)
  return mapPaginationResponseClassification(await repository.getSchedules(filters))
};

const getScheduleById = async (id: number) => {
  return await repository.getScheduleById(id)
};

const updatePartialSchedule = async (id: number, data: unknown) => {
  return await repository.updatePartialSchedule(id, data)
};

const deleteSchedule = async (id: number) => {
  return await repository.deleteSchedule(id)
};

export default {
  createSchedule,
  getScheduleById,
  getAllSchedules,
  updatePartialSchedule,
  deleteSchedule
};
