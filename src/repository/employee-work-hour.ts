import { EmployeeWorkHour, EmployeeWorkHourRegister, EmployeeWorkHourFilters } from "@pontalti/types/employee-work-hour.types";
import { CommonRequest, PaginationResponse } from "@pontalti/types/common.types";
import prisma, { dbErrorHandle } from "@pontalti/lib/prisma";
import { startAndEndOfDate } from "@pontalti/utils/helper";

const createEmployeeWorkHour = async (data: EmployeeWorkHourRegister) => {
  try{
    return await prisma.employeeWorkHours.create({ data, include: { employee: true } });
  } catch(e) {
    console.log(e)
    dbErrorHandle(e)
  }
};

const getEmployeeWorkHour = async (id: number) => {
  try{
    return await prisma.employeeWorkHours.findUnique({ where: { id } });
  } catch(e) {
    dbErrorHandle(e)
  }
};

const getEmployeesWorkHours = async (filters: EmployeeWorkHourFilters) => {
  try{
    const {
      employee_id,
      startDate,
      endDate
    } = filters

    const selectedFields = {
      id: true,
      clock_in: true,
      clock_out: true,
    }

    const whereClause = {
      employee_id: employee_id,
      clock_in: { gte: startAndEndOfDate(startDate).startOfDay, lte: startAndEndOfDate(endDate).endOfDay }
    };


    const employeeWorkHours = await prisma.employeeWorkHours.findMany({
      where: whereClause,
      select: selectedFields,
      orderBy: {
        created_at: 'asc'
      }
    })

    // console.log(employeeWorkHours)


    return employeeWorkHours
  } catch(e) {
    console.log(e)
    dbErrorHandle(e)
  }
};


const getTodayEmployeeWorkHour = async (employee_id: number) => {
  try{
    console.log(10)
    const startDate = startAndEndOfDate(new Date()).startOfDay;
    console.log(1.2)
    return await prisma.employeeWorkHours.findMany({ 
      where: { employee_id: employee_id, created_at: { gte: startDate } },
      orderBy: { created_at: 'desc' } 
    });
  } catch(e) {
    dbErrorHandle(e)
  }
};

const getTodayWorkHour = async () => {
  try{
    const startDate = startAndEndOfDate(new Date()).startOfDay;
    return await prisma.employeeWorkHours.findMany({ 
      where: { created_at: { gte: startDate } },
      orderBy: { created_at: 'desc' },
      // include: { employee: true }
    });
  } catch(e) {
    dbErrorHandle(e)
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialEmployeeWorkHour = async (id: number, data: any) => {
  const existingEmployeeWorkHour = await prisma.employeeWorkHours.findUnique({
    where: { id }
  });

  console.log(2.1)
  console.log(id)
  console.log(existingEmployeeWorkHour)

  if (!existingEmployeeWorkHour) {
    throw new Error("Employee Work Hour not found");
  }
  console.log(2.2)

  const updatedEmployee = await prisma.employeeWorkHours.update({
    where: { id },
    data: {
      ...existingEmployeeWorkHour,
      ...data,
      updated_at: new Date()
    }
  });
  console.log(2.3)

  return updatedEmployee;
};

const deleteEmployeeWorkHour = async (id: number) => {
  return await prisma.employeeWorkHours.delete({ where: { id } });
};

export default {
  createEmployeeWorkHour,
  getEmployeeWorkHour,
  getEmployeesWorkHours,
  getTodayEmployeeWorkHour,
  getTodayWorkHour,
  updatePartialEmployeeWorkHour,
  deleteEmployeeWorkHour
};
