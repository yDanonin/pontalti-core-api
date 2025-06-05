import { PrismaClient } from "@prisma/client";
import { CreateCustomerPackagingDTO, UpdateCustomerPackagingDTO, CustomerPackagingWithRelations } from "@pontalti/types/customer-packaging.types";

const dbClient = new PrismaClient();

const defaultSelectedFieldsForCustomerPackaging = {
  id: true,
  customer_id: true,
  packaging_id: true,
  pontalti_brand: true,
  created_at: true,
  updated_at: true,
  customer: {
    select: {
      id: true,
      status: true,
      address_id: true,
      credit_limit: true,
      debts: true,
      name: true,
      phone: true,
      cel_number: true,
      email: true,
      store_name: true,
      deliver: true,
      pontalti: true,
      secondary_line: true,
      cpf: true,
      cnpj: true,
      created_at: true,
      updated_at: true,
      address: {
        select: {
          id: true,
          zip_code: true,
          neighborhood: true,
          public_place: true,
          city: true,
          state: true,
          complement: true,
          address_number: true
        }
      }
    }
  },
  packaging: {
    select: {
      id: true,
      name: true,
      quantity: true,
      storage_location: true,
      created_at: true,
      updated_at: true
    }
  }
};

export const createCustomerPackaging = async (data: CreateCustomerPackagingDTO): Promise<CustomerPackagingWithRelations> => {
  return await dbClient.customerPackaging.create({
    data: {
      ...data,
      created_at: new Date(),
      updated_at: new Date()
    },
    select: defaultSelectedFieldsForCustomerPackaging
  });
};

export const getCustomerPackaging = async (id: number): Promise<CustomerPackagingWithRelations | null> => {
  return await dbClient.customerPackaging.findUnique({
    where: { id },
    select: defaultSelectedFieldsForCustomerPackaging
  });
};

export const getAllCustomerPackagings = async (): Promise<CustomerPackagingWithRelations[]> => {
  return await dbClient.customerPackaging.findMany({
    select: defaultSelectedFieldsForCustomerPackaging
  });
};

export const updateCustomerPackaging = async (id: number, data: UpdateCustomerPackagingDTO): Promise<CustomerPackagingWithRelations> => {
  return await dbClient.customerPackaging.update({
    where: { id },
    data: {
      ...data,
      updated_at: new Date()
    },
    select: defaultSelectedFieldsForCustomerPackaging
  });
};

export const deleteCustomerPackaging = async (id: number): Promise<CustomerPackagingWithRelations> => {
  return await dbClient.customerPackaging.delete({
    where: { id },
    select: defaultSelectedFieldsForCustomerPackaging
  });
};

export const getCustomerPackagingByCustomer = async (customer_id: number): Promise<CustomerPackagingWithRelations[]> => {
  return await dbClient.customerPackaging.findMany({
    where: { customer_id },
    select: defaultSelectedFieldsForCustomerPackaging
  });
};

export const getCustomerPackagingByPackaging = async (packaging_id: number): Promise<CustomerPackagingWithRelations[]> => {
  return await dbClient.customerPackaging.findMany({
    where: { packaging_id },
    select: defaultSelectedFieldsForCustomerPackaging
  });
};

export const getCustomerPackagingsByPontaltiBrand = async (pontalti_brand: boolean) => {
  return await dbClient.customerPackaging.findMany({
    where: { pontalti_brand },
    include: {
      customer: true,
      packaging: true
    }
  });
}; 