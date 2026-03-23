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
    quarter: "Q1 FY26",
    date: "2025-08-07",
    overallSentiment: 0.58,
    textSentiment: 0.54,
    voiceSentiment: 0.63,
    summary: {
      highlights: [
        "Revenue at ₹1,819 Cr on standalone basis; performance ahead of industry despite weather disruptions",
        "ECD business declined ~8% vs industry decline of ~11% — market share gains across categories",
        "Solar pumps business doubled YoY; secured largest ever single order of ₹101 Cr from MEDA",
        "Became zero-debt company after repaying ₹300 Cr NCD; remains net cash positive",
      ],
      wins: [
        "SDA business sustained strong double-digit growth (15-18% trajectory) led by mixer grinders & induction cooktops",
        "Lighting EBIT rose 41% YoY to ₹29 Cr with margins expanding 370bps to 12.6% on better product mix",
        "BLDC fan launches (Nucleoid platform) — demand outweighing supply; #2 player aiming for #1",
        "Butterfly revenue +3% to ₹187 Cr, EBITDA +39% YoY; gained share in core categories (mixers, gas stoves, pressure cookers)",
      ],
      gaps: [
        "Seasonal categories (TPW, air coolers, residential pumps) sharply impacted by shorter summer & erratic monsoon",
        "Management refused to share category-wise breakdowns or seasonal revenue mix percentages",
        "New category entry timeline and specifics remain undisclosed despite MOA amendments",
        "Greenfield manufacturing facility timeline not committed — 'you will hear soon enough'",
      ],
      guidance: [
        "Butterfly double-digit growth guidance for FY26 maintained despite weak Q1 start",
        "Greenfield manufacturing unit (India + export) with indicative capex of ₹350 Cr over 2-3 years",
        "Sustainability goals: 50% reduction in Scope 1 & 2 GHG emissions by 2035",
        "Solar rooftop business entry progressing — orders to be disclosed when secured",
      ],
      kpis: {
        Revenue: "₹1,819 Cr",
        "EBIT Mgn": "8.5%",
        "PAT": "₹125 Cr",
        "PAT Mgn": "6.9%",
        "Solar Pumps": "2x YoY",
        "Debt": "Zero",
      },
    },
    sentimentBySection: [
      { section: "Opening Remarks", score: 0.75, label: "positive", quote: "The theme of Q1 results reflects our continuing resilience and agility... performance ahead of the industry in various categories." },
      { section: "Financial Results", score: 0.45, label: "neutral", quote: "Revenue stood at ₹1,819 Cr. EBIT came in at ₹155 Cr and EBIT margin at 8.5%. We became a zero-debt company." },
      { section: "Product Strategy", score: 0.82, label: "positive", quote: "Fluido, Niteo and Nucleoid resonated well with consumers and strengthened our premium portfolio... demand is outweighing supply." },
      { section: "Solar Pumps", score: 0.88, label: "positive", quote: "Our solar pumps business doubled over a similar period last year. We secured the largest ever single order of ₹101 Cr." },
      { section: "Q&A - Seasonal Impact", score: 0.30, label: "neutral", quote: "ECD business declined by about 8%... a large part of this decline is attributable only to seasonal categories." },
      { section: "Q&A - Fan Inventory", score: 0.35, label: "neutral", quote: "There is fans inventory in the channel. It's beginning to clear... indications are that we have some green shoots." },
      { section: "Q&A - Category Disclosure", score: 0.20, label: "negative", quote: "We don't give specific details... Allow us not to share that." },
      { section: "Butterfly Brand Refresh", score: 0.72, label: "positive", quote: "We unveiled a refreshed brand positioning built around celebrating change... 40 SKUs introduced under the Ideas First series." },
      { section: "Sustainability Commitment", score: 0.85, label: "positive", quote: "We are committing to reducing Scope 1 & 2 greenhouse gas emissions by 50% by 2035." },
      { section: "Closing", score: 0.70, label: "positive", quote: "We are very excited... I personally am very proud that we are able to meet that commitment today." },
    ],
    topQuestions: [
      { question: "Category-wise growth/decline breakdown for fans, pumps and SDA?", frequency: 8, answered: false, sentiment: "negative", analystFirm: "Nomura" },
      { question: "When will seasonal category impact normalize — green shoots in Q2?", frequency: 7, answered: true, sentiment: "neutral", analystFirm: "Nomura" },
      { question: "Solar pumps business model, margins and working capital profile?", frequency: 6, answered: true, sentiment: "positive", analystFirm: "ICICI Securities" },
      { question: "ECD margin attribution — fans underperformance vs peers?", frequency: 6, answered: false, sentiment: "negative", analystFirm: "Independent" },
      { question: "Butterfly double-digit growth guidance still intact after weak Q1?", frequency: 5, answered: true, sentiment: "positive", analystFirm: "Kotak" },
      { question: "New category entry plans — what categories, when?", frequency: 5, answered: false, sentiment: "neutral", analystFirm: "PL Capital" },
      { question: "Solar pumps outlook post PM-KUSUM scheme ending March '26?", frequency: 4, answered: true, sentiment: "positive", analystFirm: "Nuvama" },
      { question: "Seasonal category revenue mix as % of total ECD?", frequency: 4, answered: false, sentiment: "negative", analystFirm: "HDFC Securities" },
      { question: "Greenfield capex timeline and commissioning date?", frequency: 3, answered: false, sentiment: "neutral", analystFirm: "HDFC Securities" },
      { question: "Lighting margin sustainability — structural or one-off?", frequency: 3, answered: true, sentiment: "positive", analystFirm: "Unifi Capital" },
    ],
  },
  {
    ticker: "HAVELLS",
    company: "Havells India",
    quarter: "Q1 FY26",
    date: "2025-07-25",
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
        "EBIT Mgn": "10.2%",
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
      { section: "Q&A - Fans", score: 0.40, label: "neutral", quote: "We are recalibrating our fan strategy... the BEE transition impacted us..." },
      { section: "Q&A - Cables", score: 0.70, label: "positive", quote: "Industrial cables is a strong growth driver backed by infra spending..." },
      { section: "Closing", score: 0.60, label: "positive", quote: "We remain committed to our long-term strategy of premiumization..." },
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
  { quarter: "Q3 FY24", CROMPTON: 0.58, HAVELLS: 0.56 },
  { quarter: "Q4 FY24", CROMPTON: 0.63, HAVELLS: 0.60 },
  { quarter: "Q1 FY25", CROMPTON: 0.61, HAVELLS: 0.57 },
  { quarter: "Q2 FY25", CROMPTON: 0.66, HAVELLS: 0.59 },
  { quarter: "Q3 FY25", CROMPTON: 0.69, HAVELLS: 0.62 },
  { quarter: "Q4 FY25", CROMPTON: 0.65, HAVELLS: 0.61 },
  { quarter: "Q1 FY26", CROMPTON: 0.58, HAVELLS: 0.62 },
];

export const questionGapAnalysis = [
  { topic: "Seasonal Category Revenue Mix", CROMPTON: false, HAVELLS: true, peerAvg: 0.60, priority: "high" as const },
  { topic: "Category-wise Growth Breakdowns", CROMPTON: false, HAVELLS: true, peerAvg: 0.70, priority: "high" as const },
  { topic: "New Category Entry Roadmap", CROMPTON: false, HAVELLS: false, peerAvg: 0.45, priority: "high" as const },
  { topic: "Greenfield Capex Timeline", CROMPTON: false, HAVELLS: true, peerAvg: 0.55, priority: "high" as const },
  { topic: "Solar Pumps Business Model & Margins", CROMPTON: true, HAVELLS: false, peerAvg: 0.40, priority: "medium" as const },
  { topic: "BLDC Market Share & Strategy", CROMPTON: true, HAVELLS: false, peerAvg: 0.50, priority: "medium" as const },
  { topic: "Butterfly Growth Guidance", CROMPTON: true, HAVELLS: false, peerAvg: 0.45, priority: "medium" as const },
  { topic: "Lighting Margin Sustainability", CROMPTON: true, HAVELLS: true, peerAvg: 0.65, priority: "medium" as const },
  { topic: "Sustainability / ESG Commitments", CROMPTON: true, HAVELLS: true, peerAvg: 0.55, priority: "low" as const },
  { topic: "Fan Channel Inventory Levels", CROMPTON: true, HAVELLS: true, peerAvg: 0.60, priority: "low" as const },
];
