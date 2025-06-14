import { Delivery, DeliveryRegister, UpdatePartialDelivery } from "@pontalti/types/delivery.types";
import { CommonRequest, DefaultResponse } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/delivery";

const handleDelivery = (e: Delivery | Delivery[]) => {
  if (Array.isArray(e)) {
    const response = e.map((data: Delivery) => {
      const { status, ...delivery } = data;
      return { ...delivery, status: status };
    });
    return { data: response };
  }

  const { status, ...delivery } = e;
  return { ...delivery, status: status };
};

const createDelivery = async (data: DeliveryRegister) => {
  return handleDelivery((await repository.createDelivery(data)) as Delivery);
};

const getAllDeliveries = async (filters: CommonRequest) => {
  return handleDelivery((await repository.getAllDeliveries()) as Delivery[]);
};

const getDeliveryById = async (id: number) => {
  return handleDelivery((await repository.getDelivery(id)) as Delivery);
};

const updateDelivery = async (id: number, data: UpdatePartialDelivery) => {
  return handleDelivery((await repository.updateDelivery(id, data)) as Delivery);
};

const deleteDelivery = async (id: number) => {
  return handleDelivery((await repository.deleteDelivery(id)) as Delivery);
};

const getDeliveriesByDate = async (date: Date) => {
  return await repository.getDeliveriesByDate(date);
};

const getDeliveriesByDateRange = async (startDate: Date, endDate: Date) => {
  return await repository.getDeliveriesByDateRange(startDate, endDate);
};

export default {
  createDelivery,
  getDeliveryById,
  getAllDeliveries,
  updateDelivery,
  deleteDelivery,
  getDeliveriesByDate,
  getDeliveriesByDateRange
}; 