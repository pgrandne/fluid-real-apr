import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import fluidData from "@/data.json";
import { averageAllDays, formatReadableDate } from "@/lib/utils";
import { ChartProps } from "@/types/interface";

export const AverageTable = ({
  profitsAction,
  userDeposit,
  ethValue,
  options,
}: ChartProps & {
  ethValue: number;
  options: { hidden: boolean; usd: boolean };
}) => {
  const displayedAvgAPR = averageAllDays(fluidData);
  const totalInterest =
    displayedAvgAPR && userDeposit > 0
      ? userDeposit *
        (displayedAvgAPR.avg_fluid_APR / 100) *
        (displayedAvgAPR.nb_Days / 365)
      : 0;

  const displayValue = (amount: number) => {
    if (options.usd) {
      return `${(amount * ethValue).toFixed(2)} $`;
    } else {
      return `${amount.toFixed(6)} eth`;
    }
  };

  const displayedInterest =
    totalInterest > 0 ? displayValue(totalInterest) : "";

  const oldestDay = displayedAvgAPR?.oldest_Day ?? null;
  const totalDistributedInterest = profitsAction.reduce((sum, tx) => {
    const txDate =
      typeof tx.created_at === "string"
        ? tx.created_at.split("T")[0]
        : new Date(tx.created_at).toISOString().split("T")[0];

    if (!txDate) return sum;
    if (oldestDay !== null && txDate < oldestDay) return sum;

    return sum + Number(tx.amount);
  }, 0);

  const distributedPercentage =
    totalDistributedInterest > 0 && displayedAvgAPR
      ? `${((((totalDistributedInterest / displayedAvgAPR.nb_Days) * 365) / userDeposit) * 100).toFixed(2)} %`
      : "";

  const distributedInterestDisplayed =
    totalDistributedInterest > 0 ? displayValue(totalDistributedInterest) : "";

  const missingIncome =
    totalInterest > 0 && totalDistributedInterest > 0
      ? displayValue(totalInterest - totalDistributedInterest)
      : "";

  return (
    <Table>
      <TableCaption>
        Aggregated APR Differences from{" "}
        {displayedAvgAPR?.oldest_Day
          ? formatReadableDate(displayedAvgAPR.oldest_Day)
          : ""}{" "}
        to today: {displayedAvgAPR?.nb_Days ?? ""} days
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Source</TableHead>
          <TableHead className="text-center">Average Percentage</TableHead>
          <TableHead className="text-center">Total interest</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow key="fluid_APR">
          <TableCell className="text-center">APR displayed by Fluid</TableCell>
          <TableCell className="text-center">
            {displayedAvgAPR?.avg_fluid_APR} %
          </TableCell>
          <TableCell className="text-center">
            {options.hidden ? "••••••" : displayedInterest}
          </TableCell>
        </TableRow>
        <TableRow key="real_APR">
          <TableCell className="font-medium">
            APR calculated on distributed interest
          </TableCell>
          <TableCell className="text-center">{distributedPercentage}</TableCell>
          <TableCell className="text-center">
            {options.hidden ? "••••••" : distributedInterestDisplayed}
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Missing Income</TableCell>
          <TableCell className="text-center">
            {options.hidden ? "••••••" : missingIncome}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
