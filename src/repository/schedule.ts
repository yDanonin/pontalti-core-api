import { Schedule, ScheduleRegister } from "@pontalti/types/schedule.types";
import { CommonRequest } from "@pontalti/types/common.types";
import prisma from "@pontalti/lib/prisma";

const createSchedule = async (data: ScheduleRegister): Promise<Schedule> => {
  return await prisma.schedules.create({ data, include: { employee: true } });
};

const getScheduleById = async (id: number) => {
  return await prisma.schedules.findUnique({ 
    where: { id } 
  });
};

const getSchedules = async (filters: CommonRequest<ScheduleRegister>) => {
  const { page, perPage } = filters;
  const employee_id = Number(filters.employee_id)
  const skip = page !== 1 && page != undefined ? (page - 1) * perPage : undefined;
  return await prisma.schedules.findMany({
    where: { employee_id: employee_id },
    take: perPage,
    skip: skip
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialSchedule = async (id: number, data: any) => {
  const existingSchedule = await prisma.schedules.findUnique({
    where: { id }
  });

  if (!existingSchedule) {
    throw new Error("Schedule not found");
  }

  const updatedSchedule = await prisma.schedules.update({
    where: { id },
    data: {
      ...existingSchedule,
      ...data,
      updated_at: new Date()
    }
  });

  return updatedSchedule;
};

const deleteSchedule = async (id: number) => {
  return await prisma.schedules.delete({ 
    where: { id }
  });
};

export default {
  createSchedule,
  getScheduleById,
  getSchedules,
  updatePartialSchedule,
  deleteSchedule
};
