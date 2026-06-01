import { BrainCircuit, Zap, Target, ShieldCheck, FileCheck, RefreshCw } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const differentiators = [
  {
    icon: BrainCircuit,
    title: "AI-Agent Driven Testing",
    desc: "SafeOps deploys intelligent agents that continuously explore applications and infrastructure to identify potential vulnerabilities and suspicious attack paths.",
  },
  {
    icon: Zap,
    title: "Automation at Scale",
    desc: "Automated scanning continuously evaluates applications, APIs, and infrastructure to rapidly identify security weaknesses across large environments.",
  },
  {
    icon: Target,
    title: "Contextual Application Intelligence",
    desc: "SafeOps connects to your source code and infrastructure to automatically understand your application architecture, then selects and prioritizes the most relevant attack scenarios to run.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Exploitable Findings",
    desc: "SafeOps prioritizes vulnerabilities that can actually be exploited in real-world scenarios, reducing noise and focusing on genuine security risks.",
  },
  {
    icon: FileCheck,
    title: "Actionable Security Reports",
    desc: "Detailed vulnerability reports provide technical evidence, clear risk context, and practical remediation guidance for engineering teams.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Security Validation",
    desc: "As applications evolve, SafeOps continuously retests environments to ensure new vulnerabilities are identified and existing fixes remain effective.",
  },
];

const WhySafeOpsSection = () => {
  const sectionRef = useScrollReveal({ staggerChildren: true, staggerDelay: 80 });

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Why <span className="text-gradient-primary">SafeOps</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Offensive security automation. Continuous penetration testing, autonomous red teaming, and certified human experts in one platform.
          </p>
        </div>

        <div ref={sectionRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
          {differentiators.map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-lg p-6 space-y-4 group hover:border-primary/30 hover:shadow-md transition-all duration-300 reveal-child">
              <div className="p-3 rounded-lg bg-primary/10 w-fit group-hover:bg-primary/15 transition-colors">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySafeOpsSection;
