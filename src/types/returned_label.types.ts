export type ReturnedLabel = {
  id: number
  ticket_code: string;
  opened: boolean;
  quantity: number;
};

export type ReturnedLabelRegister = Omit<ReturnedLabel, "id"> 
