import { Order, OrderRegister } from "@pontalti/types/order.types";
import { Status, CommonRequest, DefaultResponse } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/order";


const createOrder = async (data: OrderRegister) => {
  return ((await repository.createOrder(data)) as Order);
};

const getAllOrders = async (filters: CommonRequest) => {
  return (await repository.getOrders(filters) as Order[]);
};

const getOrderById = async (id: number) => {
  return (await repository.getOrder(id) as Order);
};

const updatePartialOrder = async (id: number, data: unknown) => {
  return (await repository.updatePartialOrder(id, data) as Order);
};

const deleteOrder = async (id: number) => {
  return (await repository.deleteOrder(id) as Order);
};

export default {
  createOrder,
  getOrderById,
  getAllOrders,
  updatePartialOrder,
  deleteOrder
};
