import cron from "node-cron";
import prisma from "@pontalti/lib/prisma";
import salesForecastService from "@pontalti/modules/v1/sales-forecasts/sales-forecast-service";

// Run every day at 03:00
export const startSalesForecastCron = () => {
  cron.schedule("0 3 * * *", async () => {
    try {
      const customers = await prisma.customers.findMany({ select: { id: true } });
      const products = await prisma.products.findMany({ select: { id: true } });

      for (const c of customers) {
        for (const p of products) {
          // predict and persist with weekly dedup inside service
          await salesForecastService.predict({
            customer_id: c.id,
            product_id: p.id,
            persist: true,
          });
        }
      }
      // eslint-disable-next-line no-console
      console.log("[cron] sales-forecast executed at 03:00");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("[cron] sales-forecast error", e);
    }
  });
};


