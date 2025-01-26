import { CommonRequest } from "@pontalti/types/common.types";
import prisma from "@pontalti/lib/prisma";
import { defaultSelectedFieldForOrders } from "./order"
import { PaymentRegister, Payment } from "@pontalti/types/payment.types";

const defaultSelectedFieldForPayment = {
  id: true,
  amount_paid: true,
  remaining: true,
  payment_method: true,
  date: true,
  created_at: true,
  updated_at: true,
  order: { select: defaultSelectedFieldForOrders }
};

const createPayment = async (data: PaymentRegister): Promise<Payment> => {
  return await prisma.payments.create({ data: {
    amount_paid: data.amount_paid,
    date: data.date,
    payment_method: data.payment_method,
    remaining: data.remaining,
    order_id: data.order_id
  }, select: defaultSelectedFieldForPayment });
};

const getPayment = async (id: number) => {
  return await prisma.payments.findUnique({ where: { id }, select: defaultSelectedFieldForPayment });
};

const getPayments = async (filters: CommonRequest<Payment>) => {
  const { page, perPage } = filters;
  const skip = page !== 1 && page != undefined ? (page - 1) * perPage : undefined;
  return await prisma.payments.findMany({
    take: perPage,
    skip: skip,
    select: defaultSelectedFieldForPayment
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialPayment = async (id: number, data: any): Promise<Payment> => {
  const existingPayment = await prisma.payments.findUnique({
    where: { id }
  });

  if (!existingPayment) {
    throw new Error("Payment not found");
  }

  const updatedPayment = await prisma.payments.update({
    where: { id },
    data: {
      ...existingPayment,
      ...data
    },
    select: defaultSelectedFieldForPayment
  });

  return updatedPayment;
};

const deletePayment = async (id: number) => {
  return await prisma.payments.delete({ where: { id }, select: defaultSelectedFieldForPayment });
};

export default {
  createPayment,
  getPayment,
  getPayments,
  updatePartialPayment,
  deletePayment
};
