import prisma, { dbErrorHandle } from '@pontalti/lib/prisma';
import { CreateInvoice, UpdateInvoice } from '@pontalti/types/invoice.types';

const createInvoice = async (data: CreateInvoice) => {
  try {
    return await prisma.invoice.create({
      data,
      include: { 
        order: {
          include: {
            customer: true
          }
        } 
      }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const getInvoiceById = async (id: number) => {
  try {
    return await prisma.invoice.findUnique({
      where: { id },
      include: { 
        order: {
          include: {
            customer: true
          }
        } 
      }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const getAllInvoices = async () => {
  try {
    return await prisma.invoice.findMany({
      include: { 
        order: {
          include: {
            customer: true
          }
        } 
      }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const updateInvoice = async (id: number, data: UpdateInvoice) => {
  try {
    return await prisma.invoice.update({
      where: { id },
      data,
      include: { 
        order: {
          include: {
            customer: true
          }
        } 
      }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

const deleteInvoice = async (id: number) => {
  try {
    return await prisma.invoice.delete({
      where: { id }
    });
  } catch (e) {
    dbErrorHandle(e);
  }
};

export default {
  createInvoice,
  getInvoiceById,
  getAllInvoices,
  updateInvoice,
  deleteInvoice
}; 