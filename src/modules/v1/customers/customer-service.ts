import { Customer, CustomerRequest, CustomerStatusString, UpdatePartialCustomer } from "@pontalti/types/customer.types";
import { PaginationResponse, Status } from "@pontalti/types/common.types";
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
    return handleStatusInCustomer((await repository.createCustomer(data)) as Customer);
  } catch (e: any) {
    throw e;
  }
};

const getAllCustomers = async (filters: CustomerRequest) => {
  try {
    return handleStatusInCustomer((await repository.getCustomers(filters)) as PaginationResponse<Customer>);
  } catch (e: any) {
    throw e;
  }
};

const getCustomerById = async (id: number) => {
  try {
    return handleStatusInCustomer((await repository.getCustomer(id)) as Customer);
  } catch (e: any) {
    throw e;
  }
};

const updatePartialCustomer = async (id: number, data: UpdatePartialCustomer) => {
  try {
    const credit_limit = data.credit_limit | (await repository.getCustomer(id)).credit_limit
    if(data.debts && data.debts > credit_limit){
      data.status = 0
    }


    return handleStatusInCustomer((await repository.updatePartialCustomer(id, data)) as Customer);
  } catch (e: any) {
    throw e;
  }
};

const deleteCustomer = async (id: number) => {
  try {
    return handleStatusInCustomer((await repository.deleteCustomer(id)) as Customer);
  } catch (e: any) {
    throw e;
  }
};

export default {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updatePartialCustomer,
  deleteCustomer
};
