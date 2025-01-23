import { Order, OrderRegister } from "@pontalti/types/order.types";
import { CommonRequest } from "@pontalti/types/common.types";
import prisma from "@pontalti/lib/prisma";

// model Orders {
//   id          Int      @id @default(autoincrement())
//   final_price Float
//   amount      Int
//   date        DateTime
//   created_at  DateTime @default(now())
//   updated_at  DateTime @updatedAt
//   customer_id Int
//   product_id  Int

//   products  Products  @relation(fields: [product_id], references: [id])
//   customers Customers @relation(fields: [customer_id], references: [id])

//   payments       Payments[]
//   productReturns ProductReturns[]
// }

const defaultSelectedFieldForOrders = {
  id: true,
  final_price: true,
  amount: true,
  date: true,
  created_at: true,
  updated_at: true,
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
      updated_at: true,
      address: {
        select: {
          id: true,
          zip_code: true,
          neighborhood: true,
          public_place: true,
          city: true,
          state: true,
          complement: true,
          address_number: true
        }
      }
    }
  },
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
  }
};

const createOrder = async (data: OrderRegister): Promise<Order> => {
  return await prisma.orders.create({ data: {
    amount: data.amount,
    date: data.date,
    final_price: data.final_price,
    customer_id: data.customer_id,
    product_id: data.product_id
  }, select: defaultSelectedFieldForOrders });
};

const getOrder = async (id: number) => {
  return await prisma.orders.findUnique({ where: { id }, select: defaultSelectedFieldForOrders });
};

const getOrders = async (filters: CommonRequest<Order>) => {
  const { page, perPage } = filters;
  const skip = page !== 1 && page != undefined ? (page - 1) * perPage : undefined;
  return await prisma.orders.findMany({
    take: perPage,
    skip: skip,
    select: defaultSelectedFieldForOrders
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialOrder = async (id: number, data: any): Promise<Order> => {
  const existingOrder = await prisma.orders.findUnique({
    where: { id }
  });

  if (!existingOrder) {
    throw new Error("Order not found");
  }

  const updatedOrder = await prisma.orders.update({
    where: { id },
    data: {
      ...existingOrder,
      ...data
    },
    select: defaultSelectedFieldForOrders
  });

  return updatedOrder;
};

const deleteOrder = async (id: number) => {
  return await prisma.orders.delete({ where: { id }, select: defaultSelectedFieldForOrders });
};

export default {
  createOrder,
  getOrder,
  getOrders,
  updatePartialOrder,
  deleteOrder
};
