import { Employee } from "./employee.types"
import { DayOfWeek } from "./common.types"

export type Schedule = {
  id: number,
  employee_id: Number,
  day_of_week: DayOfWeek,
  start_time: string,
  end_time: string,
  created_at: Date,
  updated_at: Date
}

export type ScheduleRegister = Omit<Schedule, "id" | "created_at" | "updated_at" | "employee"> & { employee_id: number };
