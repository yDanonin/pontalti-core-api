import { CommonRequest } from "@pontalti/types/common.types";
import prisma from "@pontalti/lib/prisma";
import { ProductReturnRegister, ProductReturn } from "@pontalti/types/product-return.types";
import { defaultSelectedFieldForOrders } from "./order";
import { ReturnedLabel } from "@pontalti/types/returned_label.types";

const defaultSelectedFieldForProductReturn = {
  id: true,
  amount: true,
  return_reason: true,
  replacement_necessary: true,
  resold: true,
  date: true,
  created_at: true,
  updated_at: true,
  order: {
    select: defaultSelectedFieldForOrders
  },
  returned_label: {
    select: {
      id: true,
      opened: true,
    }
  }
};

const createProductReturn = async (data: ProductReturnRegister, returned_labels: ReturnedLabel[]) => {
  try {
    const result = await prisma.$transaction(async (transaction) => {
      const registeredProductReturns = await prisma.productReturns.create({ data: {
        amount: data.amount,
        date: data.date,
        replacement_necessary: data.replacement_necessary,
        resold: data.resold,
        return_reason: data.return_reason,
        order_id: data.order_id,
      }, select: defaultSelectedFieldForProductReturn });

      const labelsEntries = await Promise.all(
        returned_labels.map(async returned_label => {
          return transaction.returnedLabels.create({
            data: {
              ticket_code: returned_label.ticket_code,
              opened: returned_label.opened,
              product_return_id: registeredProductReturns.id
            }
          });
        })
      );
      return {
        productsReturns: registeredProductReturns,
        labels: labelsEntries
      };
    });

    return result;
  } catch (error) {
    console.error("Failed to create order and order items:", error);
    throw error;
  }
};

const getProductReturn = async (id: number) => {
  return await prisma.productReturns.findUnique({ where: { id }, select: defaultSelectedFieldForProductReturn });
};

const getProductReturns = async (filters: CommonRequest<ProductReturn>) => {
  const { page, perPage } = filters;
  const skip = page !== 1 && page != undefined ? (page - 1) * perPage : undefined;
  return await prisma.productReturns.findMany({
    take: perPage,
    skip: skip,
    select: defaultSelectedFieldForProductReturn
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialProductReturn = async (id: number, data: any): Promise<ProductReturn> => {
  const existingProductReturn = await prisma.productReturns.findUnique({
    where: { id }
  });

  if (!existingProductReturn) {
    throw new Error("ProductReturn not found");
  }

  const updatedProductReturn = await prisma.productReturns.update({
    where: { id },
    data: {
      ...existingProductReturn,
      ...data
    },
    select: defaultSelectedFieldForProductReturn
  });

  return updatedProductReturn;
};

const deleteProductReturn = async (id: number) => {
  return await prisma.productReturns.delete({ where: { id }, select: defaultSelectedFieldForProductReturn });
};

export default {
  createProductReturn,
  getProductReturn,
  getProductReturns,
  updatePartialProductReturn,
  deleteProductReturn
};
