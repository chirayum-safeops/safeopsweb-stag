import { useState, useEffect } from "react";
import { Globe, Server, Database, AlertTriangle, ShieldAlert, KeyRound } from "lucide-react";

const ATTACK_PATH = [
  { label: "Internet Attacker", icon: Globe, status: "origin" },
  { label: "API Gateway", icon: Server, status: "compromised" },
  { label: "Web Application", icon: ShieldAlert, status: "exploited" },
  { label: "Database", icon: Database, status: "target" },
];

const SIMULATION_RESULTS = [
  { finding: "SQL Injection", status: "Exploitable", severity: "critical" },
  { finding: "Broken Authentication", status: "High Risk", severity: "high" },
  { finding: "Privilege Escalation", status: "Critical", severity: "critical" },
  { finding: "Insecure API Endpoint", status: "Medium Risk", severity: "medium" },
];

const SlideTwoDashboard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [resultsRevealed, setResultsRevealed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % ATTACK_PATH.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timers = SIMULATION_RESULTS.map((_, i) =>
      setTimeout(() => setResultsRevealed(i + 1), 400 + i * 350)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5 relative shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-foreground">Attack Path Simulation</span>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-severity-critical" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-severity-critical" />
          </span>
          <span className="text-xs text-muted-foreground font-mono">Simulating</span>
        </div>
      </div>

      {/* Attack Path Diagram */}
      <div className="flex flex-col items-center gap-0">
        {ATTACK_PATH.map((node, i) => {
          const Icon = node.icon;
          const isActive = i <= activeStep;
          const isCurrent = i === activeStep;
          return (
            <div key={node.label} className="flex flex-col items-center">
              <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-all duration-500 w-56 ${
                isCurrent
                  ? "border-severity-critical/50 bg-severity-critical/10 shadow-[0_0_12px_hsl(0_84%_60%/0.15)]"
                  : isActive
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-muted"
              }`}>
                <Icon className={`h-4 w-4 transition-colors duration-300 ${
                  isCurrent ? "text-severity-critical" : isActive ? "text-primary" : "text-muted-foreground"
                }`} />
                <span className={`text-xs font-medium transition-colors duration-300 ${
                  isCurrent ? "text-severity-critical" : isActive ? "text-foreground" : "text-muted-foreground"
                }`}>{node.label}</span>
                {isCurrent && (
                  <AlertTriangle className="h-3 w-3 text-severity-critical ml-auto animate-pulse" />
                )}
              </div>
              {i < ATTACK_PATH.length - 1 && (
                <div className={`w-px h-4 transition-colors duration-500 ${
                  i < activeStep ? "bg-primary/40" : "bg-border"
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Simulation Results */}
      <div className="space-y-2 mt-2">
        <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Attack Simulation Results</span>
        <div className="space-y-1.5">
          {SIMULATION_RESULTS.map((result, i) => (
            <div
              key={result.finding}
              className={`flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted transition-all duration-300 ${
                i < resultsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <KeyRound className={`h-3.5 w-3.5 ${
                  result.severity === "critical" ? "text-severity-critical" : result.severity === "high" ? "text-severity-high" : "text-severity-medium"
                }`} />
                <span className="text-xs font-medium text-foreground">{result.finding}</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                result.severity === "critical"
                  ? "bg-severity-critical/10 text-severity-critical"
                  : result.severity === "high"
                  ? "bg-severity-high/10 text-severity-high"
                  : "bg-severity-medium/10 text-severity-medium"
              }`}>{result.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-3 mt-3">
        {[
          { label: "Attack Vectors", value: "24" },
          { label: "Exploitable", value: "7" },
          { label: "Mean Time", value: "4.2s" },
        ].map(stat => (
          <div key={stat.label} className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-bold font-mono text-foreground">{stat.value}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideTwoDashboard;
