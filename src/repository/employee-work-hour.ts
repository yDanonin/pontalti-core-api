import { EmployeeWorkHour, EmployeeWorkHourRegister, EmployeeWorkHourFilters } from "@pontalti/types/employee-work-hour.types";
import { CommonRequest, PaginationResponse } from "@pontalti/types/common.types";
import prisma, { dbErrorHandle } from "@pontalti/lib/prisma";

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
    return await prisma.employees.findUnique({ where: { id } });
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
      clock_in: true,
      clock_out: true
    }

    const whereClause = {
      employee_id: employee_id,
      clock_in: { gte: startDate, lte: endDate }
    };


    const employeeWorkHours = await prisma.employeeWorkHours.findMany({
      where: whereClause,
      select: selectedFields,
      orderBy: {
        created_at: 'asc'
      }
    })

    console.log(employeeWorkHours)


    return employeeWorkHours
  } catch(e) {
    console.log(e)
    dbErrorHandle(e)
  }
};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialEmployeeWorkHour = async (id: number, data: any) => {
  const existingEmployee = await prisma.employees.findUnique({
    where: { id }
  });

  if (!existingEmployee) {
    throw new Error("Employee Work Hour not found");
  }

  const updatedEmployee = await prisma.employees.update({
    where: { id },
    data: {
      ...existingEmployee,
      ...data,
      updated_at: new Date()
    }
  });

  return updatedEmployee;
};

const deleteEmployeeWorkHour = async (id: number) => {
  return await prisma.employees.delete({ where: { id } });
};

export default {
  createEmployeeWorkHour,
  getEmployeeWorkHour,
  getEmployeesWorkHours,
  updatePartialEmployeeWorkHour,
  deleteEmployeeWorkHour
};
