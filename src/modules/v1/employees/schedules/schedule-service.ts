import { Schedule, ScheduleRegister} from "@pontalti/types/schedule.types";
import { CommonRequest, DefaultResponse, PaginationResponse } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/schedule";

const createSchedule = async (data: ScheduleRegister) => {
  try{
    return await repository.createSchedule(data)
  } catch(e){
    throw e
  }
};

const getAllSchedules = async (filters: CommonRequest<Schedule>) => {
  return await repository.getSchedules(filters)
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
