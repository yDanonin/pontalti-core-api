import { Payment, PaymentRegister } from "@pontalti/types/payment.types";
import { Status, CommonRequest, DefaultResponse } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/payment";


const createPayment = async (data: PaymentRegister) => {
  return ((await repository.createPayment(data)) as Payment);
};

const getAllPayments = async (filters: CommonRequest) => {
  return (await repository.getPayments(filters) as Payment[]);
};

const getPaymentById = async (id: number) => {
  return (await repository.getPayment(id) as Payment);
};

const updatePartialPayment = async (id: number, data: unknown) => {
  return (await repository.updatePartialPayment(id, data) as Payment);
};

const deletePayment = async (id: number) => {
  return (await repository.deletePayment(id) as Payment);
};

export default {
  createPayment,
  getPaymentById,
  getAllPayments,
  updatePartialPayment,
  deletePayment
};
