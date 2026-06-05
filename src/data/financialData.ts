export interface QuarterFin {
  q: string;
  revenue: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
  ebitda: number;
  eps: number;
  ocf: number;
  fcf: number;
  capex: number;
}

export interface AnnualFin {
  year: string;
  revenue: number;
  grossProfit: number;
  operatingIncome: number;
  netIncome: number;
  ebitda: number;
  eps: number;
  ocf: number;
  fcf: number;
  capex: number;
  totalAssets: number;
  totalLiabilities: number;
  totalDebt: number;
  cash: number;
  equity: number;
  shares: number;
}

export interface CompanyFinancials {
  ticker: string;
  currency: string;
  quarters: QuarterFin[];
  annuals: AnnualFin[];
  scores: {
    overall: number;
    growth: number;
    profitability: number;
    liquidity: number;
    leverage: number;
  };
  summary: string;
  trends: { label: string; type: "positive" | "negative" | "neutral"; note: string }[];
  callVsReality: { claim: string; validation: string; verdict: "confirmed" | "mismatch" | "partial" }[];
  bullish: string[];
  bearish: string[];
  risks: string[];
  opportunities: string[];
  rating: "Strong Buy" | "Buy" | "Hold" | "Weak Hold" | "Sell";
  confidence: number;
  thesis: {
    strengths: string;
    weaknesses: string;
    outlook: string;
    risk: string;
  };
}

export const financials: Record<string, CompanyFinancials> = {
  CROMPTON: {
    ticker: "CROMPTON",
    currency: "₹ Cr",
    quarters: [
      { q: "Q2 FY23", revenue: 1620, grossProfit: 502, operatingIncome: 162, netIncome: 110, ebitda: 195, eps: 1.7, ocf: 140, fcf: 110, capex: 30 },
      { q: "Q3 FY23", revenue: 1495, grossProfit: 449, operatingIncome: 134, netIncome: 92, ebitda: 168, eps: 1.4, ocf: 125, fcf: 95, capex: 30 },
      { q: "Q4 FY23", revenue: 1740, grossProfit: 539, operatingIncome: 174, netIncome: 118, ebitda: 210, eps: 1.8, ocf: 155, fcf: 120, capex: 35 },
      { q: "Q1 FY24", revenue: 1825, grossProfit: 574, operatingIncome: 185, netIncome: 128, ebitda: 222, eps: 2.0, ocf: 170, fcf: 130, capex: 40 },
      { q: "Q2 FY24", revenue: 1690, grossProfit: 524, operatingIncome: 158, netIncome: 108, ebitda: 195, eps: 1.7, ocf: 145, fcf: 110, capex: 35 },
      { q: "Q3 FY24", revenue: 1580, grossProfit: 489, operatingIncome: 142, netIncome: 96, ebitda: 175, eps: 1.5, ocf: 130, fcf: 95, capex: 35 },
      { q: "Q4 FY24", revenue: 1860, grossProfit: 580, operatingIncome: 186, netIncome: 130, ebitda: 224, eps: 2.0, ocf: 175, fcf: 135, capex: 40 },
      { q: "Q1 FY25", revenue: 1910, grossProfit: 602, operatingIncome: 198, netIncome: 138, ebitda: 236, eps: 2.1, ocf: 180, fcf: 140, capex: 40 },
      { q: "Q2 FY25", revenue: 1755, grossProfit: 547, operatingIncome: 165, netIncome: 114, ebitda: 202, eps: 1.8, ocf: 150, fcf: 115, capex: 35 },
      { q: "Q3 FY25", revenue: 1665, grossProfit: 519, operatingIncome: 150, netIncome: 103, ebitda: 185, eps: 1.6, ocf: 140, fcf: 105, capex: 35 },
      { q: "Q4 FY25", revenue: 1925, grossProfit: 606, operatingIncome: 195, netIncome: 135, ebitda: 234, eps: 2.1, ocf: 180, fcf: 140, capex: 40 },
      { q: "Q1 FY26", revenue: 1819, grossProfit: 564, operatingIncome: 155, netIncome: 125, ebitda: 215, eps: 1.95, ocf: 165, fcf: 130, capex: 35 },
    ],
    annuals: [
      { year: "FY21", revenue: 4825, grossProfit: 1488, operatingIncome: 543, netIncome: 395, ebitda: 615, eps: 6.2, ocf: 490, fcf: 380, capex: 110, totalAssets: 3120, totalLiabilities: 1640, totalDebt: 580, cash: 410, equity: 1480, shares: 63.6 },
      { year: "FY22", revenue: 5740, grossProfit: 1773, operatingIncome: 638, netIncome: 458, ebitda: 720, eps: 7.2, ocf: 555, fcf: 430, capex: 125, totalAssets: 3580, totalLiabilities: 1820, totalDebt: 620, cash: 470, equity: 1760, shares: 64.0 },
      { year: "FY23", revenue: 7065, grossProfit: 2185, operatingIncome: 712, netIncome: 502, ebitda: 815, eps: 7.9, ocf: 620, fcf: 470, capex: 150, totalAssets: 4860, totalLiabilities: 2660, totalDebt: 880, cash: 520, equity: 2200, shares: 63.5 },
      { year: "FY24", revenue: 7575, grossProfit: 2348, operatingIncome: 728, netIncome: 510, ebitda: 838, eps: 7.95, ocf: 660, fcf: 490, capex: 170, totalAssets: 5180, totalLiabilities: 2680, totalDebt: 750, cash: 615, equity: 2500, shares: 64.2 },
      { year: "FY25", revenue: 8255, grossProfit: 2582, operatingIncome: 815, netIncome: 580, ebitda: 932, eps: 9.05, ocf: 730, fcf: 555, capex: 175, totalAssets: 5520, totalLiabilities: 2520, totalDebt: 460, cash: 720, equity: 3000, shares: 64.2 },
    ],
    scores: { overall: 78, growth: 68, profitability: 75, liquidity: 88, leverage: 92 },
    summary:
      "Revenue grew 9% YoY in FY25 with EBIT margin expanding ~60bps to 9.9%. Free cash flow rose 13% and the company turned net-cash positive after repaying ₹300 Cr NCD in Q1 FY26. Q1 FY26 saw a soft top-line due to a weak seasonal quarter, but profitability remains intact and lighting/solar pumps are accelerating. Overall financial health is improving despite cyclical headwinds in fans and pumps.",
    trends: [
      { label: "Revenue Growth Decelerating", type: "negative", note: "Quarterly YoY growth slowed from +11% to -5% over four quarters." },
      { label: "Margin Expansion (Lighting)", type: "positive", note: "Lighting segment EBIT margin expanded 370bps to 12.6%." },
      { label: "Debt Reduction", type: "positive", note: "Total debt down ₹290 Cr in FY25; now zero-debt at standalone level." },
      { label: "Cash Build-up", type: "positive", note: "Cash & equivalents grew 17% YoY to ₹720 Cr." },
      { label: "Improving Profitability", type: "positive", note: "FY25 EBIT margin expanded ~60bps; PAT up 14%." },
      { label: "Seasonal Volatility", type: "neutral", note: "Q1/Q3 remain structurally weaker — channel inventory clearing." },
    ],
    callVsReality: [
      { claim: "Performance ahead of industry in various categories.", validation: "ECD declined 8% vs industry decline of 11% — confirmed share gains.", verdict: "confirmed" },
      { claim: "Solar pumps business doubled YoY.", validation: "Order book including ₹101 Cr MEDA single order supports 2x trajectory.", verdict: "confirmed" },
      { claim: "Demand for BLDC fans outweighing supply.", validation: "Premium fan revenue mix up; full validation requires Q2 volume data.", verdict: "partial" },
      { claim: "Butterfly double-digit growth guidance intact.", validation: "Q1 Butterfly grew only 3% — guidance looks stretched for H1.", verdict: "mismatch" },
      { claim: "Lighting margin improvement is structural.", validation: "Margin up 370bps to 12.6% on B2C mix shift — confirmed.", verdict: "confirmed" },
      { claim: "Zero-debt status achieved.", validation: "₹300 Cr NCD repaid; balance sheet confirms net cash position.", verdict: "confirmed" },
    ],
    bullish: [
      "Solar pumps order book doubling YoY with PM-KUSUM tailwind",
      "Lighting EBIT margin expansion of 370bps is structural",
      "Zero-debt balance sheet with ₹720 Cr cash provides M&A optionality",
      "BLDC fan premium portfolio gaining share — #2 player aiming for #1",
    ],
    bearish: [
      "Q1 FY26 revenue down 5% YoY — first quarterly decline in 8 quarters",
      "Butterfly H1 growth lagging double-digit guidance",
      "Seasonal categories (TPW, coolers, residential pumps) structurally exposed to monsoon",
      "Management refusal to disclose category-wise mix limits forecasting confidence",
    ],
    risks: [
      "PM-KUSUM scheme ending March '26 — solar pumps demand cliff risk",
      "Channel fan inventory yet to fully clear",
      "Heavy dependence on weather-led seasonal categories",
    ],
    opportunities: [
      "Greenfield manufacturing facility (₹350 Cr capex) unlocks export potential",
      "Solar rooftop entry — adjacency with strong margin profile",
      "Butterfly brand refresh + 40 new SKUs ramping into H2",
      "Strong net-cash position enables inorganic growth",
    ],
    rating: "Buy",
    confidence: 72,
    thesis: {
      strengths:
        "Best-in-class balance sheet (zero debt, ₹720 Cr cash), expanding lighting margins, and a doubling solar pumps franchise.",
      weaknesses:
        "Core fans business losing absolute revenue, weak disclosure cadence, and Butterfly integration still margin-dilutive.",
      outlook:
        "FY26 likely a year of two halves — H1 muted on seasonality, H2 acceleration led by lighting, BLDC fans and solar pumps. FY27 setup remains attractive.",
      risk:
        "Subsidy roll-off in solar pumps and prolonged weakness in TPW/coolers are the two largest near-term swing factors.",
    },
  },
  HAVELLS: {
    ticker: "HAVELLS",
    currency: "₹ Cr",
    quarters: [
      { q: "Q2 FY23", revenue: 3895, grossProfit: 1245, operatingIncome: 365, netIncome: 256, ebitda: 425, eps: 4.1, ocf: 320, fcf: 235, capex: 85 },
      { q: "Q3 FY23", revenue: 3640, grossProfit: 1175, operatingIncome: 320, netIncome: 224, ebitda: 380, eps: 3.6, ocf: 290, fcf: 210, capex: 80 },
      { q: "Q4 FY23", revenue: 4205, grossProfit: 1352, operatingIncome: 415, netIncome: 290, ebitda: 478, eps: 4.6, ocf: 360, fcf: 270, capex: 90 },
      { q: "Q1 FY24", revenue: 4115, grossProfit: 1325, operatingIncome: 395, netIncome: 277, ebitda: 458, eps: 4.4, ocf: 345, fcf: 255, capex: 90 },
      { q: "Q2 FY24", revenue: 3955, grossProfit: 1265, operatingIncome: 375, netIncome: 263, ebitda: 435, eps: 4.2, ocf: 325, fcf: 240, capex: 85 },
      { q: "Q3 FY24", revenue: 3725, grossProfit: 1200, operatingIncome: 335, netIncome: 232, ebitda: 395, eps: 3.7, ocf: 300, fcf: 220, capex: 80 },
      { q: "Q4 FY24", revenue: 4310, grossProfit: 1390, operatingIncome: 432, netIncome: 302, ebitda: 495, eps: 4.8, ocf: 375, fcf: 280, capex: 95 },
      { q: "Q1 FY25", revenue: 4180, grossProfit: 1340, operatingIncome: 405, netIncome: 282, ebitda: 470, eps: 4.5, ocf: 355, fcf: 260, capex: 95 },
      { q: "Q2 FY25", revenue: 4045, grossProfit: 1295, operatingIncome: 380, netIncome: 265, ebitda: 442, eps: 4.2, ocf: 335, fcf: 245, capex: 90 },
      { q: "Q3 FY25", revenue: 3820, grossProfit: 1225, operatingIncome: 345, netIncome: 238, ebitda: 408, eps: 3.8, ocf: 310, fcf: 225, capex: 85 },
      { q: "Q4 FY25", revenue: 4415, grossProfit: 1420, operatingIncome: 442, netIncome: 308, ebitda: 510, eps: 4.9, ocf: 385, fcf: 285, capex: 100 },
      { q: "Q1 FY26", revenue: 4520, grossProfit: 1455, operatingIncome: 461, netIncome: 320, ebitda: 525, eps: 5.1, ocf: 395, fcf: 290, capex: 105 },
    ],
    annuals: [
      { year: "FY21", revenue: 10428, grossProfit: 3350, operatingIncome: 1240, netIncome: 1044, ebitda: 1455, eps: 16.7, ocf: 1180, fcf: 880, capex: 300, totalAssets: 9420, totalLiabilities: 3850, totalDebt: 285, cash: 2160, equity: 5570, shares: 62.6 },
      { year: "FY22", revenue: 13888, grossProfit: 4445, operatingIncome: 1535, netIncome: 1196, ebitda: 1795, eps: 19.1, ocf: 1300, fcf: 950, capex: 350, totalAssets: 10650, totalLiabilities: 4180, totalDebt: 320, cash: 1450, equity: 6470, shares: 62.7 },
      { year: "FY23", revenue: 16910, grossProfit: 5410, operatingIncome: 1550, netIncome: 1075, ebitda: 1850, eps: 17.2, ocf: 1380, fcf: 1010, capex: 370, totalAssets: 11820, totalLiabilities: 4550, totalDebt: 360, cash: 1380, equity: 7270, shares: 62.7 },
      { year: "FY24", revenue: 18589, grossProfit: 5950, operatingIncome: 1845, netIncome: 1276, ebitda: 2190, eps: 20.3, ocf: 1610, fcf: 1180, capex: 430, totalAssets: 13420, totalLiabilities: 5010, totalDebt: 290, cash: 1620, equity: 8410, shares: 62.7 },
      { year: "FY25", revenue: 21610, grossProfit: 6925, operatingIncome: 2185, netIncome: 1492, ebitda: 2565, eps: 23.8, ocf: 1850, fcf: 1360, capex: 490, totalAssets: 15280, totalLiabilities: 5320, totalDebt: 240, cash: 1880, equity: 9960, shares: 62.7 },
    ],
    scores: { overall: 80, growth: 78, profitability: 72, liquidity: 90, leverage: 95 },
    summary:
      "FY25 revenue up 16%, driven by Lloyd (+25%) and cables (+12%). Operating margin sits around 10%, with Lloyd dilution offsetting strong switchgear and cable profitability. Balance sheet remains pristine — near-zero debt and ₹1,880 Cr cash. Q1 FY26 shows continued momentum at +8% YoY revenue, with brand spend driving long-term recall but compressing near-term EBIT.",
    trends: [
      { label: "Revenue Accelerating", type: "positive", note: "Q1 FY26 +8% YoY with Lloyd +25%." },
      { label: "Margin Compression (Lloyd)", type: "negative", note: "Lloyd EBIT margin down ~200bps on peak-season discounting." },
      { label: "Cash Build-up", type: "positive", note: "Cash grew 16% YoY to ₹1,880 Cr." },
      { label: "Debt Declining", type: "positive", note: "Total debt down to ₹240 Cr, essentially debt-free." },
      { label: "Brand Investment Up", type: "neutral", note: "Brand spend up 18% — long-term positive, near-term P&L drag." },
      { label: "Improving Profitability (Cables)", type: "positive", note: "Industrial cables margin holding firm despite RM volatility." },
    ],
    callVsReality: [
      { claim: "Diversified portfolio delivering resilient performance.", validation: "FY25 revenue +16%, EBITDA +17% — confirmed.", verdict: "confirmed" },
      { claim: "Lloyd margins will normalize in H2 FY26.", validation: "No evidence yet — Q1 margins still under pressure.", verdict: "partial" },
      { claim: "Cables driven by infra spending tailwinds.", validation: "Cables +12% with order book +30% — confirmed.", verdict: "confirmed" },
      { claim: "Fans recalibration underway.", validation: "Fans growing 8% vs industry 14% — recalibration not yet visible.", verdict: "mismatch" },
      { claim: "Brand investments driving recall scores.", validation: "Brand spend up 18% but ROI yet to show in volume share gains.", verdict: "partial" },
    ],
    bullish: [
      "Lloyd AC market share gains of 150bps (now #3)",
      "Cables order book +30% YoY on infra capex cycle",
      "Switchgear premium mix at 40% of segment revenue",
      "Strong distribution moat — adding 3 EBOs/day",
    ],
    bearish: [
      "Lloyd margins compressed 200bps — recovery timeline uncertain",
      "Fans business growing below industry — share loss",
      "Brand spend up 18% is straining near-term EBIT",
    ],
    risks: [
      "Lloyd margin recovery is the single largest swing factor for FY26 EPS",
      "RM (copper/aluminium) volatility on cables",
      "Premium consumer demand sensitivity to interest rates",
    ],
    opportunities: [
      "Premium switchgear pricing power",
      "Cables export ramp",
      "Lloyd reaching #2 in room AC over 2-3 years",
      "Distribution expansion — 1,100 EBO target",
    ],
    rating: "Buy",
    confidence: 68,
    thesis: {
      strengths:
        "Diversified portfolio, pristine balance sheet, market-share gains in Lloyd, and premium switchgear/cables franchises.",
      weaknesses:
        "Lloyd margin volatility, fan share loss, and elevated brand spend pressuring near-term operating leverage.",
      outlook:
        "Mid-teens revenue growth sustainable, but EBIT margin recovery hinges on H2 FY26 Lloyd normalization.",
      risk: "If Lloyd margins do not normalize by Q4 FY26, consensus EPS estimates carry 8-10% downside.",
    },
  },
};
