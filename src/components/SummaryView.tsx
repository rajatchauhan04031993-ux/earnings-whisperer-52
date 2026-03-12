import type { EarningsCall } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, ArrowUpRight, Target } from "lucide-react";

interface SummaryViewProps {
  call: EarningsCall;
}

export const SummaryView = ({ call }: SummaryViewProps) => {
  return (
    <div className="space-y-6">
      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(call.summary.kpis).map(([key, value]) => (
          <div key={key} className="bg-card rounded-lg p-4 border border-border text-center">
            <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">{key}</span>
            <span className="text-xl font-mono font-bold text-foreground">{value}</span>
          </div>
        ))}
      </div>

      {/* Executive Summary */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <ArrowUpRight className="w-4 h-4 text-primary" />
          Executive Highlights
        </h3>
        <ul className="space-y-2">
          {call.summary.highlights.map((h, i) => (
            <li key={i} className="flex gap-3 items-start text-sm text-foreground/85">
              <span className="text-primary font-mono text-xs mt-0.5">0{i + 1}</span>
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* Wins & Gaps side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-positive" />
            What Went Right
          </h3>
          <ul className="space-y-3">
            {call.summary.wins.map((w, i) => (
              <li key={i} className="flex gap-3 items-start text-sm text-foreground/80">
                <div className="w-1.5 h-1.5 rounded-full bg-positive mt-1.5 shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-negative" />
            Unanswered / Gaps
          </h3>
          <ul className="space-y-3">
            {call.summary.gaps.map((g, i) => (
              <li key={i} className="flex gap-3 items-start text-sm text-foreground/80">
                <div className="w-1.5 h-1.5 rounded-full bg-negative mt-1.5 shrink-0" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Guidance */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-accent" />
          Forward Guidance
        </h3>
        <ul className="space-y-3">
          {call.summary.guidance.map((g, i) => (
            <li key={i} className="flex gap-3 items-start text-sm text-foreground/80">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-sentiment mt-1.5 shrink-0" />
              {g}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
