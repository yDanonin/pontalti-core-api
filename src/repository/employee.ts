import { Employee, EmployeeRegister } from "@pontalti/types/employee.types";
import { CommonRequest, PaginationResponse } from "@pontalti/types/common.types";
import prisma, { dbErrorHandle } from "@pontalti/lib/prisma";

const createEmployee = async (data: EmployeeRegister) => {
  try{
    return await prisma.employees.create({ 
      data: {
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      } 
    });
  } catch(e) {
    console.log(e)
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

const getEmployees = async (filters: CommonRequest<Employee>): Promise<PaginationResponse<Employee>> => {
  try{
    const {
      id,
      name,
      phone,
      cel_number,
      cpf,
      page, 
      perPage
    } = filters;

    const skip = page !== 1 && page != undefined ? (page - 1) * perPage : undefined;

    const whereClause = id ? { id } : {
      name: { contains: name },
      cpf: { contains: cpf },
      cel_number: { contains: cel_number },
      phone: { contains: phone },
    };

    
    const employees = await prisma.employees.findMany({
      where: whereClause,
      take: perPage,
      skip: skip
    });

    const totalRecords = await prisma.employees.count({
      where: whereClause
    });
    
    const hasMoreItems = await prisma.customers.count({
      where: {
        id: {
          gt: employees[employees.length - 1]?.id || 0
        }
      }
    });

    const nextPage = hasMoreItems ? page! + 1 : undefined;

    return {
      data: employees,
      totalRecord: totalRecords,
      page: page ?? 1,
      perPage: perPage,
      nextPage: nextPage ? `/api/customers?page=${nextPage}` : undefined
    } as PaginationResponse<Employee>
  } catch(e) {
    console.log(e)
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
      ...data,
      updated_at: new Date()
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
