import { PrismaClient } from "@prisma/client";
import { DeliveryRegister, UpdatePartialDelivery, DeliveryStatus } from "../types/delivery.types";

const prisma = new PrismaClient();

const createDelivery = async (data: DeliveryRegister) => {
  const { packagings, ...deliveryData } = data;

  const delivery = await prisma.delivery.create({
    data: {
      ...deliveryData,
      status: Number(deliveryData.status),
      packagings: {
        create: packagings.map(p => ({
          packaging_id: p.packaging_id,
          quantity: p.quantity,
        })),
      },
    },
    include: {
      packagings: {
        include: {
          packaging: true,
        },
      },
      order: {
        include: {
          customer: {
            include: {
              address: true
            }
          }
        }
      },
    },
  });

  return delivery;
};

const getDelivery = async (id: number) => {
  const delivery = await prisma.delivery.findUnique({
    where: { id },
    include: {
      packagings: {
        include: {
          packaging: true,
        },
      },
      order: {
        include: {
          customer: {
            include: {
              address: true
            }
          }
        }
      },
    },
  });

  return delivery;
};

const getAllDeliveries = async () => {
  const deliveries = await prisma.delivery.findMany({
    include: {
      packagings: {
        include: {
          packaging: true,
        },
      },
      order: {
        include: {
          customer: {
            include: {
              address: true
            }
          }
        }
      },
    },
  });

  return deliveries;
};

const updateDelivery = async (id: number, data: UpdatePartialDelivery) => {
  const { packagings, ...deliveryData } = data;

  // If packagings are provided, delete existing ones and create new ones
  if (packagings) {
    await prisma.deliveryPackaging.deleteMany({
      where: { delivery_id: id },
    });
  }

  const delivery = await prisma.delivery.update({
    where: { id },
    data: {
      ...deliveryData,
      ...(deliveryData.status && { status: Number(deliveryData.status) }),
      ...(packagings && {
        packagings: {
          create: packagings.map(p => ({
            packaging_id: p.packaging_id,
            quantity: p.quantity,
          })),
        },
      }),
    },
    include: {
      packagings: {
        include: {
          packaging: true,
        },
      },
      order: {
        include: {
          customer: {
            include: {
              address: true
            }
          }
        }
      },
    },
  });

  return delivery;
};

const deleteDelivery = async (id: number) => {
  // First delete all related delivery packagings
  await prisma.deliveryPackaging.deleteMany({
    where: { delivery_id: id },
  });

  // Then delete the delivery
  const delivery = await prisma.delivery.delete({
    where: { id },
  });

  return delivery;
};

export default {
  createDelivery,
  getDelivery,
  getAllDeliveries,
  updateDelivery,
  deleteDelivery
}; 