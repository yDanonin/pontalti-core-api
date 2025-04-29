import prisma, { dbErrorHandle } from "@pontalti/lib/prisma";
import { CreatePriceData, UpdatePriceData, Price } from "@pontalti/types/price.types";

const defaultInclude = {
  product: {
    select: {
      id: true,
      status: true,
      volume_sales: true,
      sales: true,
      invoicing: true,
      name: true,
      model: true,
      size: true,
      character: true,
      moldes: true,
      equivalency: true,
      created_at: true,
      updated_at: true
    }
  },
  customer: {
    select: {
      id: true,
      status: true,
      address_id: true,
      credit_limit: true,
      debts: true,
      name: true,
      phone: true,
      cel_number: true,
      email: true,
      store_name: true,
      deliver: true,
      pontalti: true,
      secondary_line: true,
      cpf: true,
      cnpj: true,
      created_at: true,
      updated_at: true
    }
  }
};

const createPrice = async (data: CreatePriceData): Promise<Price> => {
  try {
    return await prisma.prices.create({
      data: {
        ...data,
        created_at: new Date(),
        last_update: new Date()
      },
      include: defaultInclude
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const getPriceById = async (id: number): Promise<Price> => {
  try {
    return await prisma.prices.findUnique({
      where: { id },
      include: defaultInclude
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const getPriceByProductAndCustomer = async (product_id: number, customer_id?: number): Promise<Price> => {
  try {
    return await prisma.prices.findUnique({
      where: {
        product_id_customer_id: {
          product_id,
          customer_id
        }
      },
      include: defaultInclude
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const getAllPrices = async (): Promise<Price[]> => {
  try {
    return await prisma.prices.findMany({
      include: defaultInclude
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const updatePrice = async (id: number, data: UpdatePriceData): Promise<Price> => {
  try {
    return await prisma.prices.update({
      where: { id },
      data: {
        ...data,
        last_update: new Date()
      },
      include: defaultInclude
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const deletePrice = async (id: number): Promise<Price> => {
  try {
    return await prisma.prices.delete({
      where: { id },
      include: defaultInclude
    });
  } catch (e) {
    dbErrorHandle(e);
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