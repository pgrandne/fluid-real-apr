import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface FluidData {
  date: string;
  net_apy: number;
  gross_apy: number;
}

export function groupByDay(data: FluidData[]) {
  const groups: Record<string, FluidData[]> = {};

  data.forEach((item) => {
    const day = item.date.split("T")[0];
    if (!groups[day]) groups[day] = [];
    groups[day].push(item);
  });

  return Object.entries(groups).map(([date, items]) => ({
    date,
    fluid_APR: items.reduce((sum, i) => sum + i.net_apy, 0) / items.length,
    avg_gross_apy:
      items.reduce((sum, i) => sum + i.gross_apy, 0) / items.length,
    real_APR: 0,
  }));
}
