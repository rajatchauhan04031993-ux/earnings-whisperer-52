import { cn } from "@/lib/utils";

interface SentimentGaugeProps {
  value: number; // -1 to 1
  label: string;
  size?: "sm" | "md" | "lg";
}

export const SentimentGauge = ({ value, label, size = "md" }: SentimentGaugeProps) => {
  const percentage = ((value + 1) / 2) * 100;
  const getSentimentColor = () => {
    if (value > 0.3) return "text-positive";
    if (value < -0.3) return "text-negative";
    return "text-neutral-sentiment";
  };
  const getSentimentLabel = () => {
    if (value > 0.6) return "Very Positive";
    if (value > 0.3) return "Positive";
    if (value > -0.3) return "Neutral";
    if (value > -0.6) return "Negative";
    return "Very Negative";
  };

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-28 h-28",
    lg: "w-36 h-36",
  };

  const radius = size === "sm" ? 32 : size === "md" ? 46 : 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${(radius + 8) * 2} ${(radius + 8) * 2}`}>
          <circle
            cx={radius + 8}
            cy={radius + 8}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="6"
          />
          <circle
            cx={radius + 8}
            cy={radius + 8}
            r={radius}
            fill="none"
            stroke={value > 0.3 ? "hsl(var(--chart-positive))" : value < -0.3 ? "hsl(var(--chart-negative))" : "hsl(var(--chart-neutral))"}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-mono font-bold", getSentimentColor(), size === "sm" ? "text-lg" : size === "md" ? "text-2xl" : "text-3xl")}>
            {(value * 100).toFixed(0)}
          </span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      <span className={cn("text-xs font-medium", getSentimentColor())}>{getSentimentLabel()}</span>
    </div>
  );
};
