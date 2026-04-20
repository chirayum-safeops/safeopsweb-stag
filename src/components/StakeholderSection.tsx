import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Code, TrendingUp } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect, useCallback } from "react";

const stakeholders = [
  {
    id: "ciso",
    label: "CISO",
    icon: ShieldCheck,
    headline: "Strategic Risk Visibility for Security Leaders",
    points: [
      { title: "Continuous Visibility", desc: "Maintain real-time visibility into your security posture across teams and geographical regions." },
      { title: "Peace of Mind", desc: "Sleep better knowing your organization's security posture is continuously validated by expert-led offensive testing." },
      { title: "Centralized View", desc: "A single pane of glass across all applications, cloud environments, processes, and supply chain — so nothing falls through the cracks." },
      { title: "Regulatory Alignment", desc: "Testing aligned with PCI DSS, SOC 2, ISO 27001, and HIPAA requirements to support your compliance roadmap." },
    ],
  },
  {
    id: "cto",
    label: "CTO / Engineering",
    icon: Code,
    headline: "Secure Releases Without Slowing Down",
    points: [
      { title: "Developer-Ready Remediation", desc: "Security best practices for all engineering teams with example fixes and support." },
      { title: "CI/CD Integration", desc: "Embed security testing into your development lifecycle and ship with confidence." },
      { title: "Supply Chain Control", desc: "Monitor third-party dependencies, open-source libraries, and vendor integrations across your stack." },
      { title: "Zero False Positives", desc: "Focus on signal, not the noise. Every finding is deduped and validated for false positives." },
    ],
  },
  {
    id: "ceo",
    label: "CEO / COO",
    icon: TrendingUp,
    headline: "Reduce Business Risk, Protect Revenue",
    points: [
      { title: "Breach Prevention", desc: "Identify business risks and exposure with proactive validation." },
      { title: "Brand Protection", desc: "Protect business reputation and customer churn." },
      { title: "Attestation Support", desc: "Detailed reporting with supporting evidence for audit requirements." },
      { title: "Customer Trust", desc: "Proactive and transparent approach that demonstrates security commitment." },
    ],
  },
];

const AUTO_CYCLE_INTERVAL = 60000;

const StakeholderSection = () => {
  const sectionRef = useScrollReveal();
  const [activeTab, setActiveTab] = useState("ciso");
  const [paused, setPaused] = useState(false);

  const nextTab = useCallback(() => {
    setActiveTab((prev) => {
      const idx = stakeholders.findIndex((s) => s.id === prev);
      return stakeholders[(idx + 1) % stakeholders.length].id;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(nextTab, AUTO_CYCLE_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, nextTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setPaused(true);
    // Resume auto-cycle after 10s of inactivity
    setTimeout(() => setPaused(false), 10000);
  };

  return (
    <section id="stakeholders" className="section-padding bg-muted/50 scroll-mt-24">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Value for <span className="text-gradient-primary">Every Stakeholder</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Security command center across your organization, aligning stakeholders with clear insights and actionable risk visibility.
          </p>
        </div>

        <div ref={sectionRef} className="reveal">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col items-center">
            <TabsList className="inline-flex w-auto bg-card border border-border h-auto p-1 rounded-lg mb-8 shadow-sm mx-auto flex-wrap justify-center gap-1">
              {stakeholders.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-muted-foreground"
                >
                  <s.icon className="h-4 w-4 hidden sm:block" />
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="relative w-full">
              {stakeholders.map((s) => {
                const isActive = s.id === activeTab;
                return (
                  <div
                    key={s.id}
                    className={`w-full transition-all duration-500 ease-in-out ${
                      isActive
                        ? "opacity-100 translate-y-0 relative"
                        : "opacity-0 translate-y-2 absolute top-0 left-0 right-0 pointer-events-none"
                    }`}
                  >
                    <div className="bg-card border border-border rounded-lg p-5 sm:p-8 shadow-sm">
                      <h3 className="text-xl font-bold text-foreground mb-6">{s.headline}</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {s.points.map((point) => (
                          <div key={point.title} className="space-y-2">
                            <h4 className="font-semibold text-foreground flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {point.title}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed pl-4">{point.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default StakeholderSection;
