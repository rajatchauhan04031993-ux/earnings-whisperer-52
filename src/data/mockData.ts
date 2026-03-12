export interface EarningsCall {
  ticker: string;
  company: string;
  quarter: string;
  date: string;
  overallSentiment: number;
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
    ticker: "CROMPTON",
    company: "Crompton Greaves Consumer Electricals",
    quarter: "Q3 FY25",
    date: "2025-01-28",
    overallSentiment: 0.69,
    textSentiment: 0.64,
    voiceSentiment: 0.76,
    summary: {
      highlights: [
        "Revenue grew 12.4% YoY to ₹1,842 Cr driven by ECD and lighting segments",
        "EBITDA margin expanded 150bps to 13.8% on better product mix",
        "Fans segment volume growth of 18% — strongest in 8 quarters post-BEE transition",
        "Butterfly integration on track — synergies of ₹45 Cr realized YTD",
      ],
      wins: [
        "Premium fans (Silentpro, AirBuddy) now 28% of fan revenue — up from 19% YoY",
        "Lighting B2B channel grew 22% — new institutional partnerships driving scale",
        "E-commerce channel contribution up to 11% from 7% — fastest growing channel",
        "Water heater category crossed ₹100 Cr quarterly revenue milestone",
      ],
      gaps: [
        "Pump segment profitability remains below target — competitive pricing pressure",
        "Rural distribution expansion behind plan — only 60% of targeted new touchpoints added",
        "Large appliances (Butterfly) margin improvement trajectory not quantified",
      ],
      guidance: [
        "Targeting 15%+ revenue growth in FY26 with margin expansion of 100-150bps",
        "Premium mix target of 35% of ECD revenue by FY27",
        "Capex of ₹200 Cr planned for new manufacturing facility in South India",
      ],
      kpis: {
        Revenue: "₹1,842 Cr",
        "EBITDA Mgn": "13.8%",
        "Fan Vol. Gr.": "+18%",
        "Premium Mix": "28%",
        "E-comm %": "11%",
        "Net Debt": "₹320 Cr",
      },
    },
    sentimentBySection: [
      { section: "Opening Remarks", score: 0.82, label: "positive", quote: "We are very pleased with the strong volume recovery in fans post the BEE star rating transition..." },
      { section: "Financial Results", score: 0.7, label: "positive", quote: "Our margin expansion reflects the premiumization strategy bearing fruit..." },
      { section: "Product Strategy", score: 0.88, label: "positive", quote: "The Silentpro and AirBuddy ranges have been extremely well received by consumers..." },
      { section: "Q&A - Fans Market", score: 0.6, label: "positive", quote: "We believe we have gained 200bps of market share in the organized fans segment..." },
      { section: "Q&A - Pumps", score: 0.25, label: "neutral", quote: "Pumps is a competitive category... we are working on our positioning..." },
      { section: "Q&A - Butterfly", score: 0.3, label: "neutral", quote: "Integration is progressing well... synergies will be more visible in coming quarters..." },
      { section: "Closing", score: 0.75, label: "positive", quote: "We are confident in our strategy of premiumization and category expansion..." },
    ],
    topQuestions: [
      { question: "What is the market share trajectory in fans post-BEE transition?", frequency: 7, answered: true, sentiment: "positive", analystFirm: "Goldman Sachs" },
      { question: "When will pump segment margins reach ECD-level profitability?", frequency: 6, answered: false, sentiment: "negative", analystFirm: "Morgan Stanley" },
      { question: "What is the Butterfly integration timeline and synergy target?", frequency: 6, answered: false, sentiment: "neutral", analystFirm: "JP Morgan" },
      { question: "Premium mix target and pricing power sustainability?", frequency: 5, answered: true, sentiment: "positive", analystFirm: "CLSA" },
      { question: "Rural distribution expansion — revised timeline?", frequency: 4, answered: false, sentiment: "negative", analystFirm: "Citi" },
      { question: "E-commerce channel profitability vs offline?", frequency: 4, answered: true, sentiment: "neutral", analystFirm: "UBS" },
      { question: "New product pipeline for FY26 — categories and SKUs?", frequency: 3, answered: true, sentiment: "positive", analystFirm: "Jefferies" },
      { question: "Raw material cost outlook and hedging strategy?", frequency: 3, answered: true, sentiment: "neutral", analystFirm: "BofA" },
    ],
  },
  {
    ticker: "HAVELLS",
    company: "Havells India",
    quarter: "Q3 FY25",
    date: "2025-01-22",
    overallSentiment: 0.62,
    textSentiment: 0.59,
    voiceSentiment: 0.66,
    summary: {
      highlights: [
        "Revenue grew 8.2% YoY to ₹4,520 Cr — in line with estimates",
        "Lloyd (AC) segment grew 25% but margins under pressure",
        "Switchgear & cables remained stable with steady margin profile",
        "Lighting segment continued to face pricing headwinds — flat YoY",
      ],
      wins: [
        "Lloyd AC market share gain of 150bps — now #3 in room AC segment",
        "Switchgear premium range contributing 40% of segment revenue",
        "Brand spending up 18% — consumer recall scores at all-time high",
        "Industrial cables order book grew 30% on infra spending tailwinds",
      ],
      gaps: [
        "Lloyd margins compressed 200bps — discounting in peak season",
        "Fans segment growth lagged market at 8% vs industry 14%",
        "ECD innovation pipeline appears thin compared to peers",
      ],
      guidance: [
        "FY26 revenue growth target of 12-14% led by Lloyd and cables",
        "Lloyd margin recovery expected in H2 FY26 with operational leverage",
        "Planning 3 new exclusive brand outlets every day — 1,100 target in FY26",
      ],
      kpis: {
        Revenue: "₹4,520 Cr",
        "EBITDA Mgn": "10.2%",
        "Lloyd Gr.": "+25%",
        "Cable Gr.": "+12%",
        "Brand Spend": "₹180 Cr",
        "Net Cash": "₹1,200 Cr",
      },
    },
    sentimentBySection: [
      { section: "Opening Remarks", score: 0.72, label: "positive", quote: "Our diversified portfolio continues to deliver resilient performance..." },
      { section: "Financial Results", score: 0.55, label: "positive", quote: "Revenue growth was in line, though margins were impacted by Lloyd..." },
      { section: "Product Strategy", score: 0.68, label: "positive", quote: "We continue to invest in brand building and distribution expansion..." },
      { section: "Q&A - Lloyd", score: 0.35, label: "neutral", quote: "AC margins will take a couple of quarters to normalize..." },
      { section: "Q&A - Fans", score: 0.4, label: "neutral", quote: "We are recalibrating our fan strategy... the BEE transition impacted us..." },
      { section: "Q&A - Cables", score: 0.7, label: "positive", quote: "Industrial cables is a strong growth driver backed by infra spending..." },
      { section: "Closing", score: 0.6, label: "positive", quote: "We remain committed to our long-term strategy of premiumization..." },
    ],
    topQuestions: [
      { question: "When will Lloyd AC margins recover to 5%+ EBIT?", frequency: 8, answered: false, sentiment: "negative", analystFirm: "Goldman Sachs" },
      { question: "Why are fans growing below market rate?", frequency: 6, answered: false, sentiment: "negative", analystFirm: "Morgan Stanley" },
      { question: "Cable segment order book visibility for FY26?", frequency: 5, answered: true, sentiment: "positive", analystFirm: "JP Morgan" },
      { question: "Brand spend ROI — how is it measured?", frequency: 4, answered: true, sentiment: "neutral", analystFirm: "Citi" },
      { question: "ECD new product launch pipeline?", frequency: 4, answered: false, sentiment: "neutral", analystFirm: "CLSA" },
      { question: "Distribution expansion — exclusive outlet economics?", frequency: 3, answered: true, sentiment: "positive", analystFirm: "UBS" },
      { question: "Raw material inflation impact on cables margin?", frequency: 3, answered: true, sentiment: "neutral", analystFirm: "Jefferies" },
      { question: "Switchgear market share trend?", frequency: 3, answered: true, sentiment: "positive", analystFirm: "BofA" },
    ],
  },
];

export const historicalSentiment = [
  { quarter: "Q1 FY24", CROMPTON: 0.55, HAVELLS: 0.58 },
  { quarter: "Q2 FY24", CROMPTON: 0.52, HAVELLS: 0.54 },
  { quarter: "Q3 FY24", CROMPTON: 0.58, HAVELLS: 0.56 },
  { quarter: "Q4 FY24", CROMPTON: 0.63, HAVELLS: 0.60 },
  { quarter: "Q1 FY25", CROMPTON: 0.61, HAVELLS: 0.57 },
  { quarter: "Q2 FY25", CROMPTON: 0.66, HAVELLS: 0.59 },
  { quarter: "Q3 FY25", CROMPTON: 0.69, HAVELLS: 0.62 },
];

export const questionGapAnalysis = [
  { topic: "Pump Segment Profitability", CROMPTON: false, HAVELLS: true, peerAvg: 0.55, priority: "high" as const },
  { topic: "Premium Mix & Pricing Power", CROMPTON: true, HAVELLS: false, peerAvg: 0.7, priority: "high" as const },
  { topic: "Rural Distribution Strategy", CROMPTON: false, HAVELLS: true, peerAvg: 0.6, priority: "high" as const },
  { topic: "Large Appliance Integration", CROMPTON: false, HAVELLS: true, peerAvg: 0.45, priority: "high" as const },
  { topic: "Fan Market Share Post-BEE", CROMPTON: true, HAVELLS: false, peerAvg: 0.75, priority: "medium" as const },
  { topic: "E-commerce Profitability", CROMPTON: true, HAVELLS: true, peerAvg: 0.5, priority: "medium" as const },
  { topic: "Raw Material Hedging", CROMPTON: true, HAVELLS: true, peerAvg: 0.65, priority: "low" as const },
  { topic: "New Product Pipeline", CROMPTON: true, HAVELLS: false, peerAvg: 0.8, priority: "medium" as const },
  { topic: "Brand Spending ROI", CROMPTON: false, HAVELLS: true, peerAvg: 0.4, priority: "medium" as const },
  { topic: "Capex & Capacity Plans", CROMPTON: true, HAVELLS: true, peerAvg: 0.7, priority: "low" as const },
];
