import { Vacation } from "./vacation.types";
import { Delivery } from "./delivery.types";

export type CalendarEventType = 'vacation' | 'delivery';

export type CalendarEvent = {
  type: CalendarEventType;
  title: string;
  date: Date;
  details: any;
};

export type CalendarToday = {
  start: CalendarEvent[];
  end: CalendarEvent[];
};

export type CalendarEventGroup = {
  datesWithEvents: string[];
  entries: CalendarEvent[];
};

export type CalendarResponse = {
  vacations: CalendarEventGroup;
  deliveries: CalendarEventGroup;
}; 