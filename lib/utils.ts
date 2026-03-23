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

export function formatReadableDate(isoDate: string, locale = "en-US") {
  const date = new Date(isoDate + "T00:00:00");
  const day = date.getDate();

  const suffix =
    day % 10 === 1 && day % 100 !== 11
      ? "st"
      : day % 10 === 2 && day % 100 !== 12
        ? "nd"
        : day % 10 === 3 && day % 100 !== 13
          ? "rd"
          : "th";

  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
  const year = date.getFullYear();

  return `${month} ${day}${suffix}, ${year}`;
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
  }));
}

export function averageAllDays(data: FluidData[]) {
  if (data.length === 0) return null;

  const days = data.map((i) => i.date.split("T")[0]);
  const dayCount = new Set(days).size;
  const oldestDay = days.reduce((min, d) => (d < min ? d : min), days[0]);
  const totalNet = data.reduce((sum, i) => sum + i.net_apy, 0);
  const roundedFluid = Math.round((totalNet / data.length) * 100) / 100;

  return {
    avg_fluid_APR: roundedFluid,
    nb_Days: dayCount,
    oldest_Day: oldestDay,
  };
}
