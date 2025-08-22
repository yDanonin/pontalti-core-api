import repository from "@pontalti/repository/label-print";
import { CustomRequest } from "@pontalti/types/common.types";
import { LabelPrintRegister, LabelPrintRequest, UpdatePartialLabelPrint } from "@pontalti/types/label-print.types";

const createLabelPrint = async (data: LabelPrintRegister, req?: CustomRequest) => {
  const createdBy = req?.user?.name || "system";
  return repository.createLabelPrint({ ...data, created_by: createdBy });
};

const getLabelPrint = async (id: number) => {
  return repository.getLabelPrint(id);
};

const getLabelPrints = async (filters: LabelPrintRequest) => {
  return repository.getLabelPrints(filters);
};

const updatePartialLabelPrint = async (id: number, data: UpdatePartialLabelPrint, req?: CustomRequest) => {
  const updatedBy = req?.user?.name || "system";
  return repository.updatePartialLabelPrint(id, { ...data, updated_by: updatedBy });
};

const deleteLabelPrint = async (id: number) => {
  return repository.deleteLabelPrint(id);
};

export default {
  createLabelPrint,
  getLabelPrint,
  getLabelPrints,
  updatePartialLabelPrint,
  deleteLabelPrint,
};


