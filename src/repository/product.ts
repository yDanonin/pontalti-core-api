import { Product, ProductRegister } from "@pontalti/types/product.types";
import { CommonRequest } from "@pontalti/types/common.types";
import prisma from "@pontalti/lib/prisma";

const createProduct = async (data: ProductRegister) => {
  return await prisma.products.create({ 
    data: {
      ...data,
      created_at: new Date(),
      updated_at: new Date()
    }  
  });
};

const getProduct = async (id: number) => {
  return await prisma.products.findUnique({ where: { id } });
};

const getProducts = async (filters: CommonRequest<Product>) => {
  const { page, perPage } = filters;
  const skip = page !== 1 && page != undefined ? (page - 1) * perPage : undefined;
  return await prisma.products.findMany({
    take: perPage,
    skip: skip
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialProduct = async (id: number, data: any) => {
  const existingProduct = await prisma.products.findUnique({
    where: { id }
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  const updatedProduct = await prisma.products.update({
    where: { id },
    data: {
      ...existingProduct,
      ...data,
      updated_at: new Date()
    }
  });

  return updatedProduct;
};

const deleteProduct = async (id: number) => {
  return await prisma.products.delete({ where: { id } });
};

export default {
  createProduct,
  getProduct,
  getProducts,
  updatePartialProduct,
  deleteProduct
};
