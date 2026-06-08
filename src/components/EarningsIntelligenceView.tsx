import type { EarningsCall } from "@/data/mockData";
import { SummaryView } from "./SummaryView";
import { SentimentView } from "./SentimentView";
import { TopQuestionsView } from "./TopQuestionsView";
import { CompetitiveView } from "./CompetitiveView";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles, FileText, BarChart3, Search, GitCompare, TrendingUp } from "lucide-react";

interface Props {
  call: EarningsCall;
}

export const EarningsIntelligenceView = ({ call }: Props) => {
  // Composite Earnings Intelligence Score (0-100) derived from sentiment + guidance breadth + Q&A answered rate
  const answeredRate =
    call.topQuestions.length > 0
      ? call.topQuestions.filter((q) => q.answered).length / call.topQuestions.length
      : 0;
  const score = Math.round(
    (call.overallSentiment * 0.45 + answeredRate * 0.35 + Math.min(call.summary.guidance.length / 5, 1) * 0.2) * 100,
  );
  const scoreLabel = score >= 70 ? "Strong" : score >= 50 ? "Constructive" : "Cautious";
  const scoreColor = score >= 70 ? "text-positive" : score >= 50 ? "text-neutral-sentiment" : "text-negative";

  const bullish = call.sentimentBySection.filter((s) => s.score >= 0.6);
  const bearish = call.sentimentBySection.filter((s) => s.score < 0.4);

  return (
    <div className="space-y-6">
      {/* Top: Executive Summary + Intelligence Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Executive Summary</h3>
          </div>
          <p className="text-sm text-foreground/85 leading-relaxed mb-4">
            {call.company} reported {call.quarter} with overall management tone scored at{" "}
            <strong className={scoreColor}>{(call.overallSentiment * 100).toFixed(0)}%</strong>. Key takeaways center on
            growth drivers ({call.summary.wins.slice(0, 2).map((w) => w.split(" ").slice(0, 4).join(" ")).join("; ")}),
            while gaps remain around {call.summary.gaps[0]?.split(" ").slice(0, 8).join(" ")}…
          </p>
          <ul className="space-y-1.5">
            {call.summary.highlights.slice(0, 4).map((h, i) => (
              <li key={i} className="text-sm text-foreground/80 flex gap-2">
                <span className="text-primary font-mono text-xs mt-0.5">0{i + 1}</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="gradient-glow rounded-lg p-6 border border-primary/20 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Earnings Intelligence Score</span>
            <div className="flex items-end gap-2 mt-3">
              <span className={`text-5xl font-mono font-bold ${scoreColor}`}>{score}</span>
              <span className="text-sm text-muted-foreground mb-1">/ 100</span>
            </div>
            <span className={`text-xs font-mono uppercase tracking-wider ${scoreColor}`}>{scoreLabel}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
            Weighted blend of sentiment (45%), Q&amp;A transparency (35%), and forward guidance breadth (20%).
          </p>
        </div>
      </div>

      {/* Bull vs Bear Signals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-positive" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Bullish Signals</h3>
          </div>
          <ul className="space-y-2.5">
            {[...call.summary.wins, ...bullish.map((b) => b.quote)].slice(0, 5).map((w, i) => (
              <li key={i} className="text-sm text-foreground/80 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-positive mt-1.5 shrink-0" />
                <span className="line-clamp-2">{w}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-negative rotate-180" />
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Bearish Signals</h3>
          </div>
          <ul className="space-y-2.5">
            {[...call.summary.gaps, ...bearish.map((b) => b.quote)].slice(0, 5).map((g, i) => (
              <li key={i} className="text-sm text-foreground/80 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-negative mt-1.5 shrink-0" />
                <span className="line-clamp-2">{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Collapsible deep-dive sections */}
      <Accordion type="multiple" defaultValue={["summary"]} className="space-y-3">
        <AccordionItem value="summary" className="border border-border rounded-lg bg-card px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-medium">Guidance, Themes &amp; KPIs</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <SummaryView call={call} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sentiment" className="border border-border rounded-lg bg-card px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2 text-sm">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="font-medium">Management Sentiment Deep-Dive</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <SentimentView call={call} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="questions" className="border border-border rounded-lg bg-card px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2 text-sm">
              <Search className="w-4 h-4 text-primary" />
              <span className="font-medium">Analyst Q&amp;A Insights</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <TopQuestionsView call={call} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="competitive" className="border border-border rounded-lg bg-card px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2 text-sm">
              <GitCompare className="w-4 h-4 text-primary" />
              <span className="font-medium">Historical Trends &amp; Peer Benchmark</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CompetitiveView />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
