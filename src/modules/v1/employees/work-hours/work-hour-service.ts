import { CommonRequest, DefaultResponse, PaginationResponse } from "@pontalti/types/common.types";
import repository from "@pontalti/repository/employee-work-hour";
import employeeRepository from "@pontalti/repository/employee"
import { EmployeeWorkHour, EmployeeWorkHourFilters, EmployeeWorkHourRegister, EmployeeWorkHourResponse, WorkHour } from "@pontalti/types/employee-work-hour.types";
import { User } from "@pontalti/types/user.types";
import { startAndEndOfDate } from "@pontalti/utils/helper";

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

    if (!lastClockOut) {
      return {
        primeiroPonto: firstClockIn,
        ultimoPonto: "Sem ponto de saída",
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

const createEmployee = async (user: Omit<User, "password">, datetime?: Date) => {
  try{
    const time = datetime ? datetime : new Date()
    const employee = await employeeRepository.getEmployeeByEmail(user.email);
    if (!employee) throw new Error();
    const workHours = await repository.getTodayEmployeeWorkHour(employee.id);
    if(workHours.length >= 1 ){
      const lastWorkHour = workHours[0]
      const response = lastWorkHour.clock_out ? 
        await repository.createEmployeeWorkHour({ employee_id: employee.id, clock_in: time })
        : updatePartialEmployeeWorkHour(lastWorkHour.id, { clock_out: time});
      return response
    }
    return await repository.createEmployeeWorkHour({ employee_id: employee.id, clock_in: time });
  } catch(e){
    throw e
  }
};

const getWorkHours = async (filters: EmployeeWorkHourFilters) => {
  return calculateHoursWorked(await repository.getEmployeesWorkHours(filters));
};

const getEmployeeWorkHourById = async (id: number) => {
  return await repository.getEmployeeWorkHour(id);
};

const getEmployeeWorkHourByDay = async (day: Date, employee_id: number) => {
  return await repository.getEmployeesWorkHours({employee_id, startDate: day, endDate: day})
}

const updatePartialEmployeeWorkHour = async (id: number, data: unknown) => {
  return await repository.updatePartialEmployeeWorkHour(id, data);
};

const deleteEmployeeWorkHour = async (id: number) => {
  return await repository.deleteEmployeeWorkHour(id);
};

export default {
  createEmployee,
  getWorkHours,
  getEmployeeWorkHourById,
  getEmployeeWorkHourByDay,
  updatePartialEmployeeWorkHour,
  deleteEmployeeWorkHour
};

