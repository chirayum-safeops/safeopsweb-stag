import { GitBranch, ScanSearch, Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    icon: GitBranch,
    title: "Connect & Discover",
    desc: "Connect your stack and automatically build an attack surface profile against your endpoints, APIs, and everything else.",
  },
  {
    icon: ScanSearch,
    title: "Continuous Attack Simulation",
    desc: "SafeOps continuously executes real-world attack vectors based on your business logic to identify exploitable vulnerabilities.",
  },
  {
    icon: Wrench,
    title: "Remediate & Improve",
    desc: "Resolve issues quickly with clear, actionable remediation guidance and continuously strengthen your security posture.",
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="section-padding bg-muted/30 scroll-mt-24">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            How SafeOps <span className="text-gradient-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">Connect your stack in less than 5 minutes.</p>
        </div>

        <div ref={sectionRef} className="relative">
          {/* Pipeline connector line - from center of first card to center of last card */}
          <div className="hidden sm:block absolute top-[26px] left-[calc(100%/6)] right-[calc(100%/6)] z-0">
            <div className="relative h-[2px] bg-border">
              <div
                className="h-full bg-primary/40 transition-all duration-[2000ms] ease-out"
                style={{ width: isVisible ? "100%" : "0%" }}
              />
              {isVisible && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
                  style={{
                    animation: "pulseTravelProcess 3s ease-in-out infinite",
                  }}
                />
              )}
            </div>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                {/* Icon circle */}
                <div className="w-[52px] h-[52px] rounded-xl bg-card border border-border shadow-sm flex items-center justify-center mb-4 group cursor-default hover:border-primary/50 hover:shadow-md hover:scale-105 transition-all duration-300">
                  <step.icon className="h-5 w-5 text-primary group-hover:text-primary transition-colors" />
                </div>

                {/* Step number */}
                <span className="text-[11px] font-semibold text-primary/70 uppercase tracking-widest mb-1">
                  Step {i + 1}
                </span>

                {/* Title */}
                <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-snug">{step.title}</h3>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[180px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseTravelProcess {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default ProcessSection;
