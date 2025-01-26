import { ProductReturn, ProductReturnRegister } from "@pontalti/types/product-return.types";
import { CommonRequest } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/product-return";
import { ReturnedLabel } from "@pontalti/types/returned_label.types";

const createProductReturn = async (data: ProductReturnRegister, returned_labels: ReturnedLabel[]) => {
  return await repository.createProductReturn(data, returned_labels);
};

const getAllProductReturns = async (filters: CommonRequest) => {
  return (await repository.getProductReturns(filters) as ProductReturn[]);
};

const getProductReturnById = async (id: number) => {
  return (await repository.getProductReturn(id) as ProductReturn);
};

const updatePartialProductReturn = async (id: number, data: unknown) => {
  return (await repository.updatePartialProductReturn(id, data) as ProductReturn);
};

const deleteProductReturn = async (id: number) => {
  return (await repository.deleteProductReturn(id) as ProductReturn);
};

export default {
  createProductReturn,
  getProductReturnById,
  getAllProductReturns,
  updatePartialProductReturn,
  deleteProductReturn
};
