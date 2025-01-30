import repository from '@pontalti/repository/invoice';
import { CreateInvoice, UpdateInvoice } from '@pontalti/types/invoice.types';
import { DefaultResponse } from '@pontalti/types/common.types';

const createInvoice = async (data: CreateInvoice): Promise<DefaultResponse<any>> => {
  const invoice = await repository.createInvoice(data);
  return { data: invoice };
};

const getInvoiceById = async (id: number): Promise<DefaultResponse<any>> => {
  const invoice = await repository.getInvoiceById(id);
  return { data: invoice };
};

const getAllInvoices = async (): Promise<DefaultResponse<any[]>> => {
  const invoices = await repository.getAllInvoices();
  return { data: invoices };
};

const updateInvoice = async (id: number, data: UpdateInvoice): Promise<DefaultResponse<any>> => {
  const invoice = await repository.updateInvoice(id, data);
  return { data: invoice };
};

const deleteInvoice = async (id: number): Promise<DefaultResponse<any>> => {
  const invoice = await repository.deleteInvoice(id);
  return { data: invoice };
};

export default {
  createInvoice,
  getInvoiceById,
  getAllInvoices,
  updateInvoice,
  deleteInvoice
}; 