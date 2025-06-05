import { CustomerPackagingWithRelations } from "@pontalti/types/customer-packaging.types";
import { CreateCustomerPackagingDTO, UpdateCustomerPackagingDTO } from "@pontalti/types/customer-packaging.types";
import * as customerPackagingRepository from "@pontalti/repository/customer-packaging";

const createCustomerPackaging = async (data: CreateCustomerPackagingDTO): Promise<CustomerPackagingWithRelations> => {
  return await customerPackagingRepository.createCustomerPackaging(data);
};

const getCustomerPackaging = async (id: number): Promise<CustomerPackagingWithRelations | null> => {
  return await customerPackagingRepository.getCustomerPackaging(id);
};

const getAllCustomerPackagings = async (): Promise<CustomerPackagingWithRelations[]> => {
  return await customerPackagingRepository.getAllCustomerPackagings();
};

const updateCustomerPackaging = async (id: number, data: UpdateCustomerPackagingDTO): Promise<CustomerPackagingWithRelations> => {
  return await customerPackagingRepository.updateCustomerPackaging(id, data);
};

const deleteCustomerPackaging = async (id: number): Promise<CustomerPackagingWithRelations> => {
  return await customerPackagingRepository.deleteCustomerPackaging(id);
};

const getCustomerPackagingByCustomer = async (customer_id: number): Promise<CustomerPackagingWithRelations[]> => {
  return await customerPackagingRepository.getCustomerPackagingByCustomer(customer_id);
};

const getCustomerPackagingByPackaging = async (packaging_id: number): Promise<CustomerPackagingWithRelations[]> => {
  return await customerPackagingRepository.getCustomerPackagingByPackaging(packaging_id);
};

const getCustomerPackagingByPontaltiBrand = async (pontalti_brand: boolean): Promise<CustomerPackagingWithRelations[]> => {
  return await customerPackagingRepository.getCustomerPackagingsByPontaltiBrand(pontalti_brand);
};

export default {
  createCustomerPackaging,
  getCustomerPackaging,
  getAllCustomerPackagings,
  updateCustomerPackaging,
  deleteCustomerPackaging,
  getCustomerPackagingByCustomer,
  getCustomerPackagingByPackaging,
  getCustomerPackagingByPontaltiBrand
}; 