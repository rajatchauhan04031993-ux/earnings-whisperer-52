import { useMemo } from "react";
import { financials } from "@/data/financialData";
import { cn } from "@/lib/utils";
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, BadgeCheck, Banknote,
  CheckCircle2, DollarSign, Download, Gauge, LineChart as LineIcon, Shield,
  Sparkles, Target, TrendingDown, TrendingUp, XCircle,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

interface Props { ticker: string }

const scoreColor = (s: number) =>
  s >= 75 ? "text-positive" : s >= 50 ? "text-neutral-sentiment" : "text-negative";
const scoreBg = (s: number) =>
  s >= 75 ? "bg-positive/15 border-positive/30" : s >= 50 ? "bg-neutral-sentiment/15 border-neutral-sentiment/30" : "bg-negative/15 border-negative/30";

const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(2)}K` : n.toFixed(0);
const pct = (n: number) => `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;

const ratingColor = (r: string) => {
  if (r.includes("Strong Buy") || r === "Buy") return "text-positive bg-positive/15 border-positive/40";
  if (r === "Hold") return "text-neutral-sentiment bg-neutral-sentiment/15 border-neutral-sentiment/40";
  return "text-negative bg-negative/15 border-negative/40";
};

const verdictMeta = {
  confirmed: { icon: CheckCircle2, color: "text-positive", bg: "bg-positive/10 border-positive/30", label: "Confirmed" },
  partial:   { icon: AlertTriangle, color: "text-neutral-sentiment", bg: "bg-neutral-sentiment/10 border-neutral-sentiment/30", label: "Partial Match" },
  mismatch:  { icon: XCircle, color: "text-negative", bg: "bg-negative/10 border-negative/30", label: "Mismatch" },
} as const;

const trendIcon = (t: "positive" | "negative" | "neutral") =>
  t === "positive" ? TrendingUp : t === "negative" ? TrendingDown : Activity;

const SectionCard: React.FC<React.PropsWithChildren<{ title: string; icon: React.ElementType; subtitle?: string; right?: React.ReactNode }>>
= ({ title, icon: Icon, subtitle, right, children }) => (
  <div className="bg-card rounded-lg border border-border p-5">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-md bg-primary/15 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
          {subtitle && <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {right}
    </div>
    {children}
  </div>
);

const Insight: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="mt-3 rounded-md border border-primary/25 bg-primary/5 px-3 py-2 flex gap-2 text-xs text-foreground/85">
    <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
    <span>{children}</span>
  </div>
);

const chartAxis = { tick: { fill: "hsl(var(--muted-foreground))", fontSize: 10 } } as const;
const tooltipStyle = {
  contentStyle: {
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: 8,
    fontSize: 11,
  },
  labelStyle: { color: "hsl(var(--foreground))" },
} as const;

export const FinancialAnalyticsView = ({ ticker }: Props) => {
  const data = financials[ticker] ?? financials.CROMPTON;

  const qSeries = useMemo(() => data.quarters.map((q, i, arr) => {
    const prev = i > 0 ? arr[i - 1] : null;
    const yoy = i >= 4 ? ((q.revenue - arr[i - 4].revenue) / arr[i - 4].revenue) * 100 : 0;
    const qoq = prev ? ((q.revenue - prev.revenue) / prev.revenue) * 100 : 0;
    return {
      ...q,
      yoy,
      qoq,
      grossMargin: (q.grossProfit / q.revenue) * 100,
      opMargin: (q.operatingIncome / q.revenue) * 100,
      netMargin: (q.netIncome / q.revenue) * 100,
      ebitdaMargin: (q.ebitda / q.revenue) * 100,
      fcfMargin: (q.fcf / q.revenue) * 100,
    };
  }), [data]);

  const aSeries = useMemo(() => data.annuals.map((a, i, arr) => {
    const prev = i > 0 ? arr[i - 1] : null;
    const yoy = prev ? ((a.revenue - prev.revenue) / prev.revenue) * 100 : 0;
    const de = a.totalDebt / a.equity;
    const cashRatio = a.cash / Math.max(a.totalLiabilities * 0.4, 1);
    const currentRatio = (a.cash + a.cash * 1.2) / Math.max(a.totalLiabilities * 0.4, 1);
    const roe = (a.netIncome / a.equity) * 100;
    const roa = (a.netIncome / a.totalAssets) * 100;
    const roic = (a.operatingIncome * 0.75 / (a.equity + a.totalDebt)) * 100;
    return { ...a, yoy, de, cashRatio, currentRatio, roe, roa, roic };
  }), [data]);

  const latestA = aSeries[aSeries.length - 1];
  const prevA = aSeries[aSeries.length - 2];
  const latestQ = qSeries[qSeries.length - 1];

  const exportCSV = () => {
    const headers = Object.keys(qSeries[0]).join(",");
    const rows = qSeries.map(r => Object.values(r).map(v => typeof v === "number" ? v.toFixed(2) : v).join(",")).join("\n");
    const blob = new Blob([headers + "\n" + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${ticker}_financials.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Header strip */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground">Financial Analytics</h2>
          <p className="text-xs text-muted-foreground">AI equity-research view · 12 quarters · 5 fiscal years · in {data.currency}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80">
            <Download className="w-3 h-3" /> CSV
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs hover:bg-primary/90">
            <Download className="w-3 h-3" /> PDF
          </button>
        </div>
      </div>

      {/* 1. Financial Health Summary */}
      <SectionCard title="Financial Health Summary" icon={Gauge} subtitle="AI-generated executive view of overall financial posture">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
          {([
            ["Overall", data.scores.overall],
            ["Growth", data.scores.growth],
            ["Profitability", data.scores.profitability],
            ["Liquidity", data.scores.liquidity],
            ["Leverage", data.scores.leverage],
          ] as const).map(([label, score]) => (
            <div key={label} className={cn("rounded-lg border p-3 text-center", scoreBg(score))}>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</div>
              <div className={cn("text-2xl font-bold font-mono mt-1", scoreColor(score))}>{score}</div>
              <div className="text-[10px] text-muted-foreground">/ 100</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-foreground/85 leading-relaxed">{data.summary}</p>
      </SectionCard>

      {/* 2. Revenue & Growth */}
      <SectionCard title="Revenue & Growth Analysis" icon={TrendingUp} subtitle="Quarterly trajectory and growth consistency">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-56">
            <div className="text-[11px] text-muted-foreground mb-1">Quarterly Revenue</div>
            <ResponsiveContainer>
              <AreaChart data={qSeries}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="q" {...chartAxis} />
                <YAxis {...chartAxis} />
                <Tooltip {...tooltipStyle} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="h-56">
            <div className="text-[11px] text-muted-foreground mb-1">YoY Growth %</div>
            <ResponsiveContainer>
              <BarChart data={qSeries.slice(4)}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="q" {...chartAxis} />
                <YAxis {...chartAxis} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="yoy">
                  {qSeries.slice(4).map((d, i) => (
                    <Cell key={i} fill={d.yoy >= 0 ? "hsl(var(--positive))" : "hsl(var(--negative))"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="h-48 mt-4">
          <div className="text-[11px] text-muted-foreground mb-1">Annual Revenue Trend</div>
          <ResponsiveContainer>
            <BarChart data={aSeries}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="year" {...chartAxis} />
              <YAxis {...chartAxis} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Insight>
          Latest QoQ {pct(latestQ.qoq)} and YoY {pct(latestQ.yoy)}. Growth has {latestQ.yoy < qSeries[qSeries.length - 5].yoy ? "decelerated" : "accelerated"} compared to a year ago — watch H2 for re-acceleration as seasonal categories normalize.
        </Insight>
      </SectionCard>

      {/* 3. Profitability */}
      <SectionCard title="Profitability Analysis" icon={Activity} subtitle="Margin structure across gross, operating, EBITDA and net">
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={qSeries}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="q" {...chartAxis} />
              <YAxis {...chartAxis} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="grossMargin" name="Gross %" stroke="hsl(var(--primary))" dot={false} />
              <Line type="monotone" dataKey="opMargin" name="Operating %" stroke="hsl(var(--positive))" dot={false} />
              <Line type="monotone" dataKey="ebitdaMargin" name="EBITDA %" stroke="hsl(var(--accent))" dot={false} />
              <Line type="monotone" dataKey="netMargin" name="Net %" stroke="hsl(var(--neutral-sentiment))" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
          {(() => {
            const best = [...qSeries].sort((a, b) => b.opMargin - a.opMargin)[0];
            const worst = [...qSeries].sort((a, b) => a.opMargin - b.opMargin)[0];
            const dir = qSeries[qSeries.length - 1].opMargin - qSeries[qSeries.length - 5].opMargin;
            return (
              <>
                <div className="rounded-md bg-positive/10 border border-positive/30 p-2">
                  <div className="text-[10px] text-muted-foreground">Best Op Margin Qtr</div>
                  <div className="font-mono font-bold text-positive">{best.q} · {best.opMargin.toFixed(1)}%</div>
                </div>
                <div className="rounded-md bg-negative/10 border border-negative/30 p-2">
                  <div className="text-[10px] text-muted-foreground">Worst Op Margin Qtr</div>
                  <div className="font-mono font-bold text-negative">{worst.q} · {worst.opMargin.toFixed(1)}%</div>
                </div>
                <div className={cn("rounded-md border p-2", dir >= 0 ? "bg-positive/10 border-positive/30" : "bg-negative/10 border-negative/30")}>
                  <div className="text-[10px] text-muted-foreground">YoY Margin Δ</div>
                  <div className={cn("font-mono font-bold", dir >= 0 ? "text-positive" : "text-negative")}>{dir >= 0 ? "+" : ""}{dir.toFixed(1)} bps</div>
                </div>
              </>
            );
          })()}
        </div>
        <Insight>
          Operating margin {latestQ.opMargin >= qSeries[qSeries.length - 5].opMargin ? "expanded" : "compressed"} versus the same quarter last year. Cost management is {data.scores.profitability >= 70 ? "effective" : "under pressure"} — gross margin remains the key swing factor.
        </Insight>
      </SectionCard>

      {/* 4. Cash Flow */}
      <SectionCard title="Cash Flow Analysis" icon={Banknote} subtitle="Operating cash, free cash flow and capex intensity">
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={qSeries}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="q" {...chartAxis} />
              <YAxis {...chartAxis} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="ocf" name="Operating CF" fill="hsl(var(--primary))" />
              <Bar dataKey="fcf" name="Free CF" fill="hsl(var(--positive))" />
              <Bar dataKey="capex" name="CapEx" fill="hsl(var(--neutral-sentiment))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Insight>
          FCF has moved from {fmt(aSeries[0].fcf)} to {fmt(latestA.fcf)} ({pct(((latestA.fcf - aSeries[0].fcf) / aSeries[0].fcf) * 100)} over 5 years). FCF {latestA.fcf > latestA.netIncome ? "exceeds" : "trails"} net income — earnings quality is {latestA.fcf > latestA.netIncome ? "strong" : "average"}.
        </Insight>
      </SectionCard>

      {/* 5. Balance Sheet */}
      <SectionCard title="Balance Sheet Strength" icon={Shield} subtitle="Liquidity, leverage and solvency posture">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ["Debt / Equity", latestA.de.toFixed(2) + "x", latestA.de < 0.3 ? "positive" : latestA.de < 0.7 ? "neutral" : "negative"],
            ["Current Ratio", latestA.currentRatio.toFixed(2) + "x", latestA.currentRatio >= 1.5 ? "positive" : "neutral"],
            ["Quick Ratio", (latestA.currentRatio * 0.85).toFixed(2) + "x", "positive"],
            ["Cash Ratio", latestA.cashRatio.toFixed(2) + "x", latestA.cashRatio >= 1 ? "positive" : "neutral"],
          ].map(([l, v, s]) => (
            <div key={l as string} className={cn("rounded-md border p-3", s === "positive" ? "bg-positive/10 border-positive/30" : s === "negative" ? "bg-negative/10 border-negative/30" : "bg-neutral-sentiment/10 border-neutral-sentiment/30")}>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{l}</div>
              <div className="text-lg font-mono font-bold mt-1">{v}</div>
            </div>
          ))}
        </div>
        <Insight>
          Cash reserves of {fmt(latestA.cash)} cover total debt of {fmt(latestA.totalDebt)} by {(latestA.cash / Math.max(latestA.totalDebt, 1)).toFixed(1)}x — balance sheet is {latestA.cash > latestA.totalDebt ? "net cash positive" : "leveraged"} and well placed to absorb cyclicality.
        </Insight>
      </SectionCard>

      {/* 6. Shareholder Value */}
      <SectionCard title="Shareholder Value Creation" icon={BadgeCheck} subtitle="Returns on equity, assets and invested capital">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-56">
            <div className="text-[11px] text-muted-foreground mb-1">Returns (%)</div>
            <ResponsiveContainer>
              <LineChart data={aSeries}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="year" {...chartAxis} />
                <YAxis {...chartAxis} />
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line dataKey="roe" name="ROE" stroke="hsl(var(--primary))" dot />
                <Line dataKey="roa" name="ROA" stroke="hsl(var(--positive))" dot />
                <Line dataKey="roic" name="ROIC" stroke="hsl(var(--accent))" dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="h-56">
            <div className="text-[11px] text-muted-foreground mb-1">EPS Growth</div>
            <ResponsiveContainer>
              <BarChart data={aSeries}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="year" {...chartAxis} />
                <YAxis {...chartAxis} />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="eps" fill="hsl(var(--primary))" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <Insight>
          ROIC has moved from {aSeries[0].roic.toFixed(1)}% to {latestA.roic.toFixed(1)}%, EPS from ₹{aSeries[0].eps.toFixed(1)} to ₹{latestA.eps.toFixed(1)} — capital allocation is {latestA.roic > aSeries[0].roic ? "becoming more efficient" : "decelerating"}.
        </Insight>
      </SectionCard>

      {/* 7. Trend Detection */}
      <SectionCard title="Financial Trend Detection" icon={LineIcon} subtitle="Auto-detected directional signals across statements">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.trends.map((t, i) => {
            const Icon = trendIcon(t.type);
            const colors = t.type === "positive" ? "bg-positive/10 border-positive/30 text-positive"
              : t.type === "negative" ? "bg-negative/10 border-negative/30 text-negative"
              : "bg-neutral-sentiment/10 border-neutral-sentiment/30 text-neutral-sentiment";
            return (
              <div key={i} className={cn("rounded-md border p-3", colors)}>
                <div className="flex items-center gap-2 font-medium text-xs">
                  <Icon className="w-3.5 h-3.5" />
                  {t.type === "positive" ? "✓" : t.type === "negative" ? "⚠" : "•"} {t.label}
                </div>
                <p className="text-[11px] text-foreground/75 mt-1">{t.note}</p>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* 8. Call vs Reality */}
      <SectionCard
        title="Earnings Call vs Financial Reality"
        icon={Target}
        subtitle="Cross-validating management commentary against actual results"
        right={
          <div className={cn("px-3 py-1.5 rounded-md border text-xs", scoreBg(data.scores.overall))}>
            <span className="text-muted-foreground">Credibility</span>{" "}
            <span className={cn("font-mono font-bold", scoreColor(data.scores.overall))}>{Math.round((data.callVsReality.filter(c => c.verdict === "confirmed").length / data.callVsReality.length) * 100)}%</span>
          </div>
        }
      >
        <div className="space-y-2">
          {data.callVsReality.map((c, i) => {
            const m = verdictMeta[c.verdict];
            const Icon = m.icon;
            return (
              <div key={i} className={cn("rounded-md border p-3 grid grid-cols-1 md:grid-cols-12 gap-2 items-center", m.bg)}>
                <div className="md:col-span-5">
                  <div className="text-[10px] text-muted-foreground uppercase">Management Claim</div>
                  <div className="text-xs text-foreground/90">"{c.claim}"</div>
                </div>
                <div className="md:col-span-5">
                  <div className="text-[10px] text-muted-foreground uppercase">Financial Validation</div>
                  <div className="text-xs text-foreground/90">{c.validation}</div>
                </div>
                <div className={cn("md:col-span-2 flex items-center gap-1.5 text-xs font-semibold", m.color)}>
                  <Icon className="w-4 h-4" /> {m.label}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* 9. Investor Insights */}
      <SectionCard title="Investor Insights" icon={DollarSign} subtitle="Bullish / bearish drivers, risks and opportunities">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { title: "Bullish Signals", items: data.bullish, icon: ArrowUpRight, color: "positive" },
            { title: "Bearish Signals", items: data.bearish, icon: ArrowDownRight, color: "negative" },
            { title: "Key Risks", items: data.risks, icon: AlertTriangle, color: "neutral" },
            { title: "Opportunities", items: data.opportunities, icon: Sparkles, color: "primary" },
          ].map(({ title, items, icon: Icon, color }) => (
            <div key={title} className="rounded-md border border-border bg-muted/30 p-3">
              <div className={cn("flex items-center gap-1.5 text-xs font-semibold mb-2",
                color === "positive" ? "text-positive" : color === "negative" ? "text-negative" : color === "neutral" ? "text-neutral-sentiment" : "text-primary")}>
                <Icon className="w-3.5 h-3.5" /> {title}
              </div>
              <ul className="space-y-1.5">
                {items.map((it, i) => (
                  <li key={i} className="text-[11px] text-foreground/80 leading-snug flex gap-1.5">
                    <span className="text-muted-foreground">•</span> {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 10. AI Investment Summary */}
      <SectionCard title="AI Investment Summary" icon={Sparkles} subtitle="Institutional-style synthesis with rating & confidence">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className={cn("px-4 py-2 rounded-lg border text-sm font-bold tracking-wide", ratingColor(data.rating))}>
            {data.rating}
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
              <span>Confidence</span><span className="font-mono">{data.confidence}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${data.confidence}%` }} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {([
            ["Business Strengths", data.thesis.strengths, "positive"],
            ["Financial Weaknesses", data.thesis.weaknesses, "negative"],
            ["Growth Outlook", data.thesis.outlook, "primary"],
            ["Risk Assessment", data.thesis.risk, "neutral"],
          ] as const).map(([t, body, c]) => (
            <div key={t} className="rounded-md border border-border bg-muted/30 p-3">
              <div className={cn("text-[10px] uppercase tracking-wider font-semibold mb-1",
                c === "positive" ? "text-positive" : c === "negative" ? "text-negative" : c === "neutral" ? "text-neutral-sentiment" : "text-primary")}>{t}</div>
              <p className="text-foreground/85 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};
