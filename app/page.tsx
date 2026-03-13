import { ChartAreaInteractive } from "@/components/AreaChart";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div className="w-screen h-screen p-6">
      <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
        <Input placeholder="Enter text" />
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
