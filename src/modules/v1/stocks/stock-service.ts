import stockRepository from "@pontalti/repository/stock";
import { StockRegister, StockRequest, UpdatePartialStock } from "@pontalti/types/stock.types";

const createStock = async (data: StockRegister) => {
  return stockRepository.createStock(data);
};

const getStock = async (id: number) => {
  return stockRepository.getStock(id);
};

const getStocks = async (filters: StockRequest) => {
  return stockRepository.getStocks(filters);
};

const updatePartialStock = async (id: number, data: UpdatePartialStock) => {
  return stockRepository.updatePartialStock(id, data);
};

const deleteStock = async (id: number) => {
  return stockRepository.deleteStock(id);
};

export default {
  createStock,
  getStock,
  getStocks,
  updatePartialStock,
  deleteStock
}; 