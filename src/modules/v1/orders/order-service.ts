import { Order, OrderRegister } from "@pontalti/types/order.types";
import { CommonRequest } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/order";
import { ProductIdAndQuantity } from "@pontalti/types/order-item.types";

const createOrder = async (order: OrderRegister, products: ProductIdAndQuantity[]) => {
  return await repository.createOrder(order, products);
};

const getAllOrders = async (filters: CommonRequest) => {
  return (await repository.getOrders(filters) as Order[]);
};

const getOrderById = async (id: number) => {
  return (await repository.getOrder(id) as Order);
};

const updatePartialOrder = async (id: number, data: unknown) => {
  return await repository.updatePartialOrder(id, data);
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
