import { TimeConfiguration } from "@pontalti/types/time-configuration.types";
import { CommonRequest } from "@pontalti/types/common.types";
import prisma from "@pontalti/lib/prisma";

const getTimeConfigurationById = async (id: number) => {
  return await prisma.timeConfiguration.findUnique({ 
    where: { id } 
  });
};

const getTimeConfigurations = async (filters: CommonRequest<TimeConfiguration>) => {
  const { page, perPage } = filters;
  const skip = page !== 1 && page != undefined ? (page - 1) * perPage : undefined;
  return await prisma.timeConfiguration.findMany({
    take: perPage,
    skip: skip
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialTimeConfiguration = async (id: number, data: any) => {
  const existingTimeConfiguration = await prisma.timeConfiguration.findUnique({
    where: { id }
  });

  if (!existingTimeConfiguration) {
    throw new Error("TimeConfiguration not found");
  }

  const updatedTimeConfiguration = await prisma.timeConfiguration.update({
    where: { id },
    data: {
      ...existingTimeConfiguration,
      ...data,
      updated_at: new Date()
    }
  });

  return updatedTimeConfiguration;
};

const deleteTimeConfiguration = async (id: number) => {
  return await prisma.timeConfiguration.delete({ 
    where: { id }
  });
};

export default {
  getTimeConfigurationById,
  getTimeConfigurations,
  updatePartialTimeConfiguration,
  deleteTimeConfiguration
};
