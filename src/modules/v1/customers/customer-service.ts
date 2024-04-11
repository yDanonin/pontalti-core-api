import { Customer, CustomerRequest, CustomerStatusString } from "@pontalti/types/customer.types";
import { PaginationResponse, Status } from "@pontalti/types/common.types";
import { BadRequestError, needADocument } from "@pontalti/utils/errors";
import repository from "@pontalti/repository/customer";

const handleStatusInCustomer = (c: Customer | PaginationResponse<Customer>) => {
  if ("data" in c) {
    const { data, ...customer } = c;
    const newData = data.map((data: Customer) => {
      const { status, ...customer } = data;
      return { ...customer, status: Status[status] };
    });
    const response = { data: newData, ...customer } as PaginationResponse<CustomerStatusString>;
    return response;
  }

  const { status, ...customer } = c;
  return { ...customer, status: Status[status] };
};

const createCustomer = async (data: Customer) => {
  try {
    if (data.cpf == null && data.cnpj == null) throw new BadRequestError("don't have any documents", needADocument);
    return handleStatusInCustomer((await repository.createCustomer(data)) as Customer);
  } catch (e: any) {
    throw e;
  }
};

const getAllCustomers = async (filters: CustomerRequest) => {
  try {
    return handleStatusInCustomer((await repository.getCustomers(filters)) as PaginationResponse<Customer>);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const getCustomerById = async (id: number) => {
  try {
    return handleStatusInCustomer((await repository.getCustomer(id)) as Customer);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const updatePartialCustomer = async (id: number, data: unknown) => {
  try {
    return handleStatusInCustomer((await repository.updatePartialCustomer(id, data)) as Customer);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const deleteCustomer = async (id: number) => {
  try {
    return handleStatusInCustomer((await repository.deleteCustomer(id)) as Customer);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updatePartialCustomer,
  deleteCustomer
};
