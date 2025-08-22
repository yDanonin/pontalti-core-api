import { CreateDeliveryPackagingDTO, UpdateDeliveryPackagingDTO, DeliveryPackagingWithRelations } from "@pontalti/types/delivery-packaging.types";
import prisma, { dbErrorHandle } from "@pontalti/lib/prisma";

const defaultSelectedFieldsForDeliveryPackaging = {
  id: true,
  delivery_id: true,
  packaging_id: true,
  quantity: true,
  created_at: true,
  updated_at: true,
  delivery: {
    select: {
      id: true,
      order_id: true,
      status: true,
      delivery_date: true,
      created_at: true,
      updated_at: true
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

export const createDeliveryPackaging = async (data: CreateDeliveryPackagingDTO): Promise<DeliveryPackagingWithRelations> => {
  try {
    return await prisma.deliveryPackaging.create({
      data: {
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      },
      select: defaultSelectedFieldsForDeliveryPackaging
    });
  } catch(e) {
    dbErrorHandle(e)
  }
};

export const getDeliveryPackaging = async (id: number): Promise<DeliveryPackagingWithRelations | null> => {
  try {
    return await prisma.deliveryPackaging.findUnique({
      where: { id },
      select: defaultSelectedFieldsForDeliveryPackaging
    });
  } catch(e) {
    dbErrorHandle(e)
  }
};

export const getAllDeliveryPackagings = async (): Promise<DeliveryPackagingWithRelations[]> => {
  try {
    return await prisma.deliveryPackaging.findMany({
      select: defaultSelectedFieldsForDeliveryPackaging
    });
  } catch(e) {
    dbErrorHandle(e)
  }
};

export const updateDeliveryPackaging = async (id: number, data: UpdateDeliveryPackagingDTO): Promise<DeliveryPackagingWithRelations> => {
  try {
    return await prisma.deliveryPackaging.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date()
      },
      select: defaultSelectedFieldsForDeliveryPackaging
    });
  } catch(e) {
    dbErrorHandle(e)
  }
};

export const deleteDeliveryPackaging = async (id: number): Promise<DeliveryPackagingWithRelations> => {
  try {
    return await prisma.deliveryPackaging.delete({
      where: { id },
      select: defaultSelectedFieldsForDeliveryPackaging
    });
  } catch(e) {
    dbErrorHandle(e)
  }
};

export const getDeliveryPackagingByDelivery = async (delivery_id: number): Promise<DeliveryPackagingWithRelations[]> => {
  try {
    return await prisma.deliveryPackaging.findMany({
      where: { delivery_id },
      select: defaultSelectedFieldsForDeliveryPackaging
    });
  } catch(e) {
    dbErrorHandle(e)
  }
};

export const getDeliveryPackagingByPackaging = async (packaging_id: number): Promise<DeliveryPackagingWithRelations[]> => {
  try {
    return await prisma.deliveryPackaging.findMany({
      where: { packaging_id },
      select: defaultSelectedFieldsForDeliveryPackaging
    });
  } catch(e) {
    dbErrorHandle(e)
  }
};

export const getDeliveryPackagingByDeliveryAndPackaging = async (
  delivery_id: number,
  packaging_id: number
): Promise<DeliveryPackagingWithRelations | null> => {
  try {
    return await prisma.deliveryPackaging.findFirst({
      where: { delivery_id, packaging_id },
      select: defaultSelectedFieldsForDeliveryPackaging
    });
  } catch (e) {
    dbErrorHandle(e)
  }
}; 