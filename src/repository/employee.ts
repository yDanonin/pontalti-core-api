import { Employee } from "@pontalti/types/employee.types";
import { CommonRequest } from "@pontalti/types/common.types";
import prisma, { dbErrorHandle } from "@pontalti/lib/prisma";

const createEmployee = async (data: Employee) => {
  try{
    return await prisma.employees.create({ data });
  } catch(e) {
    dbErrorHandle(e)
  }
};

const getEmployee = async (id: number) => {
  try{
    return await prisma.employees.findUnique({ where: { id } });
  } catch(e) {
    dbErrorHandle(e)
  }
};

const getEmployees = async (filters: CommonRequest) => {
  try{
    const { page, perPage } = filters;
    const skip = page !== 1 && page != undefined ? (page - 1) * perPage : undefined;
    return await prisma.employees.findMany({
      take: perPage,
      skip: skip
    });
  } catch(e) {
    dbErrorHandle(e)
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialEmployee = async (id: number, data: any) => {
  const existingEmployee = await prisma.employees.findUnique({
    where: { id }
  });

  if (!existingEmployee) {
    throw new Error("Employee not found");
  }

  const updatedEmployee = await prisma.employees.update({
    where: { id },
    data: {
      ...existingEmployee,
      ...data
    }
  });

  return updatedEmployee;
};

const deleteEmployee = async (id: number) => {
  return await prisma.employees.delete({ where: { id } });
};

export default {
  createEmployee,
  getEmployee,
  getEmployees,
  updatePartialEmployee,
  deleteEmployee
};
