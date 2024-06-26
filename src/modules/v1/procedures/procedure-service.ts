import { Procedure } from "@pontalti/types/procedure.types";
import { Status, CommonRequest, DefaultResponse } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/procedure";

const handleProcedure = (e: Procedure | Procedure[]) => {
  if (Array.isArray(e)) {
    const response = e.map((data: Procedure) => {
      const { status, ...procedure } = data;
      return { ...procedure, status: Status[status] };
    });
    return { data: response };
  }

  const { status, ...procedure } = e;
  return  { ...procedure, status: Status[status] };
};

const createProcedure = async (data: Procedure) => {
  return handleProcedure((await repository.createProcedure(data)) as Procedure);
};

const getAllProcedures = async (filters: CommonRequest) => {
  return handleProcedure((await repository.getProcedures(filters)) as Procedure[]);
};

const getProcedureById = async (id: number) => {
  return handleProcedure((await repository.getProcedure(id)) as Procedure);
};

const updatePartialProcedure = async (id: number, data: unknown) => {
  return handleProcedure((await repository.updatePartialProcedure(id, data)) as Procedure);
};

const deleteProcedure = async (id: number) => {
  return handleProcedure((await repository.deleteProcedure(id)) as Procedure);
};

export default {
  createProcedure,
  getProcedureById,
  getAllProcedures,
  updatePartialProcedure,
  deleteProcedure
};
