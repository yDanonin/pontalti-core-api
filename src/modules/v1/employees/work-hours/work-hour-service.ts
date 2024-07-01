import { CommonRequest, DefaultResponse, PaginationResponse } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/employee-work-hour";
import { EmployeeWorkHour, EmployeeWorkHourFilters, EmployeeWorkHourRegister, EmployeeWorkHourResponse, WorkHour } from "@pontalti/types/employee-work-hour.types";

const calculateHoursWorked = (registros: { clock_in: Date; clock_out: Date }[]) => {
  const groupedByDate = registros.reduce((acc, curr) => {
    const dateKey = curr.clock_in.toISOString().split('T')[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(curr);
    return acc;
  }, {} as Record<string, { clock_in: Date; clock_out: Date }[]>);

  const resultado = Object.keys(groupedByDate).map(date => {
    const dayWorkHours = groupedByDate[date];
    const firstClockIn = dayWorkHours[0].clock_in;
    const lastClockOut = dayWorkHours[dayWorkHours.length - 1].clock_out;

    if (dayWorkHours.length % 2 !== 0) {
      return {
        primeiroPonto: firstClockIn,
        ultimoPonto: lastClockOut,
        totalHoras: 'Não é possível calcular',
      };
    }

    const totalHoursWorkedMs = dayWorkHours.reduce((acc, curr) => {
      return acc + (curr.clock_out.getTime() - curr.clock_in.getTime());
    }, 0);

    const totalHours = Math.floor(totalHoursWorkedMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor((totalHoursWorkedMs % (1000 * 60 * 60)) / (1000 * 60));
    const totalHoras = `${totalHours}:${totalMinutes.toString().padStart(2, '0')}`;

    return {
      primeiroPonto: firstClockIn,
      ultimoPonto: lastClockOut,
      totalHoras: totalHoras,
    };
  });

  return resultado;
};

const createEmployee = async (data: EmployeeWorkHourRegister) => {
  try{
    return await repository.createEmployeeWorkHour(data);
  } catch(e){
    throw e
  }
};

const getWorkHours = async (filters: EmployeeWorkHourFilters) => {
  return calculateHoursWorked(await repository.getEmployeesWorkHours(filters));
};

const getEmployeeById = async (id: number) => {
  return await repository.getEmployeeWorkHour(id);
};

const updatePartialEmployee = async (id: number, data: unknown) => {
  return await repository.updatePartialEmployeeWorkHour(id, data);
};

const deleteEmployee = async (id: number) => {
  return await repository.deleteEmployeeWorkHour(id);
};

export default {
  createEmployee,
  getEmployeeById,
  getWorkHours,
  updatePartialEmployee,
  deleteEmployee
};
