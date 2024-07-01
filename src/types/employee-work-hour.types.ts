import { Employee } from "@pontalti/types/employee.types";

export type EmployeeWorkHour = {
  id: number;
  employee: Employee;
  clock_in: Date;
  clock_out?: Date;
  created_at: Date;
  updated_at: Date;
};

export type EmployeeWorkHourRegister = Omit<EmployeeWorkHour, "id" | "created_at" | "updated_at" | "employee"> & { employee_id: number };

export type EmployeeWorkHourResponse = {
  day: string,
  clock_in: string,
  clock_out?: string,
  worked_hours?: string
}

export type EmployeeWorkHourFilters = Partial<{
  employee_id: number;
  startDate: Date;
  endDate: Date;
}>

export type WorkHour = Array<{
  clock_in: Date,
  clock_out?: Date
}>