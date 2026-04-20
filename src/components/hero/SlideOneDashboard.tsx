import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, Bug, Shield, Server } from "lucide-react";

const SEVERITY_DATA = [
  { label: "Critical", count: 3, color: "bg-severity-critical", percent: 25 },
  { label: "High", count: 8, color: "bg-severity-high", percent: 40 },
  { label: "Medium", count: 14, color: "bg-severity-medium", percent: 60 },
  { label: "Low", count: 22, color: "bg-severity-low", percent: 80 },
];

const FINDINGS = [
  { title: "SQL Injection — Authentication Bypass", endpoint: "POST /api/v2/auth/login", param: "username", cvss: "9.8", icon: AlertTriangle },
  { title: "XSS — Stored Script Injection", endpoint: "POST /api/v1/comments", param: "body", cvss: "7.4", icon: Bug },
  { title: "IDOR — Unauthorized Data Access", endpoint: "GET /api/v2/users/:id", param: "id", cvss: "8.1", icon: Shield },
  { title: "SSRF — Internal Service Exposure", endpoint: "POST /api/v1/webhooks", param: "callback_url", cvss: "8.6", icon: Server },
];

const PIPELINE_STAGES = ["Source Code", "CI/CD", "Cloud", "Kubernetes", "Application"];

const SlideOneDashboard = () => {
  const [barWidths, setBarWidths] = useState<number[]>([0, 0, 0, 0]);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [currentFinding, setCurrentFinding] = useState(0);
  const [findingVisible, setFindingVisible] = useState(true);
  const [pipelineStage, setPipelineStage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [highlightedStat, setHighlightedStat] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBarWidths(SEVERITY_DATA.map(d => d.percent));
    }, 300);
    const duration = 800;
    const steps = 20;
    const interval = duration / steps;
    let step = 0;
    const countInterval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(SEVERITY_DATA.map(d => Math.round(d.count * eased)));
      if (step >= steps) clearInterval(countInterval);
    }, interval);
    return () => { clearTimeout(timer); clearInterval(countInterval); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFindingVisible(false);
      setTimeout(() => {
        setCurrentFinding(prev => (prev + 1) % FINDINGS.length);
        setFindingVisible(true);
      }, 300);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineStage(prev => (prev + 1) % PIPELINE_STAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCardHover = useCallback(() => {
    setIsHovered(true);
    setHighlightedStat(Math.floor(Math.random() * 3));
  }, []);

  const handleCardLeave = useCallback(() => {
    setIsHovered(false);
    setHighlightedStat(null);
  }, []);

  const finding = FINDINGS[currentFinding];
  const FindingIcon = finding.icon;

  return (
    <div
      className={`bg-card border border-border rounded-xl p-6 space-y-4 relative shadow-lg transition-all duration-300 ${isHovered ? "-translate-y-1 shadow-xl" : ""}`}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-foreground">Agent Activity</span>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'hsl(142 71% 45%)' }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'hsl(142 76% 36%)' }} />
          </span>
          <span className="text-xs text-muted-foreground font-mono">Agent Active</span>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-4 px-1">
        {PIPELINE_STAGES.map((stage, i) => (
          <div key={stage} className="flex items-center flex-1">
            <div className={`flex flex-col items-center flex-1 transition-all duration-500 ${i === pipelineStage ? "scale-105" : ""}`}>
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${i === pipelineStage ? "bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.4)]" : i < pipelineStage ? "bg-primary/40" : "bg-border"}`} />
              <span className={`text-[9px] mt-1 transition-colors duration-300 whitespace-nowrap ${i === pipelineStage ? "text-primary font-medium" : "text-muted-foreground"}`}>{stage}</span>
            </div>
            {i < PIPELINE_STAGES.length - 1 && (
              <div className={`h-px flex-1 -mt-3 transition-colors duration-500 ${i < pipelineStage ? "bg-primary/30" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {SEVERITY_DATA.map((item, i) => (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-mono text-foreground">{counts[i]}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full ${item.color} rounded-full transition-all duration-[800ms] ease-out`} style={{ width: `${barWidths[i]}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-4 p-4 bg-muted rounded-lg border border-border space-y-2 transition-all duration-300 ${findingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FindingIcon className="h-4 w-4 text-severity-critical" />
            <span className="text-sm font-semibold text-foreground">{finding.title}</span>
          </div>
          
        </div>
        <p className="text-xs text-muted-foreground">{finding.endpoint} — Parameter: {finding.param}</p>
        <div className="flex gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-severity-critical/10 text-severity-critical">CVSS {finding.cvss}</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">Exploitable</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { label: "AI Agents", value: "47" },
          { label: "Autonomous Scans", value: "99%" },
          { label: "Risk Score", value: "6.2" },
        ].map((stat, i) => (
          <div key={stat.label} className={`text-center p-3 bg-muted rounded-lg transition-all duration-300 ${highlightedStat === i ? "ring-1 ring-primary/30 bg-primary/[0.04]" : ""}`}>
            <div className="text-lg font-bold font-mono text-foreground">{stat.value}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideOneDashboard;
