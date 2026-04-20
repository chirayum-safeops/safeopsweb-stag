import { TrendingDown, Clock, ShieldCheck } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const caseStudies = [
  {
    icon: TrendingDown,
    industry: "Series B Fintech",
    title: "93% Reduction in Critical Exposure Pre-Launch",
    metric: "93%",
    metricLabel: "critical risk reduction",
    desc: "Identified 3 critical and 11 high-severity vulnerabilities across their API layer and payment processing flow, including an authentication bypass that could have exposed customer financial data. All critical findings were remediated and verified through retesting before launch day.",
    tags: ["AI-Powered", "API Testing", "Payment Security"],
  },
  {
    icon: Clock,
    title: "Remediation Time Cut from 45 Days to 8 Days",
    industry: "Enterprise SaaS",
    metric: "91%",
    metricLabel: "faster remediation",
    desc: "Delivered developer-ready remediation guidance with specific code examples and fix validation criteria. Their engineering team reduced average remediation time from 45 days to 8 days, with zero regressions in subsequent retesting cycles.",
    tags: ["AI-Powered", "SaaS", "Developer Guidance"],
  },
  {
    icon: ShieldCheck,
    title: "SOC 2 Type II Achieved on First Attempt",
    industry: "Healthcare Technology",
    metric: "100%",
    metricLabel: "audit requirements met",
    desc: "Delivered a compliance-mapped reporting satisfying auditor requirements, with clear evidence documentation and remediation tracking. They achieved certification on their first attempt, accelerating their enterprise sales pipeline by 4 months.",
    tags: ["AI-Powered", "Healthcare", "SOC 2"],
  },
];

const CaseStudiesSection = () => {
  const sectionRef = useScrollReveal({ staggerChildren: true, staggerDelay: 120 });

  return (
    <section id="case-studies" className="section-padding bg-muted/50 scroll-mt-24">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Client <span className="text-gradient-primary">Outcomes</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real results from organizations that trust SafeOps.
          </p>
        </div>

        <div ref={sectionRef} className="grid md:grid-cols-3 gap-6 reveal">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="bg-card border border-border rounded-lg p-6 space-y-5 flex flex-col group hover:border-primary/30 hover:shadow-md transition-all duration-300 reveal-child"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {study.industry}
                </span>
                <study.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-4xl font-extrabold text-gradient-primary">{study.metric}</div>
                <div className="text-sm text-muted-foreground">{study.metricLabel}</div>
              </div>
              <h3 className="text-lg font-semibold text-foreground leading-snug">{study.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{study.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
