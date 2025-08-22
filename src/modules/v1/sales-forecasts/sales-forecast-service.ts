import repository, { getDeliveredCustomerProductHistory, getDeliveredProductHistory } from "@pontalti/repository/sales-forecast";
import { SalesForecastRegister, SalesForecastRequest, UpdatePartialSalesForecast } from "@pontalti/types/sales-forecast.types";
import { CustomRequest } from "@pontalti/types/common.types";
import prisma from "@pontalti/lib/prisma";

// Simple month start helper (avoid new deps)
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

const createSalesForecast = async (data: SalesForecastRegister, req?: CustomRequest) => {
  const createdBy = req?.user?.name || "system";
  return repository.createSalesForecast({ ...data, created_by: createdBy });
};

const getSalesForecast = async (id: number) => {
  return repository.getSalesForecast(id);
};

const getSalesForecasts = async (filters: SalesForecastRequest) => {
  return repository.getSalesForecasts(filters);
};

const updatePartialSalesForecast = async (id: number, data: UpdatePartialSalesForecast, req?: CustomRequest) => {
  const updatedBy = req?.user?.name || "system";
  return repository.updatePartialSalesForecast(id, { ...data, updated_by: updatedBy });
};

const deleteSalesForecast = async (id: number) => {
  return repository.deleteSalesForecast(id);
};

// -------------------- Forecast Engine (V2) --------------------

type PredictInput = {
  customer_id: number;
  product_id: number;
  k_orders?: number; // default 5
  horizon_months?: number; // how far back to look (12-24)
  now?: Date;
  gamma?: number; // 0.3..0.7
  k_shrink?: number; // lambda k for per-month shrink
  K0?: number; // weight for cp vs product profile
  U_hot_prod?: number; // 0.0..0.4
  heat_calendar?: Record<number, number>; // month-> [0, 0.5, 1]
  persist?: boolean;
};

type PredictOutput = {
  F_base: number; // days
  Q_base: number; // units
  S_moy: number;  // seasonal multiplier month of year
  H_m: number;    // heat uplift multiplier
  Q_hat: number;  // predicted quantity
  F_hat: number;  // predicted frequency (days)
  next_estimated_date: Date;
  reason: string;
};

const defaultHeatCalendar: Record<number, number> = {
  1: 1.0,  // Jan
  2: 1.0,  // Feb
  3: 1.0,  // Mar
  4: 0.5,  // Apr
  5: 0.5,  // May
  6: 0.0,  // Jun
  7: 0.0,  // Jul
  8: 0.0,  // Aug
  9: 0.0,  // Sep
 10: 0.5,  // Oct
 11: 0.5,  // Nov
 12: 1.0,  // Dec
};

const winsorize = (values: number[], lowerP = 0.05, upperP = 0.95): number[] => {
  if (values.length === 0) return values;
  const sorted = [...values].sort((a, b) => a - b);
  const low = sorted[Math.floor(lowerP * (sorted.length - 1))];
  const high = sorted[Math.ceil(upperP * (sorted.length - 1))];
  return values.map(v => Math.min(Math.max(v, low), high));
};

const median = (arr: number[]): number => {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
};

const groupByMonth = (rows: Array<{ date: Date; quantity: number }>): Record<number, number[]> => {
  return rows.reduce((acc, r) => {
    const m = (r.date.getMonth() + 1);
    acc[m] = acc[m] || [];
    acc[m].push(r.quantity);
    return acc;
  }, {} as Record<number, number[]>);
};

const moyProfile = (rows: Array<{ date: Date; quantity: number }>, kShrink = 3): { S: Record<number, number>; counts: Record<number, number> } => {
  const byMonth = groupByMonth(rows);
  const all = rows.map(r => r.quantity);
  const qAll = all.length ? median(all) : 0.00001;
  const S: Record<number, number> = {};
  const counts: Record<number, number> = {};
  for (let m = 1; m <= 12; m++) {
    const arr = byMonth[m] || [];
    counts[m] = arr.length;
    const qMonth = arr.length ? median(arr) : qAll;
    const raw = qMonth / qAll;
    const n = arr.length;
    const lambda = n / (n + kShrink);
    S[m] = lambda * raw + (1 - lambda) * 1.0;
  }
  return { S, counts };
};

const combineProfiles = (cp: { S: Record<number, number>; counts: Record<number, number> }, prod: { S: Record<number, number> }, Ncp: number, K0 = 12): Record<number, number> => {
  const w = Ncp / (Ncp + K0);
  const out: Record<number, number> = {};
  for (let m = 1; m <= 12; m++) {
    const Sp = prod.S[m] ?? 1.0;
    const Scp = cp.S[m] ?? 1.0;
    out[m] = w * Scp + (1 - w) * Sp;
  }
  return out;
};

const predict = async (input: PredictInput): Promise<PredictOutput | null> => {
  const {
    customer_id,
    product_id,
    k_orders = 5,
    horizon_months = 18,
    now = new Date(),
    gamma = 0.5,
    k_shrink = 3,
    K0 = 12,
    U_hot_prod = 0.25,
    heat_calendar = defaultHeatCalendar,
    persist,
  } = input;

  const since = startOfMonth(new Date(now));
  since.setMonth(since.getMonth() - horizon_months);

  const cpRows = await getDeliveredCustomerProductHistory(customer_id, product_id, since);
  const prodRows = await getDeliveredProductHistory(product_id, since);

  if (!cpRows?.length || cpRows.length < 2) return null; // exige N>=2

  // Base F and Q
  const datesDesc = cpRows.map(r => r.date).sort((a, b) => b.getTime() - a.getTime());
  const lastDate = datesDesc[0];
  const lastK = cpRows
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, k_orders);
  const ipi = lastK
    .map(r => r.date)
    .sort((a, b) => b.getTime() - a.getTime())
    .map((d, i, arr) => (i < arr.length - 1 ? Math.max(1, Math.round((arr[i].getTime() - arr[i + 1].getTime()) / 86400000)) : null))
    .filter((v): v is number => v !== null);
  const ipiW = winsorize(ipi);
  const F_base = Math.max(1, Math.round(median(ipiW)));
  const qty = lastK.map(r => r.quantity);
  const qtyW = winsorize(qty);
  const Q_base = Math.max(1, Math.round(median(qtyW)));

  // Seasonality
  const cpProf = moyProfile(cpRows, k_shrink);
  const prodProf = prodRows?.length ? moyProfile(prodRows, k_shrink) : { S: Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i + 1, 1.0])), counts: {} as Record<number, number> };
  const S_moy_profile = combineProfiles(cpProf, prodProf, cpRows.length, K0);
  const mNext = now.getMonth() + 1;
  const S_moy = S_moy_profile[mNext] ?? 1.0;

  // Heat uplift
  const heatWeight = heat_calendar[mNext] ?? 0;
  const H_m = 1 + U_hot_prod * heatWeight;

  // Quantidade prevista e ajuste de frequência
  const Q_hat = Math.max(1, Math.round(Q_base * S_moy * H_m));
  const phi = Math.pow(S_moy, -gamma);
  const F_hat = Math.max(1, Math.round(F_base * phi));
  const next_estimated_date = new Date(lastDate.getTime() + F_hat * 86400000);

  const reason = `base: F=${F_base}d, Q=${Q_base}; S_moy(m${mNext})=${S_moy.toFixed(2)}; hot=${H_m.toFixed(2)}; γ=${gamma}; Q_hat=${Q_hat}; F_hat=${F_hat}; N=${cpRows.length}`;

  const result: PredictOutput = { F_base, Q_base, S_moy, H_m, Q_hat, F_hat, next_estimated_date, reason };

  if (persist) {
    // Weekly dedup logic: if exists a forecast in the same ISO week, skip creating
    const from = new Date(now);
    const day = from.getDay();
    const diffToMonday = (day === 0 ? -6 : 1) - day; // Monday as start
    from.setDate(from.getDate() + diffToMonday);
    from.setHours(0,0,0,0);
    const to = new Date(from);
    to.setDate(from.getDate() + 7);

    const exists = await prisma.salesForecasts.findFirst({
      where: {
        customer_id,
        product_id,
        created_at: { gte: from, lt: to },
      },
      select: { id: true },
    });

    if (!exists) {
      await prisma.salesForecasts.create({
        data: {
          customer: { connect: { id: customer_id } },
          product: { connect: { id: product_id } },
          status: 1,
          reason,
          next_estimated_date,
          frequency_days: F_hat,
          quantity: Q_hat,
          created_by: "system",
          updated_by: "system",
        }
      });
    }
  }

  return result;
};

export default {
  createSalesForecast,
  getSalesForecast,
  getSalesForecasts,
  updatePartialSalesForecast,
  deleteSalesForecast,
  predict,
};


