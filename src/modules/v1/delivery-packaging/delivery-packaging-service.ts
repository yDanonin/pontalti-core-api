import { DeliveryPackagingWithRelations } from "@pontalti/types/delivery-packaging.types";
import { CreateDeliveryPackagingDTO, UpdateDeliveryPackagingDTO } from "@pontalti/types/delivery-packaging.types";
import * as deliveryPackagingRepository from "@pontalti/repository/delivery-packaging";
import { ConflictError } from "@pontalti/utils/errors";

const createDeliveryPackaging = async (data: CreateDeliveryPackagingDTO): Promise<DeliveryPackagingWithRelations> => {
  const exists = await deliveryPackagingRepository.getDeliveryPackagingByDeliveryAndPackaging(
    data.delivery_id,
    data.packaging_id
  );
  if (exists) {
    throw new ConflictError("Já existe uma embalagem cadastrada para esta entrega com este ID de embalagem.");
  }
  return await deliveryPackagingRepository.createDeliveryPackaging(data);
};

const getDeliveryPackaging = async (id: number): Promise<DeliveryPackagingWithRelations | null> => {
  return await deliveryPackagingRepository.getDeliveryPackaging(id);
};

const getAllDeliveryPackagings = async (): Promise<DeliveryPackagingWithRelations[]> => {
  return await deliveryPackagingRepository.getAllDeliveryPackagings();
};

const updateDeliveryPackaging = async (id: number, data: UpdateDeliveryPackagingDTO): Promise<DeliveryPackagingWithRelations> => {
  return await deliveryPackagingRepository.updateDeliveryPackaging(id, data);
};

const deleteDeliveryPackaging = async (id: number): Promise<DeliveryPackagingWithRelations> => {
  return await deliveryPackagingRepository.deleteDeliveryPackaging(id);
};

const getDeliveryPackagingByDelivery = async (delivery_id: number): Promise<DeliveryPackagingWithRelations[]> => {
  return await deliveryPackagingRepository.getDeliveryPackagingByDelivery(delivery_id);
};

const getDeliveryPackagingByPackaging = async (packaging_id: number): Promise<DeliveryPackagingWithRelations[]> => {
  return await deliveryPackagingRepository.getDeliveryPackagingByPackaging(packaging_id);
};

export default {
  createDeliveryPackaging,
  getDeliveryPackaging,
  getAllDeliveryPackagings,
  updateDeliveryPackaging,
  deleteDeliveryPackaging,
  getDeliveryPackagingByDelivery,
  getDeliveryPackagingByPackaging
};
