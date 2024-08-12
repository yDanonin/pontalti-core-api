import { Classification, Employee, EmployeeClassificationString, EmployeeRegister } from "@pontalti/types/employee.types";
import { CommonRequest, PaginationResponse } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/employee";

const convertEmployeeClassificationToString = (employee: Employee) => {
  const { classification, ...othersAttributes } = employee;
  return { ...othersAttributes, classification: Classification[classification] };
}

const mapPaginationResponseClassification = (paginatedEmployees: PaginationResponse<Employee>) => {
  const { data, ...paginationInfos } = paginatedEmployees
  const employees = data.map(convertEmployeeClassificationToString);
  return { data: employees, ...paginationInfos } as PaginationResponse<EmployeeClassificationString>;
}

const createEmployee = async (data: EmployeeRegister) => {
  try{
    data.admission = data.admission ? new Date(data.admission) : data.admission;

    return convertEmployeeClassificationToString((await repository.createEmployee(data)) as Employee);
  } catch(e){
    throw e
  }
};

const getAllEmployees = async (filters: CommonRequest<Employee>) => {
  return mapPaginationResponseClassification((await repository.getEmployees(filters)) as PaginationResponse<Employee>);
};

const getEmployeeById = async (id: number) => {
  return convertEmployeeClassificationToString((await repository.getEmployee(id)) as Employee);
};

const updatePartialEmployee = async (id: number, data: unknown) => {
  return convertEmployeeClassificationToString((await repository.updatePartialEmployee(id, data)) as Employee);
};

const deleteEmployee = async (id: number) => {
  return convertEmployeeClassificationToString((await repository.deleteEmployee(id)) as Employee);
};

export default {
  createEmployee,
  getEmployeeById,
  getAllEmployees,
  updatePartialEmployee,
  deleteEmployee
};
