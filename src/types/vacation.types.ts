import { Employee } from "./employee.types"

export type Vacation = {
  id: number,
  employee: Employee,
  last_vacation: Date,
  created_at: Date,
  updated_at: Date
}

export type VacationRegister = Omit<Vacation, "id" | "created_at" | "updated_at" | "employee"> & { employee_id: number };
