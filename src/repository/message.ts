import prisma, { dbErrorHandle } from "@pontalti/lib/prisma";
import {
  CreateMessageConfig,
  UpdateMessageConfig,
  CreateMessageSchedule,
  UpdateMessageSchedule,
  CreateMessageTemplate,
  UpdateMessageTemplate
} from "@pontalti/types/message.types";

// Customer Message Config
const createMessageConfig = async (data: CreateMessageConfig) => {
  try {
    return await prisma.customerMessageConfig.create({
      data,
      include: {
        schedules: true
      }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const getMessageConfigById = async (id: number) => {
  try {
    return await prisma.customerMessageConfig.findUnique({
      where: { id },
      include: {
        schedules: true
      }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const getMessageConfigByCustomerId = async (customer_id: number) => {
  try {
    return await prisma.customerMessageConfig.findFirst({
      where: { customer_id },
      include: {
        schedules: true
      }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const updateMessageConfig = async (id: number, data: UpdateMessageConfig) => {
  try {
    return await prisma.customerMessageConfig.update({
      where: { id },
      data,
      include: {
        schedules: true
      }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const deleteMessageConfig = async (id: number) => {
  try {
    return await prisma.customerMessageConfig.delete({
      where: { id },
      include: {
        schedules: true
      }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

// Customer Message Schedule
const createMessageSchedule = async (data: CreateMessageSchedule) => {
  try {
    return await prisma.customerMessageSchedule.create({
      data
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const updateMessageSchedule = async (id: number, data: UpdateMessageSchedule) => {
  try {
    return await prisma.customerMessageSchedule.update({
      where: { id },
      data
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const deleteMessageSchedule = async (id: number) => {
  try {
    return await prisma.customerMessageSchedule.delete({
      where: { id }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const getMessageScheduleById = async (id: number) => {
  try {
    return await prisma.customerMessageSchedule.findUnique({
      where: { id }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const getMessageSchedulesByConfigId = async (message_config_id: number) => {
  try {
    return await prisma.customerMessageSchedule.findMany({
      where: { message_config_id }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

// Message Templates
const createMessageTemplate = async (data: CreateMessageTemplate) => {
  try {
    return await prisma.messageTemplate.create({
      data
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const getMessageTemplateById = async (id: string) => {
  try {
    return await prisma.messageTemplate.findUnique({
      where: { id }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const getAllMessageTemplates = async () => {
  try {
    return await prisma.messageTemplate.findMany();
  } catch (e) {
    dbErrorHandle(e);
  }
};

const updateMessageTemplate = async (id: string, data: UpdateMessageTemplate) => {
  try {
    return await prisma.messageTemplate.update({
      where: { id },
      data
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const deleteMessageTemplate = async (id: string) => {
  try {
    return await prisma.messageTemplate.delete({
      where: { id }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const getAllMessageConfigs = async () => {
  try {
    return await prisma.customerMessageConfig.findMany({
      include: {
        customer: true,
        schedules: true
      }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

export default {
  // Customer Message Config
  createMessageConfig,
  getMessageConfigById,
  getMessageConfigByCustomerId,
  updateMessageConfig,
  deleteMessageConfig,
  getAllMessageConfigs,

  // Customer Message Schedule
  createMessageSchedule,
  updateMessageSchedule,
  deleteMessageSchedule,
  getMessageScheduleById,
  getMessageSchedulesByConfigId,

  // Message Templates
  createMessageTemplate,
  getMessageTemplateById,
  getAllMessageTemplates,
  updateMessageTemplate,
  deleteMessageTemplate
}; 