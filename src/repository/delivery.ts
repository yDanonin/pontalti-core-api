import { PrismaClient } from "@prisma/client";
import { DeliveryRegister, UpdatePartialDelivery, DeliveryStatus } from "../types/delivery.types";

const prisma = new PrismaClient();

const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

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

const getDeliveriesByDate = async (date: Date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const deliveries = await prisma.delivery.findMany({
    where: {
      delivery_date: {
        gte: startOfDay,
        lte: endOfDay
      }
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

  return deliveries;
};

const getDeliveriesByDateRange = async (startDate: Date, endDate: Date) => {
  const normalizedStartDate = normalizeDate(startDate);
  const normalizedEndDate = normalizeDate(endDate);
  normalizedEndDate.setHours(23, 59, 59, 999);

  const deliveries = await prisma.delivery.findMany({
    where: {
      delivery_date: {
        gte: normalizedStartDate,
        lte: normalizedEndDate
      }
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

  return deliveries;
};

export default {
  createDelivery,
  getDelivery,
  getAllDeliveries,
  updateDelivery,
  deleteDelivery,
  getDeliveriesByDate,
  getDeliveriesByDateRange
}; 