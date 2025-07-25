import productionControlRepository from "@pontalti/repository/production-control";
import { ProductionControlRegister, ProductionControlRequest, UpdatePartialProductionControl } from "@pontalti/types/production-control.types";

const createProductionControl = async (data: ProductionControlRegister) => {
  return productionControlRepository.createProductionControl(data);
};

const getProductionControl = async (id: number) => {
  return productionControlRepository.getProductionControl(id);
};

const getProductionControls = async (filters: ProductionControlRequest) => {
  return productionControlRepository.getProductionControls(filters);
};

const updatePartialProductionControl = async (id: number, data: UpdatePartialProductionControl) => {
  return productionControlRepository.updatePartialProductionControl(id, data);
};

const deleteProductionControl = async (id: number) => {
  return productionControlRepository.deleteProductionControl(id);
};

export default {
  createProductionControl,
  getProductionControl,
  getProductionControls,
  updatePartialProductionControl,
  deleteProductionControl
}; 