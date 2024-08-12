import { Employee } from "@pontalti/types/employee.types";

export type WorkHour = {
  id: number;
  employee: Employee;
  clock_in: Date;
  clock_out?: Date;
  created_at: Date;
  updated_at: Date;
};

export type WorkHourRegister = Omit<WorkHour, "id" | "created_at" | "updated_at" | "employee"> & { employee_id: number };

export type WorkHourResponse = {
  day: string,
  clock_in: string,
  clock_out?: string,
  worked_hours?: string
}

export type WorkHourFilters = Partial<{
  employee_id: number;
  startDate: Date;
  endDate: Date;
}>
