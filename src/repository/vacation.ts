import { Vacation, VacationRegister } from "@pontalti/types/vacation.types";
import { CommonRequest } from "@pontalti/types/common.types";
import prisma from "@pontalti/lib/prisma";

const createVacation = async (data: VacationRegister): Promise<Vacation> => {
  return await prisma.vacations.create({ data, include: { employee: true } });
};

const getVacation = async (id: number) => {
  return await prisma.vacations.findUnique({ 
    where: { id } 
  });
};

const getVacations = async (filters: CommonRequest<Vacation>) => {
  const { page, perPage } = filters;
  const skip = page !== 1 && page != undefined ? (page - 1) * perPage : undefined;
  return await prisma.vacations.findMany({
    take: perPage,
    skip: skip
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialVacation = async (id: number, data: any) => {
  const existingVacation = await prisma.vacations.findUnique({
    where: { id }
  });

  if (!existingVacation) {
    throw new Error("Vacation not found");
  }

  const updatedVacation = await prisma.vacations.update({
    where: { id },
    data: {
      ...existingVacation,
      ...data,
      updated_at: new Date()
    }
  });

  return updatedVacation;
};

const deleteVacation = async (id: number) => {
  return await prisma.vacations.delete({ 
    where: { id }
  });
};

export default {
  createVacation,
  getVacation,
  getVacations,
  updatePartialVacation,
  deleteVacation
};
