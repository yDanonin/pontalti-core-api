import { PrismaClient } from "@prisma/client";
import { CreatePackagingDTO, UpdatePackagingDTO, PackagingWithRelations } from "@pontalti/types/packaging.types";

const dbClient = new PrismaClient();

const defaultSelectedFieldsForPackaging = {
  id: true,
  name: true,
  quantity: true,
  storage_location: true,
  created_at: true,
  updated_at: true,
  customers: {
    select: {
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
      }
    }
  }
};

export const createPackaging = async (data: CreatePackagingDTO): Promise<PackagingWithRelations> => {
  return await dbClient.packaging.create({
    data: {
      ...data,
      created_at: new Date(),
      updated_at: new Date()
    },
    select: defaultSelectedFieldsForPackaging
  });
};

export const getPackaging = async (id: number): Promise<PackagingWithRelations | null> => {
  return await dbClient.packaging.findUnique({
    where: { id },
    select: defaultSelectedFieldsForPackaging
  });
};

export const getAllPackagings = async (): Promise<PackagingWithRelations[]> => {
  return await dbClient.packaging.findMany({
    select: defaultSelectedFieldsForPackaging
  });
};

export const updatePackaging = async (id: number, data: UpdatePackagingDTO): Promise<PackagingWithRelations> => {
  return await dbClient.packaging.update({
    where: { id },
    data: {
      ...data,
      updated_at: new Date()
    },
    select: defaultSelectedFieldsForPackaging
  });
};

export const deletePackaging = async (id: number): Promise<PackagingWithRelations> => {
  return await dbClient.packaging.delete({
    where: { id },
    select: defaultSelectedFieldsForPackaging
  });
};

export const getPackagingByStorageLocation = async (storage_location: string): Promise<PackagingWithRelations[]> => {
  return await dbClient.packaging.findMany({
    where: { storage_location },
    select: defaultSelectedFieldsForPackaging
  });
};

export const getPackagingByQuantity = async (minQuantity: number): Promise<PackagingWithRelations[]> => {
  return await dbClient.packaging.findMany({
    where: {
      quantity: {
        gte: minQuantity
      }
    },
    select: defaultSelectedFieldsForPackaging
  });
}; 