import { Vacation, VacationRegister } from "@pontalti/types/vacation.types";
import { CommonRequest } from "@pontalti/types/common.types";
import prisma from "@pontalti/lib/prisma";
import { PrismaClient } from "@prisma/client";

const createVacation = async (data: VacationRegister): Promise<Vacation> => {
  return await prisma.vacations.create({ data, include: { employee: true } });
};

const getVacation = async (id: number) => {
  return await prisma.vacations.findUnique({ 
    where: { id },
    include: { employee: true }
  });
};

const getVacations = async (filters: CommonRequest<Vacation>) => {
  const { page, perPage, start_date, end_date } = filters;
  const skip = page !== 1 && page != undefined ? (page - 1) * perPage : undefined;

  const whereClause = {
    ...(start_date && end_date ? {
      OR: [
        {
          start_date: {
            lte: end_date
          },
          end_date: {
            gte: start_date
          }
        }
      ]
    } : {})
  };

  return await prisma.vacations.findMany({
    where: whereClause,
    include: { employee: true },
    take: perPage,
    skip: skip
  });
};

const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

const getVacationsByDateRange = async (startDate: Date, endDate: Date) => {
  const normalizedStartDate = normalizeDate(startDate);
  const normalizedEndDate = normalizeDate(endDate);
  normalizedEndDate.setHours(23, 59, 59, 999);

  return await prisma.vacations.findMany({
    where: {
      OR: [
        {
          start_date: {
            lte: normalizedEndDate
          },
          end_date: {
            gte: normalizedStartDate
          }
        }
      ]
    },
    include: { employee: true }
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
    },
    include: { employee: true }
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
  getVacationsByDateRange,
  updatePartialVacation,
  deleteVacation
};
