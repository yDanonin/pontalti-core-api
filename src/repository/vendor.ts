import { Vendor, VendorRegister } from "@pontalti/types/vendor.types";
import { CommonRequest } from "@pontalti/types/common.types";
import prisma from "@pontalti/lib/prisma";

const createVendor = async (data: VendorRegister) => {
  return await prisma.vendors.create({
    data: {
      ...data,
      created_at: new Date(),
      updated_at: new Date()
    } 
   });
};

const getVendor = async (id: number) => {
  return await prisma.vendors.findUnique({ where: { id } });
};

const getVendors = async (filters: CommonRequest<Vendor>) => {
  const { page, perPage } = filters;
  const skip = page !== 1 && page != undefined ? (page - 1) * perPage : undefined;
  return await prisma.vendors.findMany({
    take: perPage,
    skip: skip
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatePartialVendor = async (id: number, data: any) => {
  const existingVendor = await prisma.vendors.findUnique({
    where: { id }
  });

  if (!existingVendor) {
    throw new Error("Vendor not found");
  }

  const updatedVendor = await prisma.vendors.update({
    where: { id },
    data: {
      ...existingVendor,
      ...data,
      updated_at: new Date()
    }
  });

  return updatedVendor;
};

const deleteVendor = async (id: number) => {
  return await prisma.vendors.delete({ where: { id } });
};

export default {
  createVendor,
  getVendor,
  getVendors,
  updatePartialVendor,
  deleteVendor
};
