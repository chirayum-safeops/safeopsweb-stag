import { ArrowRight, BookOpen, FileWarning, Microscope, Newspaper } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const insights = [
  {
    icon: FileWarning,
    type: "Threat Intelligence",
    title: "The Rise of API-First Attacks: What Your Team Needs to Know",
    desc: "API vulnerabilities accounted for 41% of critical findings in our 2024 assessments. We break down the most common patterns and how to defend against them.",
    date: "Feb 2026",
  },
  {
    icon: Microscope,
    type: "Technical Research",
    title: "Breaking Multi-Tenant Isolation: Real-World SaaS Testing Patterns",
    desc: "An in-depth look at tenant isolation failures we've discovered across SaaS platforms, with anonymized case examples and defensive strategies.",
    date: "Jan 2026",
  },
  {
    icon: BookOpen,
    type: "Whitepaper",
    title: "The CISO's Guide to Penetration Testing ROI",
    desc: "How to measure the return on security testing investment, build the business case for leadership, and integrate testing into your security program.",
    date: "Dec 2025",
  },
  {
    icon: Newspaper,
    type: "Industry Analysis",
    title: "AI Security in Production: Emerging Attack Vectors for LLM Applications",
    desc: "From prompt injection to training data extraction — a practical overview of security risks in AI-powered applications and how to test for them.",
    date: "Nov 2025",
  },
];

const InsightsSection = () => {
  const sectionRef = useScrollReveal({ staggerChildren: true, staggerDelay: 100 });

  return (
    <section id="insights" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Research & <span className="text-gradient-primary">Insights</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Security research and thought leadership from our offensive security team.
          </p>
        </div>

        <div ref={sectionRef} className="grid md:grid-cols-2 gap-6 reveal">
          {insights.map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-lg p-6 space-y-4 group hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer reveal-child">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">{item.type}</span>
                </div>
                <span className="text-xs text-muted-foreground">{item.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              <div className="flex items-center gap-1 text-sm text-primary font-medium">
                Read more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
