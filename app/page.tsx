"use client";

import { AverageTable } from "@/components/AverageTable";
import { ChartAreaInteractive } from "@/components/ChartAreaInteractive";
import {
  ExportDistributedInterest,
  ExportFluidDailyAPR,
} from "@/components/ExportFluid";
import { Header } from "@/components/Header";
import { SearchInput } from "@/components/SearchInput";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { Transaction } from "@/types/interface";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [profitsAction, setProfitsAction] = useState<Transaction[]>([]);
  const [userDeposit, setUserDeposit] = useState(0);
  const [ethValue, setEthValue] = useState(0);
  const [options, setOptions] = useState({ hidden: false, usd: false });

  const GithubIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );

  return (
    <div className="flex min-h-screen w-full flex-col p-6">
      <Header />
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-14">
        <SearchInput
          setProfitsAction={setProfitsAction}
          setUserDeposit={setUserDeposit}
          setEthValue={setEthValue}
        />
        <ChartAreaInteractive
          profitsAction={profitsAction}
          userDeposit={userDeposit}
        />
        <div className="flex w-full items-center justify-evenly">
          <div className="w-full max-w-130">
            <AverageTable
              profitsAction={profitsAction}
              userDeposit={userDeposit}
              ethValue={ethValue}
              options={options}
            />
          </div>
          <div className="w-full max-w-65">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2 ">
                <Toggle
                  aria-label="Toggle bookmark"
                  size="sm"
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={() =>
                    setOptions((prev) => ({ ...prev, hidden: !prev.hidden }))
                  }
                >
                  {options.hidden ? <EyeOffIcon /> : <EyeIcon />}
                  Interest
                </Toggle>
                {!options.hidden && (
                  <div className="flex items-center space-x-2">
                    <Label className="text-xs">ETH</Label>
                    <Switch
                      id="airplane-mode"
                      className="cursor-pointer"
                      checked={options.usd}
                      onCheckedChange={() =>
                        setOptions((prev) => ({ ...prev, usd: !prev.usd }))
                      }
                    />
                    <Label className="text-xs">USDC</Label>
                  </div>
                )}
              </div>
              <ExportFluidDailyAPR />
              {profitsAction.length > 0 && (
                <ExportDistributedInterest profitsAction={profitsAction} />
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <a
          href="https://github.com/pgrandne/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <GithubIcon />
          GitHub
        </a>
        <span>·</span>

        <a
          href="https://perrin.website/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          My site
        </a>
      </footer>
    </div>
  );
}
