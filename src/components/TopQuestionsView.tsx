import type { EarningsCall } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface TopQuestionsViewProps {
  call: EarningsCall;
}

export const TopQuestionsView = ({ call }: TopQuestionsViewProps) => {
  const sorted = [...call.topQuestions].sort((a, b) => b.frequency - a.frequency);

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Top Analyst Questions — {call.ticker} {call.quarter}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground font-normal">#</th>
              <th className="text-left py-2 text-muted-foreground font-normal">Question</th>
              <th className="text-center py-2 text-muted-foreground font-normal">Freq</th>
              <th className="text-center py-2 text-muted-foreground font-normal">Answered</th>
              <th className="text-center py-2 text-muted-foreground font-normal">Tone</th>
              <th className="text-left py-2 text-muted-foreground font-normal">Analyst</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((q, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="py-3 font-mono text-muted-foreground">{i + 1}</td>
                <td className="py-3 text-foreground/85 max-w-xs">{q.question}</td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <div className="h-1.5 rounded-full bg-info" style={{ width: q.frequency * 10 }} />
                    <span className="text-xs font-mono text-muted-foreground">{q.frequency}</span>
                  </div>
                </td>
                <td className="py-3 text-center">
                  <span className={cn(
                    "text-xs font-mono px-2 py-0.5 rounded-full",
                    q.answered ? "bg-primary/15 text-positive" : "bg-destructive/15 text-negative"
                  )}>
                    {q.answered ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3 text-center">
                  <span className={cn(
                    "w-2 h-2 rounded-full inline-block",
                    q.sentiment === "positive" ? "bg-positive" : q.sentiment === "negative" ? "bg-negative" : "bg-neutral-sentiment"
                  )} />
                </td>
                <td className="py-3 text-muted-foreground text-xs">{q.analystFirm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
