import { Employee } from "./employee.types"

export type Vacation = {
  id: number,
  employee: Employee,
  start_date: Date,
  end_date: Date,
  sold_days: number,
  created_at: Date,
  updated_at: Date
}

export type VacationRegister = Omit<Vacation, "id" | "created_at" | "updated_at" | "employee"> & { employee_id: number };
