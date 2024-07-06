import { Classification, Employee, EmployeeClassificationString, EmployeeRegister } from "@pontalti/types/employee.types";
import { CommonRequest, DefaultResponse, PaginationResponse } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/employee";

const handleEmployee = (e: Employee | PaginationResponse<Employee>) => {
  if ("data" in e) {
    const { data, ...employee } = e
    const newData = data.map((data: Employee) => {
      const { classification, ...employee } = data;
      return { ...employee, classification: Classification[classification] };
    });
    return { data: newData, ...employee } as PaginationResponse<EmployeeClassificationString>;
  }
  const { classification, ...employee } = e;
  return { ...employee, classification: Classification[classification] };
};

const createEmployee = async (data: EmployeeRegister) => {
  try{
    data.admission = data.admission ? new Date(data.admission) : data.admission;

    return handleEmployee((await repository.createEmployee(data)) as Employee);
  } catch(e){
    throw e
  }
};

const getAllEmployees = async (filters: CommonRequest) => {
  return handleEmployee((await repository.getEmployees(filters)) as PaginationResponse<Employee>);
};

const getEmployeeById = async (id: number) => {
  return handleEmployee((await repository.getEmployee(id)) as Employee);
};

const updatePartialEmployee = async (id: number, data: unknown) => {
  return handleEmployee((await repository.updatePartialEmployee(id, data)) as Employee);
};

const deleteEmployee = async (id: number) => {
  return handleEmployee((await repository.deleteEmployee(id)) as Employee);
};

export default {
  createEmployee,
  getEmployeeById,
  getAllEmployees,
  updatePartialEmployee,
  deleteEmployee
};
