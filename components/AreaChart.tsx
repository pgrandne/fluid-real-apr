"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2026-03-01", insta_APY: 222, real_APY: 150 },
  { date: "2026-03-02", insta_APY: 97, real_APY: 180 },
  { date: "2026-03-03", insta_APY: 167, real_APY: 120 },
  { date: "2026-03-04", insta_APY: 373, real_APY: 290 },
  { date: "2026-03-05", insta_APY: 301, real_APY: 340 },
  { date: "2026-03-06", insta_APY: 409, real_APY: 320 },
  { date: "2026-03-07", insta_APY: 59, real_APY: 110 },
  { date: "2026-03-08", insta_APY: 261, real_APY: 190 },
  { date: "2026-03-09", insta_APY: 327, real_APY: 350 },
  { date: "2026-03-10", insta_APY: 292, real_APY: 210 },
  { date: "2026-03-11", insta_APY: 342, real_APY: 380 },
  { date: "2026-03-12", insta_APY: 137, real_APY: 220 },
  { date: "2026-03-13", insta_APY: 120, real_APY: 170 },
];

const chartConfig = {
  insta_APY: {
    label: "Instadapp displayed API",
    color: "var(--chart-1)",
  },
  real_APY: {
    label: "real APY calculated",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Daily APR (Annual Percentage Rate)</CardTitle>
          <CardDescription>
            Comparing Instadapp displayed APR and real APR calculated on
            distributed interest
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillInsta" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-insta_APY)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-insta_APY)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillReal" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-real_APY)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-real_APY)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="real_APY"
              type="natural"
              fill="url(#fillReal)"
              stroke="var(--color-real_APY)"
              stackId="a"
            />
            <Area
              dataKey="insta_APY"
              type="natural"
              fill="url(#fillInsta)"
              stroke="var(--color-insta_APY)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
