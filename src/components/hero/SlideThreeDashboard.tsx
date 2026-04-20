import { useState, useEffect } from "react";
import { GitBranch, Box, Cloud, Shield, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

const PIPELINE_STEPS = [
  { label: "GitHub", icon: GitBranch, status: "passed" },
  { label: "CI/CD", icon: Box, status: "scanning" },
  { label: "Build", icon: Box, status: "pending" },
  { label: "Deploy", icon: Cloud, status: "pending" },
  { label: "Production", icon: Shield, status: "pending" },
];

const SCAN_RESULTS = [
  { label: "GitHub Scan", status: "Completed", icon: CheckCircle2, statusColor: "text-green-500" },
  { label: "Docker Image Vulnerability", status: "3 Found", icon: AlertTriangle, statusColor: "text-severity-high" },
  { label: "API Security Testing", status: "In Progress", icon: Shield, statusColor: "text-primary" },
  { label: "Cloud Misconfiguration", status: "2 Critical", icon: XCircle, statusColor: "text-severity-critical" },
];



const SlideThreeDashboard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [resultsRevealed, setResultsRevealed] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % PIPELINE_STEPS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timers = SCAN_RESULTS.map((_, i) =>
      setTimeout(() => setResultsRevealed(i + 1), 500 + i * 400)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress(prev => (prev >= 100 ? 0 : prev + 2));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5 relative shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-foreground">Pipeline Security Status</span>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'hsl(142 71% 45%)' }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'hsl(142 76% 36%)' }} />
          </span>
          <span className="text-xs text-muted-foreground font-mono">Monitoring</span>
        </div>
      </div>

      {/* Pipeline visualization */}
      <div className="relative">
        <div className="flex items-center justify-between px-2">
          {PIPELINE_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === activeStep;
            const isPassed = i < activeStep;
            return (
              <div key={step.label} className="flex flex-col items-center relative z-10">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                    : isPassed
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className={`text-[9px] mt-1.5 transition-colors duration-300 whitespace-nowrap ${
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                }`}>{step.label}</span>
              </div>
            );
          })}
        </div>
        {/* connecting line */}
        <div className="absolute top-[18px] left-8 right-8 h-px bg-border" />
        <div
          className="absolute top-[18px] left-8 h-px bg-primary/50 transition-all duration-500"
          style={{ width: `${(activeStep / (PIPELINE_STEPS.length - 1)) * 100}%`, maxWidth: 'calc(100% - 64px)' }}
        />
        {/* SafeOps branch */}
        <div className="flex justify-center mt-3">
          <div className="flex flex-col items-center">
            <div className="w-px h-4 bg-primary/30" />
            <div className="px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-semibold text-primary">SafeOps Scan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scan progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px]">
          <span className="text-muted-foreground">Scanning pipeline...</span>
          <span className="font-mono text-primary">{Math.min(scanProgress, 100)}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-100 ease-linear" style={{ width: `${Math.min(scanProgress, 100)}%` }} />
        </div>
      </div>

      {/* Scan Results */}
      <div className="space-y-1.5">
        {SCAN_RESULTS.map((result, i) => {
          const Icon = result.icon;
          return (
            <div
              key={result.label}
              className={`flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted transition-all duration-300 ${
                i < resultsRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`h-3.5 w-3.5 ${result.statusColor}`} />
                <span className="text-xs font-medium text-foreground">{result.label}</span>
              </div>
              <span className={`text-[10px] font-mono ${result.statusColor}`}>{result.status}</span>
            </div>
          );
        })}
      </div>

      {/* Tool logos */}
      <div className="flex items-center justify-between px-2 pt-1">
        {[
          { name: "GitHub", color: "#24292f", darkColor: "#f0f0f0", path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
          { name: "GitLab", color: "#FC6D26", path: "M21.94 13.11l-1.05-3.22-2.09-6.44a.42.42 0 00-.8 0l-2.09 6.44H8.09L6 3.45a.42.42 0 00-.8 0L3.11 9.89 2.06 13.11a.8.8 0 00.29.89l9.65 7.01 9.65-7.01a.8.8 0 00.29-.89z" },
          { name: "Jenkins", color: "#D33833", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5v-2h2v2h-2zm2.07-6.62l-.9.92C11.45 12.5 11 13.17 11 14h2c0-.55.45-1.08.82-1.45l1.24-1.26c.37-.36.54-.87.54-1.29 0-1.38-1.12-2.5-2.5-2.5S10.6 8.62 10.6 10h2c0-.55.45-1 1-1s1 .45 1 1-.23.64-.53.88z" },
          { name: "Kubernetes", color: "#326CE5", path: "M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 01-2.075-2.597l2.578-.437.004.005a.44.44 0 01.485.606zm-.833-2.129a.44.44 0 00.173-.756l.002-.011L7.585 9.7a5.143 5.143 0 00-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 00.699-.337l-.01-.012.15-2.62a5.144 5.144 0 00-3.01 1.442l2.168 1.527h.003zm2.67 0l2.168-1.527a5.145 5.145 0 00-3.01-1.442l.15 2.62-.01.012a.44.44 0 00.7.337h.002zm1.812 2.129l2.514.725a5.143 5.143 0 00-.73-3.255l-1.96 1.754.002.011a.44.44 0 00.174.756v.009zm-.96 2.114l2.578.437a5.171 5.171 0 01-2.075 2.597l-.999-2.413.007-.01a.44.44 0 01.49-.611zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 14.5c-2.485 0-4.5-2.015-4.5-4.5S9.515 7.5 12 7.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z" },
          { name: "AWS", color: "#FF9900", path: "M6.763 10.036a7.77 7.77 0 00.044 1.164c.028.187.068.376.12.562.065.186.13.362.196.527a.73.73 0 01.074.27.39.39 0 01-.192.335l-.635.423a.48.48 0 01-.261.08.41.41 0 01-.335-.187 3.43 3.43 0 01-.402-.522 4.61 4.61 0 01-.345-.659 4.316 4.316 0 01-3.424 1.607c-.982 0-1.764-.28-2.34-.84-.577-.56-.866-1.305-.866-2.236 0-.99.348-1.792 1.05-2.403.7-.61 1.633-.916 2.807-.916.39 0 .79.03 1.205.094.415.063.844.157 1.293.28v-.853c0-.885-.186-1.504-.555-1.863-.374-.359-1.007-.537-1.904-.537-.41 0-.83.05-1.262.148a9.35 9.35 0 00-1.262.399 3.37 3.37 0 01-.41.168.62.62 0 01-.168.028c-.15 0-.224-.106-.224-.322V3.92c0-.168.02-.293.066-.373a.74.74 0 01.298-.224 6.16 6.16 0 011.456-.486A7.286 7.286 0 017.508 2.7c1.34 0 2.32.305 2.946.914.62.61.932 1.54.932 2.79v3.632h.377zm12.86 2.882c.065.186.13.362.196.527a.73.73 0 01.074.27.39.39 0 01-.192.335l-.635.423a.48.48 0 01-.261.08.41.41 0 01-.335-.187M14.635 21.35c1.603-.717 3.015-1.68 4.178-2.822.22-.217.41-.084.307.178a12.526 12.526 0 01-4.554 3.037c-.248.106-.465-.063-.178-.228l.247-.165zm1.405-.84c.314-.395.64-.834.903-1.212.14-.2.324-.12.268.106-.374 1.505-.898 2.17-1.42 2.612-.16.135-.315.035-.22-.168.162-.345.313-.82.47-1.338z" },
        ].map(tool => (
          <div key={tool.name} className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-md bg-muted border border-border flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill={tool.name === "GitHub" ? "currentColor" : tool.color}>
                <path d={tool.path} />
              </svg>
            </div>
            <span className="text-[8px] text-muted-foreground">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideThreeDashboard;
