import prisma, { dbErrorHandle } from "@pontalti/lib/prisma";
import { PaginationResponse } from "@pontalti/types/common.types";
import { LabelPrint, LabelPrintRegister } from "@pontalti/types/label-print.types";

const defaultSelect = {
  id: true,
  created_at: true,
  created_by: true,
  updated_at: true,
  updated_by: true,
  order: {
    select: {
      id: true,
      final_price: true,
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
          store_name: true,
          email: true,
          phone: true,
          cel_number: true,
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
              address_number: true,
            }
          }
        }
      }
    }
  }
};

const createLabelPrint = async (data: LabelPrintRegister): Promise<LabelPrint> => {
  try {
    const { order_id, ...rest } = data as any;
    // @ts-ignore
    const created = await (prisma as any).labelPrints.create({
      data: {
        ...rest,
        order: { connect: { id: order_id } },
      },
      select: defaultSelect,
    });
    return created as LabelPrint;
  } catch (e) {
    dbErrorHandle(e);
  }
};

const getLabelPrint = async (id: number): Promise<LabelPrint> => {
  try {
    // @ts-ignore
    return await (prisma as any).labelPrints.findUnique({ where: { id }, select: defaultSelect }) as LabelPrint;
  } catch (e) { dbErrorHandle(e); }
};

const getLabelPrints = async (filters: Partial<LabelPrint> & { page?: number; perPage?: number }): Promise<PaginationResponse<LabelPrint>> => {
  try {
    const { page = 1, perPage = 10, ...where } = filters;
    const skip = page !== 1 ? (page - 1) * perPage : undefined;
    // @ts-ignore
    const result = await (prisma as any).labelPrints.findMany({
      where: {},
      select: defaultSelect,
      take: perPage,
      skip,
      orderBy: { id: "desc" },
    });
    // @ts-ignore
    const totalRecords = await (prisma as any).labelPrints.count({});
    return { data: result as LabelPrint[], totalRecord: totalRecords, page, perPage, nextPage: result.length === perPage ? `/api/label-prints?page=${page + 1}` : undefined };
  } catch (e) { dbErrorHandle(e); }
};

const updatePartialLabelPrint = async (id: number, data: Partial<LabelPrintRegister>): Promise<LabelPrint> => {
  try {
    const editable: (keyof LabelPrintRegister)[] = [
      "updated_by"
    ] as any;
    const updateData: any = {};
    for (const key of editable) if ((data as any)[key] !== undefined) updateData[key] = (data as any)[key];
    // @ts-ignore
    const updated = await (prisma as any).labelPrints.update({ where: { id }, data: updateData, select: defaultSelect });
    return updated as LabelPrint;
  } catch (e) { dbErrorHandle(e); }
};

const deleteLabelPrint = async (id: number): Promise<LabelPrint> => {
  try { 
    // @ts-ignore
    return await (prisma as any).labelPrints.delete({ where: { id }, select: defaultSelect }) as LabelPrint; 
  } catch (e) { dbErrorHandle(e); }
};

export default {
  createLabelPrint,
  getLabelPrint,
  getLabelPrints,
  updatePartialLabelPrint,
  deleteLabelPrint,
};


