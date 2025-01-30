import { CreatePriceData, UpdatePriceData, Price } from "@pontalti/types/price.types";
import repository from "@pontalti/repository/price";
import { NotFoundError } from "@pontalti/utils/errors";
import { DefaultResponse } from "@pontalti/types/common.types";

const createPrice = async (data: CreatePriceData): Promise<DefaultResponse<Price>> => {
  try {
    const response = await repository.createPrice(data);
    return { data: response };
  } catch (e) {
    throw e;
  }
};

const getPriceById = async (id: number): Promise<DefaultResponse<Price>> => {
  try {
    const price = await repository.getPriceById(id);
    if (!price) {
      throw new NotFoundError("Preço não encontrado");
    }
    return { data: price };
  } catch (e) {
    throw e;
  }
};

const getPriceByProductAndCustomer = async (product_id: number, customer_id?: number): Promise<DefaultResponse<Price>> => {
  try {
    const price = await repository.getPriceByProductAndCustomer(product_id, customer_id);
    if (!price) {
      throw new NotFoundError("Preço não encontrado para este produto e cliente");
    }
    return { data: price };
  } catch (e) {
    throw e;
  }
};

const getAllPrices = async (): Promise<DefaultResponse<Price[]>> => {
  try {
    const prices = await repository.getAllPrices();
    return { data: prices };
  } catch (e) {
    throw e;
  }
};

const updatePrice = async (id: number, data: UpdatePriceData): Promise<DefaultResponse<Price>> => {
  try {
    // Verifica se o preço existe
    const existingPrice = await repository.getPriceById(id);
    if (!existingPrice) {
      throw new NotFoundError("Preço não encontrado");
    }

    const updatedPrice = await repository.updatePrice(id, data);
    return { data: updatedPrice };
  } catch (e) {
    throw e;
  }
};

const deletePrice = async (id: number): Promise<DefaultResponse<Price>> => {
  try {
    // Verifica se o preço existe
    const existingPrice = await repository.getPriceById(id);
    if (!existingPrice) {
      throw new NotFoundError("Preço não encontrado");
    }

    const deletedPrice = await repository.deletePrice(id);
    return { data: deletedPrice };
  } catch (e) {
    throw e;
  }
};

export default {
  createPrice,
  getPriceById,
  getPriceByProductAndCustomer,
  getAllPrices,
  updatePrice,
  deletePrice
}; 