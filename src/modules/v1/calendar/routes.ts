import { Router } from "express";
import calendarService from "./calendar-service";
import { validate } from "@pontalti/utils/validator";
import { getCalendarSchema } from "./calendar-schema";

const router = Router();

router.get("/", validate(getCalendarSchema), async (req, res) => {
  const { month, year, date } = req.query;
  const specificDate = date ? new Date(date as string) : undefined;
  
  const events = await calendarService.getCalendar(
    Number(month),
    Number(year),
    specificDate
  );
  
  res.json(events);
});

export default router; 