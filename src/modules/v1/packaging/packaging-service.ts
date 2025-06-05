import { PackagingWithRelations } from "@pontalti/types/packaging.types";
import { CreatePackagingDTO, UpdatePackagingDTO } from "@pontalti/types/packaging.types";
import * as packagingRepository from "@pontalti/repository/packaging";

const createPackaging = async (data: CreatePackagingDTO): Promise<PackagingWithRelations> => {
  return await packagingRepository.createPackaging(data);
};

const getPackaging = async (id: number): Promise<PackagingWithRelations | null> => {
  return await packagingRepository.getPackaging(id);
};

const getAllPackagings = async (): Promise<PackagingWithRelations[]> => {
  return await packagingRepository.getAllPackagings();
};

const updatePackaging = async (id: number, data: UpdatePackagingDTO): Promise<PackagingWithRelations> => {
  return await packagingRepository.updatePackaging(id, data);
};

const deletePackaging = async (id: number): Promise<PackagingWithRelations> => {
  return await packagingRepository.deletePackaging(id);
};

const getPackagingByStorageLocation = async (storage_location: string): Promise<PackagingWithRelations[]> => {
  return await packagingRepository.getPackagingByStorageLocation(storage_location);
};

const getPackagingByQuantity = async (minQuantity: number): Promise<PackagingWithRelations[]> => {
  return await packagingRepository.getPackagingByQuantity(minQuantity);
};

export default {
  createPackaging,
  getPackaging,
  getAllPackagings,
  updatePackaging,
  deletePackaging,
  getPackagingByStorageLocation,
  getPackagingByQuantity
}; 