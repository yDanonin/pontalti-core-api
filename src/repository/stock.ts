import { Stock, StockRegister, StockRequest } from "@pontalti/types/stock.types";
import prisma, { dbErrorHandle } from "@pontalti/lib/prisma";
import { PaginationResponse } from "@pontalti/types/common.types";

const createStock = async (data: StockRegister): Promise<Stock> => {
  try {
    return await prisma.stock.create({
      data,
      include: { product: true }
    });
  } catch(e) {
    dbErrorHandle(e);
  }
};

const getStock = async (id: number): Promise<Stock> => {
  try {
    return await prisma.stock.findUnique({ where: { id }, include: { product: true } });
  } catch(e) {
    dbErrorHandle(e);
  }
};

const getStocks = async (filters: StockRequest): Promise<PaginationResponse<Stock>> => {
  try {
    const { page = 1, perPage = 10, ...where } = filters;
    const skip = page !== 1 ? (page - 1) * perPage : undefined;
    const result = await prisma.stock.findMany({
      where,
      include: { product: true },
      take: perPage,
      skip
    });
    const totalRecords = await prisma.stock.count({ where });
    return {
      data: result,
      totalRecord: totalRecords,
      page,
      perPage,
      nextPage: result.length === perPage ? `/api/stock?page=${page + 1}` : undefined
    };
  } catch(e) {
    dbErrorHandle(e);
  }
};

const updatePartialStock = async (id: number, data: Partial<Stock>): Promise<Stock> => {
  try {
    // Só permitir atualização dos campos válidos
    const { amount, location, product } = data;
    // Se quiser permitir troca de produto, aceite product_id
    // @ts-ignore
    const updateData: any = {};
    if (amount !== undefined) updateData.amount = amount;
    if (location !== undefined) updateData.location = location;
    // Permitir troca de produto
    // @ts-ignore
    if (data.product_id !== undefined) updateData.product_id = data.product_id;
    return await prisma.stock.update({
      where: { id },
      data: updateData,
      include: { product: true }
    });
  } catch(e) {
    dbErrorHandle(e);
  }
};

const deleteStock = async (id: number): Promise<Stock> => {
  try {
    return await prisma.stock.delete({ where: { id }, include: { product: true } });
  } catch(e) {
    dbErrorHandle(e);
  }
};

export default {
  createStock,
  getStock,
  getStocks,
  updatePartialStock,
  deleteStock
}; 