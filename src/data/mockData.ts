export interface EarningsCall {
  ticker: string;
  company: string;
  quarter: string;
  date: string;
  overallSentiment: number; // -1 to 1
  textSentiment: number;
  voiceSentiment: number;
  summary: {
    highlights: string[];
    wins: string[];
    gaps: string[];
    guidance: string[];
    kpis: Record<string, string>;
  };
  sentimentBySection: {
    section: string;
    score: number;
    label: "positive" | "negative" | "neutral";
    quote: string;
  }[];
  topQuestions: {
    question: string;
    frequency: number;
    answered: boolean;
    sentiment: "positive" | "negative" | "neutral";
    analystFirm: string;
  }[];
}

export const mockCalls: EarningsCall[] = [
  {
    ticker: "TCS",
    company: "Tata Consultancy Services",
    quarter: "Q3 FY25",
    date: "2025-01-09",
    overallSentiment: 0.72,
    textSentiment: 0.68,
    voiceSentiment: 0.78,
    summary: {
      highlights: [
        "Revenue growth of 5.6% YoY in constant currency terms",
        "Strong deal pipeline with TCV of $12.2B for the quarter",
        "Operating margin improved 40bps sequentially to 26.4%",
        "Net headcount addition of 5,726 — strongest in 6 quarters",
      ],
      wins: [
        "BFSI vertical grew 7.2% — strongest growth across verticals",
        "Cloud transformation deals accelerating — 35% of new TCV",
        "Attrition dropped to 12.3%, lowest in 3 years",
        "Three mega-deals signed worth $500M+ each",
      ],
      gaps: [
        "Retail vertical remains flat — no clear recovery timeline given",
        "GenAI revenue contribution not quantified despite multiple questions",
        "Subcontracting costs elevated — management deflected specifics",
      ],
      guidance: [
        "Expect double-digit growth in FY26 in constant currency",
        "Margin band of 26-28% maintained for medium term",
        "Hiring to accelerate in Q4 with campus intake of 40,000",
      ],
      kpis: {
        Revenue: "$7.5B",
        "Op. Margin": "26.4%",
        "Deal TCV": "$12.2B",
        Attrition: "12.3%",
        "Net Add": "5,726",
        "FCF Conv.": "96%",
      },
    },
    sentimentBySection: [
      { section: "Opening Remarks", score: 0.85, label: "positive", quote: "We are very pleased with the broad-based growth across geographies..." },
      { section: "Financial Results", score: 0.72, label: "positive", quote: "Operating margins expanded despite wage hikes and promotions..." },
      { section: "Deal Pipeline", score: 0.91, label: "positive", quote: "Our pipeline is the strongest it has ever been..." },
      { section: "Q&A - Growth", score: 0.55, label: "neutral", quote: "We remain cautious on the macro outlook but see pockets of strength..." },
      { section: "Q&A - GenAI", score: 0.35, label: "neutral", quote: "It's still early days... we see it as a long-term opportunity..." },
      { section: "Q&A - Margins", score: -0.15, label: "negative", quote: "Subcontracting costs are something we are working on..." },
      { section: "Closing", score: 0.78, label: "positive", quote: "We enter FY26 with strong conviction in our strategy..." },
    ],
    topQuestions: [
      { question: "What is the revenue impact of GenAI projects?", frequency: 8, answered: false, sentiment: "neutral", analystFirm: "Goldman Sachs" },
      { question: "When will retail vertical recover?", frequency: 6, answered: false, sentiment: "negative", analystFirm: "Morgan Stanley" },
      { question: "What's the deal pipeline outlook for FY26?", frequency: 5, answered: true, sentiment: "positive", analystFirm: "JP Morgan" },
      { question: "Will margins sustain above 26%?", frequency: 5, answered: true, sentiment: "neutral", analystFirm: "Citi" },
      { question: "How is the BFSI demand environment?", frequency: 4, answered: true, sentiment: "positive", analystFirm: "CLSA" },
      { question: "What's the subcontracting cost trend?", frequency: 4, answered: false, sentiment: "negative", analystFirm: "UBS" },
      { question: "Campus hiring plans for FY26?", frequency: 3, answered: true, sentiment: "positive", analystFirm: "Jefferies" },
      { question: "Cloud migration deal momentum?", frequency: 3, answered: true, sentiment: "positive", analystFirm: "BofA" },
    ],
  },
  {
    ticker: "INFY",
    company: "Infosys",
    quarter: "Q3 FY25",
    date: "2025-01-16",
    overallSentiment: 0.58,
    textSentiment: 0.55,
    voiceSentiment: 0.62,
    summary: {
      highlights: [
        "Revenue growth of 3.8% YoY in constant currency",
        "Large deal TCV of $4.1B — second highest quarter",
        "Operating margin at 21.3%, within guided range",
        "Revised FY25 guidance upward to 4.5-5% CC growth",
      ],
      wins: [
        "Financial services vertical strong with 6.1% growth",
        "Topaz AI platform gaining traction — 280+ client engagements",
        "Free cash flow conversion at 89%",
      ],
      gaps: [
        "Manufacturing vertical declined 2.1% sequentially",
        "Utilization dropped to 82.4% — below optimal range",
        "Pricing pressure acknowledged but not quantified",
      ],
      guidance: [
        "FY25 revenue growth guidance: 4.5-5.0% CC",
        "Operating margin guidance: 20-22%",
        "FY26 outlook cautiously optimistic pending macro clarity",
      ],
      kpis: {
        Revenue: "$4.9B",
        "Op. Margin": "21.3%",
        "Deal TCV": "$4.1B",
        Attrition: "14.1%",
        Utilization: "82.4%",
        "FCF Conv.": "89%",
      },
    },
    sentimentBySection: [
      { section: "Opening Remarks", score: 0.7, label: "positive", quote: "We continue to execute well on our strategic priorities..." },
      { section: "Financial Results", score: 0.6, label: "positive", quote: "Our margins are in the guided band despite headwinds..." },
      { section: "Deal Pipeline", score: 0.8, label: "positive", quote: "Large deal wins reflect the trust clients place in us..." },
      { section: "Q&A - Growth", score: 0.4, label: "neutral", quote: "We see discretionary spending improving gradually..." },
      { section: "Q&A - GenAI", score: 0.5, label: "neutral", quote: "Topaz is seeing good traction... early innings..." },
      { section: "Q&A - Margins", score: 0.3, label: "neutral", quote: "We are working on multiple levers to improve margins..." },
      { section: "Closing", score: 0.65, label: "positive", quote: "We are well positioned for the recovery..." },
    ],
    topQuestions: [
      { question: "What is the GenAI revenue contribution?", frequency: 7, answered: false, sentiment: "neutral", analystFirm: "Goldman Sachs" },
      { question: "When will utilization improve?", frequency: 5, answered: true, sentiment: "neutral", analystFirm: "Morgan Stanley" },
      { question: "FY26 growth outlook?", frequency: 5, answered: false, sentiment: "neutral", analystFirm: "JP Morgan" },
      { question: "Manufacturing vertical recovery timeline?", frequency: 4, answered: false, sentiment: "negative", analystFirm: "CLSA" },
      { question: "Pricing environment outlook?", frequency: 4, answered: false, sentiment: "negative", analystFirm: "Citi" },
      { question: "Topaz AI deal conversion rate?", frequency: 3, answered: true, sentiment: "positive", analystFirm: "UBS" },
      { question: "Margin expansion levers for FY26?", frequency: 3, answered: true, sentiment: "neutral", analystFirm: "Jefferies" },
      { question: "Client budget trends for CY2025?", frequency: 3, answered: true, sentiment: "positive", analystFirm: "BofA" },
    ],
  },
];

export const historicalSentiment = [
  { quarter: "Q1 FY24", TCS: 0.65, INFY: 0.52 },
  { quarter: "Q2 FY24", TCS: 0.58, INFY: 0.48 },
  { quarter: "Q3 FY24", TCS: 0.62, INFY: 0.55 },
  { quarter: "Q4 FY24", TCS: 0.7, INFY: 0.6 },
  { quarter: "Q1 FY25", TCS: 0.68, INFY: 0.56 },
  { quarter: "Q2 FY25", TCS: 0.71, INFY: 0.54 },
  { quarter: "Q3 FY25", TCS: 0.72, INFY: 0.58 },
];

export const questionGapAnalysis = [
  { topic: "GenAI Revenue Impact", TCS: false, INFY: false, peerAvg: 0.3, priority: "high" as const },
  { topic: "Pricing Environment", TCS: true, INFY: false, peerAvg: 0.65, priority: "high" as const },
  { topic: "Deal Pipeline Outlook", TCS: true, INFY: true, peerAvg: 0.85, priority: "medium" as const },
  { topic: "Margin Sustainability", TCS: true, INFY: true, peerAvg: 0.7, priority: "medium" as const },
  { topic: "Client Budget Trends", TCS: true, INFY: true, peerAvg: 0.75, priority: "low" as const },
  { topic: "Vertical Recovery (Retail)", TCS: false, INFY: false, peerAvg: 0.45, priority: "high" as const },
  { topic: "Subcontracting Costs", TCS: false, INFY: true, peerAvg: 0.5, priority: "medium" as const },
  { topic: "Talent Strategy", TCS: true, INFY: true, peerAvg: 0.8, priority: "low" as const },
  { topic: "Cloud Migration Pace", TCS: true, INFY: true, peerAvg: 0.9, priority: "low" as const },
  { topic: "Wage Hike Impact", TCS: true, INFY: true, peerAvg: 0.6, priority: "medium" as const },
];
