import { useState, useCallback, useRef, useEffect } from "react";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Shield,
  Search,
  Target,
  ClipboardList,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import DashboardSlider from "@/components/DashboardSlider";

const severityData = [
  { name: "Critical", value: 3, color: "hsl(var(--severity-critical))" },
  { name: "High", value: 8, color: "hsl(var(--severity-high))" },
  { name: "Medium", value: 14, color: "hsl(var(--severity-medium))" },
  { name: "Low", value: 22, color: "hsl(var(--severity-low))" },
];

interface ReportSection {
  id: string;
  title: string;
  icon: React.ElementType;
  insight: string;
  leftEffect: "metrics" | "chart" | "finding" | "remediation" | "default";
  highlightSegments?: number[];
}

const reportSections: ReportSection[] = [
  {
    id: "injection",
    title: "Injection & Code Execution Attacks",
    icon: AlertTriangle,
    insight:
      "Examples include SQL injection, command injection, and server-side template injection caused by improper input validation.",
    leftEffect: "finding",
  },
  {
    id: "auth",
    title: "Broken Authentication & Session Weaknesses",
    icon: Shield,
    insight:
      "Credential bypass, session hijacking, token manipulation, and authentication flaws.",
    leftEffect: "metrics",
  },
  {
    id: "access",
    title: "Access Control & Authorization Failures",
    icon: Target,
    insight:
      "Privilege escalation, IDOR vulnerabilities, and unauthorized access to restricted resources.",
    leftEffect: "finding",
  },
  {
    id: "logic",
    title: "Business Logic & Workflow Exploits",
    icon: ClipboardList,
    insight:
      "Manipulation of application workflows such as payment bypass, order manipulation, or privilege abuse.",
    leftEffect: "remediation",
  },
  {
    id: "api",
    title: "API Security Vulnerabilities",
    icon: Search,
    insight:
      "Improper API authorization, excessive data exposure, mass assignment, and insecure endpoints.",
    leftEffect: "chart",
  },
  {
    id: "data",
    title: "Sensitive Data Exposure & Cryptographic Risks",
    icon: FileText,
    insight:
      "Exposure of PII, weak encryption implementations, and insecure data storage practices.",
    leftEffect: "metrics",
  },
  {
    id: "cloud",
    title: "Cloud, Infrastructure & Container Misconfigurations",
    icon: BarChart3,
    insight:
      "Insecure cloud permissions, exposed services, container vulnerabilities, and Kubernetes security issues.",
    leftEffect: "chart",
  },
  {
    id: "secrets",
    title: "Secrets Exposure & Configuration Weaknesses",
    icon: TrendingUp,
    insight:
      "Hardcoded credentials, exposed tokens, environment variable leaks, and insecure configuration practices.",
    leftEffect: "remediation",
  },
];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: "drop-shadow(0 0 6px rgba(0,0,0,0.15))", transition: "all 0.3s ease" }}
      />
    </g>
  );
};

const DeliverablesSection = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 });
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [activeChartIndex, setActiveChartIndex] = useState<number | undefined>(undefined);
  const [animatingSegment, setAnimatingSegment] = useState(0);
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentSection = reportSections.find((s) => s.id === hoveredSection);

  // Chart segment animation when hovering chart-related sections
  useEffect(() => {
    if (currentSection?.leftEffect === "chart") {
      let idx = 0;
      setActiveChartIndex(0);
      animationRef.current = setInterval(() => {
        idx = (idx + 1) % severityData.length;
        setActiveChartIndex(idx);
        setAnimatingSegment(idx);
      }, 600);
      return () => {
        if (animationRef.current) clearInterval(animationRef.current);
      };
    } else {
      setActiveChartIndex(undefined);
      if (animationRef.current) clearInterval(animationRef.current);
    }
  }, [currentSection?.leftEffect]);

  const handleHover = useCallback((id: string | null) => {
    setHoveredSection(id);
  }, []);

  const getLeftVisualization = () => {
    const effect = currentSection?.leftEffect || "default";

    return (
      <div className="space-y-6">
        {/* Severity Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Severity Breakdown
          </h3>
          <span className="text-xs font-mono text-muted-foreground">47 Total Findings</span>
        </div>

        {/* Metrics Row - highlights on executive/strategic hover */}
        <div
          className={`grid grid-cols-4 gap-3 transition-all duration-300 ${
            effect === "metrics"
              ? "ring-1 ring-primary/30 rounded-lg p-2 bg-primary/[0.03]"
              : "p-2"
          }`}
        >
          {severityData.map((item, i) => (
            <div
              key={item.name}
              className={`text-center transition-all duration-300 ${
                effect === "chart" && animatingSegment === i
                  ? "scale-110"
                  : ""
              }`}
            >
              <div
                className="w-3 h-3 rounded-full mx-auto mb-1 transition-transform duration-300"
                style={{ backgroundColor: item.color }}
              />
              <div className="text-lg font-bold font-mono text-foreground">{item.value}</div>
              <div className="text-[10px] text-muted-foreground uppercase">{item.name}</div>
            </div>
          ))}
        </div>

        {/* Donut Chart */}
        <div
          className={`flex items-center justify-center transition-all duration-300 ${
            effect === "chart" ? "scale-[1.02]" : ""
          }`}
        >
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
                activeIndex={activeChartIndex}
                activeShape={renderActiveShape}
              >
                {severityData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{ transition: "opacity 0.3s ease" }}
                    opacity={
                      effect === "chart" && activeChartIndex !== undefined && activeChartIndex !== index
                        ? 0.4
                        : 1
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sample Finding Card */}
        <div
          className={`p-4 rounded-xl border space-y-2 transition-all duration-300 ${
            effect === "finding"
              ? "bg-card border-primary/30 shadow-md scale-[1.01] ring-1 ring-primary/20"
              : "bg-muted border-border"
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle
              className={`h-4 w-4 transition-colors duration-300 ${
                effect === "finding" ? "text-severity-critical" : "text-severity-critical"
              }`}
            />
            <span className="text-sm font-semibold text-foreground">
              Insecure Direct Object Reference
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Authenticated users can access other users' records by modifying the ID parameter,
            exposing sensitive PII data including payment information.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-severity-critical/10 text-severity-critical">
              Critical
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
              CVSS 8.6
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
              CWE-639
            </span>
          </div>

          {/* Remediation guidance - shows on remediation hover */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              effect === "remediation" ? "max-h-24 opacity-100 mt-3" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-3 rounded-lg bg-primary/[0.04] border border-primary/20">
              <p className="text-xs font-medium text-primary mb-1">Remediation Guidance</p>
              <p className="text-xs text-muted-foreground">
                Implement server-side authorization checks to validate object ownership before
                returning data. Use indirect reference maps or UUID-based identifiers.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="deliverables" className="section-padding scroll-mt-24">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            What We{" "}
            <span className="text-gradient-primary">Test & Uncover</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Cover the full security spectrum — from source code to injection attacks to cloud misconfigurations — with actionable remediation for every finding.
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid lg:grid-cols-2 gap-10 items-start reveal"
        >
          {/* Left: Interactive Visualization */}
          <div className="hidden lg:block bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
            {getLeftVisualization()}
          </div>

          {/* Right: Report Structure Navigation */}
          <div className="space-y-2">
            {/* Flow indicator */}
            <div className="relative space-y-1.5">
              {reportSections.map((section, index) => {
                const Icon = section.icon;
                const isHovered = hoveredSection === section.id;

                return (
                  <div
                    key={section.id}
                    className="relative"
                    onMouseEnter={() => handleHover(section.id)}
                    onMouseLeave={() => handleHover(null)}
                  >
                    <div
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-default transition-all duration-250 ${
                        isHovered
                          ? "bg-card border-primary/40 shadow-md ring-1 ring-primary/10"
                          : "bg-card border-border shadow-sm"
                      }`}
                    >
                      {/* Step number + icon */}
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-all duration-250 ${
                          isHovered
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-sm font-semibold transition-colors duration-200 ${
                              isHovered ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {section.title}
                          </span>
                        </div>

                        {/* Insight panel - slides in on hover */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-out ${
                            isHovered
                              ? "max-h-16 opacity-100 mt-1"
                              : "max-h-0 opacity-0 mt-0"
                          }`}
                        >
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {section.insight}
                          </p>
                        </div>
                      </div>

                      {/* Active indicator */}
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-250 ${
                          isHovered ? "bg-primary scale-125" : "bg-border"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Dashboard Screenshots Slider */}
        <div id="platform-in-action" className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-8">
            See the <span className="text-gradient-primary">Platform in Action</span>
          </h3>
          <DashboardSlider />
        </div>
      </div>
    </section>
  );
};

export default DeliverablesSection;
