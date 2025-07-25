import { ProductionControl, ProductionControlRegister, ProductionControlRequest } from "@pontalti/types/production-control.types";
import prisma, { dbErrorHandle } from "@pontalti/lib/prisma";
import { PaginationResponse } from "@pontalti/types/common.types";

const createProductionControl = async (data: ProductionControlRegister): Promise<ProductionControl> => {
  try {
    return await prisma.productionControl.create({
      data,
      include: { 
        order: {
          include: {
            customer: {
              include: {
                address: true
              }
            }
          }
        }
      }
    });
  } catch(e) {
    dbErrorHandle(e);
  }
};

const getProductionControl = async (id: number): Promise<ProductionControl> => {
  try {
    return await prisma.productionControl.findUnique({ 
      where: { id }, 
      include: { 
        order: {
          include: {
            customer: {
              include: {
                address: true
              }
            }
          }
        }
      } 
    });
  } catch(e) {
    dbErrorHandle(e);
  }
};

const getProductionControls = async (filters: ProductionControlRequest): Promise<PaginationResponse<ProductionControl>> => {
  try {
    const { page = 1, perPage = 10, ...where } = filters;
    const skip = page !== 1 ? (page - 1) * perPage : undefined;
    const result = await prisma.productionControl.findMany({
      where,
      include: { 
        order: {
          include: {
            customer: {
              include: {
                address: true
              }
            }
          }
        }
      },
      take: perPage,
      skip
    });
    const totalRecords = await prisma.productionControl.count({ where });
    return {
      data: result,
      totalRecord: totalRecords,
      page,
      perPage,
      nextPage: result.length === perPage ? `/api/production-control?page=${page + 1}` : undefined
    };
  } catch(e) {
    dbErrorHandle(e);
  }
};

const updatePartialProductionControl = async (id: number, data: Partial<ProductionControl>): Promise<ProductionControl> => {
  try {
    // Só permitir atualização dos campos válidos
    const { status, material_disponibility } = data;
    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (material_disponibility !== undefined) updateData.material_disponibility = material_disponibility;
    return await prisma.productionControl.update({
      where: { id },
      data: updateData,
      include: { 
        order: {
          include: {
            customer: {
              include: {
                address: true
              }
            }
          }
        }
      }
    });
  } catch(e) {
    dbErrorHandle(e);
  }
};

const deleteProductionControl = async (id: number): Promise<ProductionControl> => {
  try {
    return await prisma.productionControl.delete({ 
      where: { id }, 
      include: { 
        order: {
          include: {
            customer: {
              include: {
                address: true
              }
            }
          }
        }
      } 
    });
  } catch(e) {
    dbErrorHandle(e);
  }
};

export default {
  createProductionControl,
  getProductionControl,
  getProductionControls,
  updatePartialProductionControl,
  deleteProductionControl
}; 