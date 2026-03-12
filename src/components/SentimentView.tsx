import { mockCalls, type EarningsCall } from "@/data/mockData";
import { SentimentGauge } from "./SentimentGauge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/utils";

interface SentimentViewProps {
  call: EarningsCall;
}

export const SentimentView = ({ call }: SentimentViewProps) => {
  const chartData = call.sentimentBySection.map((s) => ({
    name: s.section,
    score: s.score,
    label: s.label,
  }));

  return (
    <div className="space-y-6">
      {/* Gauges Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border terminal-glow flex flex-col items-center">
          <SentimentGauge value={call.overallSentiment} label="Overall" size="lg" />
        </div>
        <div className="bg-card rounded-lg p-6 border border-border flex flex-col items-center">
          <SentimentGauge value={call.textSentiment} label="Text Sentiment" size="md" />
          <p className="text-xs text-muted-foreground mt-3 text-center">Transcript language analysis via FinBERT</p>
        </div>
        <div className="bg-card rounded-lg p-6 border border-border flex flex-col items-center">
          <SentimentGauge value={call.voiceSentiment} label="Voice Sentiment" size="md" />
          <p className="text-xs text-muted-foreground mt-3 text-center">Paralinguistic tone analysis via wav2vec</p>
        </div>
      </div>

      {/* Section Breakdown Chart */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Sentiment by Section</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" domain={[-1, 1]} tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} />
            <YAxis type="category" dataKey="name" width={120} tick={{ fill: "hsl(210, 20%, 80%)", fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(220, 18%, 12%)", border: "1px solid hsl(220, 14%, 18%)", borderRadius: 8, color: "hsl(210,20%,92%)" }}
              formatter={(value: number) => [(value * 100).toFixed(0) + "%", "Score"]}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.score > 0.3 ? "hsl(142, 60%, 45%)" : entry.score < -0.3 ? "hsl(0, 72%, 55%)" : "hsl(38, 92%, 55%)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Quotes */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Key Quotes & Signals</h3>
        <div className="space-y-3">
          {call.sentimentBySection.map((s, i) => (
            <div key={i} className="flex gap-3 items-start p-3 rounded-md bg-muted/50">
              <div className={cn(
                "w-2 h-2 rounded-full mt-1.5 shrink-0",
                s.label === "positive" ? "bg-positive" : s.label === "negative" ? "bg-negative" : "bg-neutral-sentiment"
              )} />
              <div>
                <span className="text-xs font-mono text-muted-foreground">{s.section}</span>
                <p className="text-sm text-foreground/80 italic mt-0.5">"{s.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insight Box */}
      <div className="gradient-glow rounded-lg p-5 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-positive animate-pulse-slow" />
          <span className="text-xs font-mono text-primary uppercase tracking-wider">AI Insight</span>
        </div>
        <p className="text-sm text-foreground/80">
          Voice confidence was notably <strong className="text-positive">high during product strategy discussion</strong> (+0.88),
          suggesting genuine conviction in premiumization. However, <strong className="text-negative">hedging detected in Q&A on pumps</strong> (+0.25)
          — management avoided specifics on margin recovery timeline. Recommend preparing detailed pump segment talking points for Q4 call.
        </p>
      </div>
    </div>
  );
};
