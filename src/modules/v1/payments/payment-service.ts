import { Payment, PaymentRegister, PaymentRequest } from "@pontalti/types/payment.types";
import { Status, CommonRequest, DefaultResponse } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/payment";
import orderRepository from "@pontalti/repository/order"


const createPayment = async (data: PaymentRequest) => {
  const remaining = await calculateRemaining(data.order_id, data.amount_paid)
  const paymentRegister = {
    ...data,
    remaining
  } as PaymentRegister
  return ((await repository.createPayment(paymentRegister)) as Payment);
};

const getAllPayments = async (filters: CommonRequest) => {
  return (await repository.getPayments(filters) as Payment[]);
};

const getPaymentById = async (id: number) => {
  return (await repository.getPayment(id) as Payment);
};

const updatePartialPayment = async (id: number, data: any) => {
  if(data.amount_paid) {
    const payment = await getPaymentById(id)
    data.remaining = await calculateRemaining(payment.order.id, data.amount_paid)
  }
  return (await repository.updatePartialPayment(id, data) as Payment);
};

const deletePayment = async (id: number) => {
  return (await repository.deletePayment(id) as Payment);
};

const calculateRemaining = async (order_id: number, amount_paid: number) => {
  const order = await orderRepository.getOrder(order_id);

  let totalPayments = amount_paid
  const paymentsForSameOrder = await repository.getPaymentByOrderId(order.id)
  paymentsForSameOrder.forEach(payment => {
    totalPayments += payment.amount_paid
  })
 
  return order.final_price - totalPayments;
}

export default {
  createPayment,
  getPaymentById,
  getAllPayments,
  updatePartialPayment,
  deletePayment
};
