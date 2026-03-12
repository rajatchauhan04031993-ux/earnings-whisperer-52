import { mockCalls, historicalSentiment, questionGapAnalysis } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export const CompetitiveView = () => {
  const crompton = mockCalls.find((c) => c.ticker === "CROMPTON")!;
  const havells = mockCalls.find((c) => c.ticker === "HAVELLS")!;

  return (
    <div className="space-y-6">
      {/* Comparative KPIs */}
      <div className="bg-card rounded-lg p-6 border border-border overflow-x-auto">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Head-to-Head: Q3 FY25</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground font-normal">Metric</th>
              <th className="text-right py-2 text-primary font-mono">CROMPTON</th>
              <th className="text-right py-2 text-accent font-mono">HAVELLS</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(crompton.summary.kpis).map((key) => (
              <tr key={key} className="border-b border-border/50">
                <td className="py-2.5 text-foreground/80">{key}</td>
                <td className="py-2.5 text-right font-mono text-foreground">{crompton.summary.kpis[key]}</td>
                <td className="py-2.5 text-right font-mono text-foreground">{havells.summary.kpis[key] ?? "—"}</td>
              </tr>
            ))}
            <tr className="border-b border-border/50">
              <td className="py-2.5 text-foreground/80">Overall Sentiment</td>
              <td className="py-2.5 text-right font-mono text-positive">{(crompton.overallSentiment * 100).toFixed(0)}%</td>
              <td className="py-2.5 text-right font-mono text-neutral-sentiment">{(havells.overallSentiment * 100).toFixed(0)}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sentiment Trend */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Sentiment Trend (7 Quarters)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={historicalSentiment}>
            <XAxis dataKey="quarter" tick={{ fill: "hsl(215,12%,50%)", fontSize: 11 }} />
            <YAxis domain={[0, 1]} tick={{ fill: "hsl(215,12%,50%)", fontSize: 11 }} tickFormatter={(v) => (v * 100).toFixed(0) + "%"} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(220,18%,12%)", border: "1px solid hsl(220,14%,18%)", borderRadius: 8, color: "hsl(210,20%,92%)" }}
              formatter={(v: number) => [(v * 100).toFixed(0) + "%", ""]}
            />
            <Legend />
            <Line type="monotone" dataKey="TCS" stroke="hsl(142,60%,45%)" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="INFY" stroke="hsl(38,92%,55%)" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Question Gap Heatmap */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Analyst Question Coverage — Gap Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted-foreground font-normal">Topic</th>
                <th className="text-center py-2 text-muted-foreground font-normal">TCS</th>
                <th className="text-center py-2 text-muted-foreground font-normal">INFY</th>
                <th className="text-center py-2 text-muted-foreground font-normal">Peer Avg</th>
                <th className="text-center py-2 text-muted-foreground font-normal">Priority</th>
              </tr>
            </thead>
            <tbody>
              {questionGapAnalysis.map((q, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2.5 text-foreground/80">{q.topic}</td>
                  <td className="py-2.5 text-center">
                    {q.TCS ? <CheckCircle2 className="w-4 h-4 text-positive inline" /> : <XCircle className="w-4 h-4 text-negative inline" />}
                  </td>
                  <td className="py-2.5 text-center">
                    {q.INFY ? <CheckCircle2 className="w-4 h-4 text-positive inline" /> : <XCircle className="w-4 h-4 text-negative inline" />}
                  </td>
                  <td className="py-2.5 text-center font-mono text-foreground/70">{(q.peerAvg * 100).toFixed(0)}%</td>
                  <td className="py-2.5 text-center">
                    <span className={cn(
                      "text-xs font-mono px-2 py-0.5 rounded-full",
                      q.priority === "high" ? "bg-destructive/20 text-negative" :
                      q.priority === "medium" ? "bg-accent/20 text-neutral-sentiment" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {q.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actionable Prep */}
      <div className="gradient-glow rounded-lg p-5 border border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-accent" />
          <span className="text-xs font-mono text-primary uppercase tracking-wider">Prep Recommendation</span>
        </div>
        <p className="text-sm text-foreground/80 mb-3">
          Peers answered <strong className="text-accent">65% of your top analyst questions</strong> that you left unanswered. Prepare talking points for these high-priority gaps before your next call:
        </p>
        <ul className="space-y-2">
          {questionGapAnalysis.filter((q) => q.priority === "high" && (!q.TCS || !q.INFY)).map((q, i) => (
            <li key={i} className="flex gap-2 items-center text-sm text-foreground/80">
              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <strong>{q.topic}</strong> — Peer coverage: {(q.peerAvg * 100).toFixed(0)}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
