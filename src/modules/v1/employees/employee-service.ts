import { Classification, Employee } from "@pontalti/types/employee.types";
import { CommonRequest, DefaultResponse } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/employee";

const handleEmployee = (e: Employee | Employee[]): DefaultResponse => {
  if (Array.isArray(e)) {
    const response = e.map((data: Employee) => {
      const { classification, ...employee } = data;
      return { ...employee, status: Classification[classification] };
    });
    return { data: response };
  }
  const { classification, ...employee } = e;
  return { data: { ...employee, status: Classification[classification] } };
};

const createEmployee = async (data: Employee) => {
  try{
    if(data.admission){
      data.admission = new Date(data.admission)
    }
    if(data.dismissal_date){
      data.dismissal_date = new Date(data.dismissal_date)
    }
    return handleEmployee((await repository.createEmployee(data)) as Employee);
  } catch(e){
    throw e
  }
};

const getAllEmployees = async (filters: CommonRequest) => {
  return handleEmployee((await repository.getEmployees(filters)) as Employee[]);
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
