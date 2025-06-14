import deliveryService from "../../../modules/v1/delivery/delivery-service";
import vacationService from "../../../modules/v1/employees/vacations/vacation-service";
import { CalendarEvent, CalendarResponse, CalendarEventType } from "@pontalti/types/calendar.types";

const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
};

const getCalendar = async (month: number, year: number, specificDate?: Date): Promise<CalendarResponse> => {
  // Criar datas de início e fim do mês
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  // Get vacations for the month
  const vacations = await vacationService.getVacationsByDateRange(startDate, endDate);
  
  // Processar férias
  const vacationEntries: CalendarEvent[] = [];
  const vacationDates = new Set<string>();

  vacations.forEach(vacation => {
    const start = new Date(vacation.start_date);
    const end = new Date(vacation.end_date);

    // Adiciona start_date se estiver no mês solicitado
    if (start.getMonth() === month - 1 && start.getFullYear() === year) {
      vacationDates.add(vacation.start_date.toISOString());
      
      // Se tiver data específica, só adiciona se for o mesmo dia
      if (!specificDate || isSameDay(start, specificDate)) {
        vacationEntries.push({
          type: 'vacation' as CalendarEventType,
          title: `Início de Férias - ${vacation.employee.name}`,
          date: vacation.start_date,
          details: vacation
        });
      }
    }

    // Adiciona end_date se estiver no mês solicitado
    if (end.getMonth() === month - 1 && end.getFullYear() === year) {
      vacationDates.add(vacation.end_date.toISOString());
      
      // Se tiver data específica, só adiciona se for o mesmo dia
      if (!specificDate || isSameDay(end, specificDate)) {
        vacationEntries.push({
          type: 'vacation' as CalendarEventType,
          title: `Retorno das Férias - ${vacation.employee.name}`,
          date: vacation.end_date,
          details: vacation
        });
      }
    }
  });

  // Get deliveries for the month
  const deliveries = await deliveryService.getDeliveriesByDateRange(startDate, endDate);
  
  // Processar entregas
  const deliveryEntries: CalendarEvent[] = [];
  const deliveryDates = new Set<string>();

  deliveries.forEach(delivery => {
    const deliveryDate = new Date(delivery.delivery_date);
    
    if (deliveryDate.getMonth() === month - 1 && deliveryDate.getFullYear() === year) {
      deliveryDates.add(delivery.delivery_date.toISOString());
      
      // Se tiver data específica, só adiciona se for o mesmo dia
      if (!specificDate || isSameDay(deliveryDate, specificDate)) {
        deliveryEntries.push({
          type: 'delivery' as CalendarEventType,
          title: `Entrega - ${delivery.order.customer.name}`,
          date: delivery.delivery_date,
          details: delivery
        });
      }
    }
  });

  return {
    vacations: {
      datesWithEvents: Array.from(vacationDates),
      entries: vacationEntries
    },
    deliveries: {
      datesWithEvents: Array.from(deliveryDates),
      entries: deliveryEntries
    }
  };
};

export default {
  getCalendar
}; 