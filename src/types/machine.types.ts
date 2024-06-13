import { Status } from "./common.types";

export type Machine = {
  id: number;
  model: string;
  machine_number: number;
  status: Status;
  location: string;
  location_status: Status;
  created_at: Date;
  updated_at: Date;
};

export type MachineRegister = Omit<Machine, "id" | "created_at" | "updated_at">;
