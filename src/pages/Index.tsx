import { useState } from "react";
import { mockCalls } from "@/data/mockData";
import { SentimentView } from "@/components/SentimentView";
import { SummaryView } from "@/components/SummaryView";
import { CompetitiveView } from "@/components/CompetitiveView";
import { TopQuestionsView } from "@/components/TopQuestionsView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, FileText, GitCompare, Upload, Search, TrendingUp } from "lucide-react";

const Index = () => {
  const [selectedTicker, setSelectedTicker] = useState("CROMPTON");
  const selectedCall = mockCalls.find((c) => c.ticker === selectedTicker) ?? mockCalls[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground tracking-tight">Crompton IR Analytics</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Earnings Intelligence · Competitive Edge</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Ticker Selector */}
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              {mockCalls.map((call) => (
                <button
                  key={call.ticker}
                  onClick={() => setSelectedTicker(call.ticker)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                    selectedTicker === call.ticker
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {call.ticker}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80 transition-colors">
              <Upload className="w-3 h-3" />
              Upload
            </button>
          </div>
        </div>
      </header>

      {/* Company Info Bar */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-2 flex items-center gap-4 text-xs">
          <span className="font-mono text-primary font-bold">{selectedCall.ticker}</span>
          <span className="text-foreground/80">{selectedCall.company}</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">{selectedCall.quarter}</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">{selectedCall.date}</span>
          <span className="text-muted-foreground ml-auto flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
            Mock Data — Demo Mode
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="sentiment" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 h-auto">
            <TabsTrigger value="sentiment" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-3.5 h-3.5" />
              Sentiment
            </TabsTrigger>
            <TabsTrigger value="summary" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-3.5 h-3.5" />
              Summary
            </TabsTrigger>
            <TabsTrigger value="questions" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Search className="w-3.5 h-3.5" />
              Top Questions
            </TabsTrigger>
            <TabsTrigger value="competitive" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <GitCompare className="w-3.5 h-3.5" />
              Competitive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sentiment">
            <SentimentView call={selectedCall} />
          </TabsContent>
          <TabsContent value="summary">
            <SummaryView call={selectedCall} />
          </TabsContent>
          <TabsContent value="questions">
            <TopQuestionsView call={selectedCall} />
          </TabsContent>
          <TabsContent value="competitive">
            <CompetitiveView />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
