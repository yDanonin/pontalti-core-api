import { MaterialOrder, MaterialOrderRegister } from "@pontalti/types/material-order.types";
import { CommonRequest } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/material-order";


const createMaterialOrder = async (data: MaterialOrderRegister) => {
  return ((await repository.createMaterialOrder(data)) as MaterialOrder);
};

const getAllMaterialOrders = async (filters: CommonRequest) => {
  return (await repository.getMaterialOrders(filters) as MaterialOrder[]);
};

const getMaterialOrderById = async (id: number) => {
  return (await repository.getMaterialOrder(id) as MaterialOrder);
};

const updatePartialMaterialOrder = async (id: number, data: unknown) => {
  return (await repository.updatePartialMaterialOrder(id, data) as MaterialOrder);
};

const deleteMaterialOrder = async (id: number) => {
  return (await repository.deleteMaterialOrder(id) as MaterialOrder);
};

export default {
  createMaterialOrder,
  getMaterialOrderById,
  getAllMaterialOrders,
  updatePartialMaterialOrder,
  deleteMaterialOrder
};
