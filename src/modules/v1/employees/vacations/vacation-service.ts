import {  Vacation, VacationRegister } from "@pontalti/types/vacation.types";
import { CommonRequest, DefaultResponse, PaginationResponse } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/vacation";

const createVacation = async (data: VacationRegister) => {
  try{
    return await repository.createVacation(data)
  } catch(e){
    throw e
  }
};

const getAllVacations = async (filters: CommonRequest<Vacation>) => {
  return await repository.getVacations(filters)
};

const getVacationById = async (id: number) => {
  return await repository.getVacation(id)
};

const updatePartialVacation = async (id: number, data: unknown) => {
  return await repository.updatePartialVacation(id, data)
};

const deleteVacation = async (id: number) => {
  return await repository.deleteVacation(id)
};

export default {
  createVacation,
  getVacationById,
  getAllVacations,
  updatePartialVacation,
  deleteVacation
};
