import { Shield, Globe, Target, RefreshCw } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Shield,
    title: "Expanding Attack Surfaces",
    desc: "Modern enterprises run hundreds of applications, APIs, cloud services, and third-party integrations — dramatically increasing the number of potential entry points for attackers.",
  },
  {
    icon: Globe,
    title: "APIs Are the New Attack Vector",
    desc: "Most modern breaches now involve API vulnerabilities such as broken authentication, IDOR, and authorization flaws that traditional scanners often miss.",
  },
  {
    icon: Target,
    title: "Attackers Chain Multiple Vulnerabilities",
    desc: "Real-world attacks rarely rely on a single bug. Attackers combine multiple weaknesses across systems to escalate privileges and reach sensitive data.",
  },
  {
    icon: RefreshCw,
    title: "New Code Introduces New Risks",
    desc: "Every deployment, configuration change, or infrastructure update can introduce new vulnerabilities that remain undetected without continuous security testing.",
  },
];

const ServicesSection = () => {
  const sectionRef = useScrollReveal({ staggerChildren: true, staggerDelay: 120 });

  return (
    <section id="services" className="py-14 px-4 md:px-8 scroll-mt-24">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Continuous <span className="text-gradient-primary">Ethical Hacking</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
            SafeOps combines intelligent automation, AI-assisted agents, and expert human validation to continuously identify exploitable vulnerabilities before attackers do.
          </p>
        </div>

        <div ref={sectionRef} className="grid md:grid-cols-2 gap-5 reveal">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 hover:shadow-lg cursor-pointer reveal-child"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/15 group-hover:scale-105 mb-4">
                  <service.icon className="h-5 w-5" />
                </div>

                <h4 className="text-base font-semibold text-foreground mb-2 leading-snug">{service.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground flex-1">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
