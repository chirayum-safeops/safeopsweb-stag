import { useEffect, useRef, useState } from "react";
import { Award, Building2, ShieldCheck, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import oscpPlus from "@/assets/oscp-plus.png";
import oscp from "@/assets/oscp.png";
import oswp from "@/assets/oswp.png";
import ewptx from "@/assets/ewptx.png";
import ewpt from "@/assets/ewpt.png";
import ejpt from "@/assets/ejpt.png";
import patented from "@/assets/patented.png";
import capenx from "@/assets/capenx.png";
import cAiMlpen from "@/assets/c-ai-mlpen.png";
import ccspAws from "@/assets/ccsp-aws.png";
import certificateBadge from "@/assets/certificate-badge.png";


const stats = [
  { label: "Assessments", value: 1000, suffix: "+", icon: ShieldCheck },
  { label: "Critical Findings Identified", value: 12000, suffix: "+", icon: Award },
  { label: "Industries Served", value: 15, suffix: "+", icon: Building2 },
  { label: "Test Cases Executed", value: 15000, suffix: "+", icon: Users },
];

const certifications = [
  { name: "OSCP+", image: oscpPlus },
  { name: "OSCP", image: oscp },
  { name: "OSWP", image: oswp },
  { name: "CAPENX", image: capenx },
  { name: "AI/ML Pentester", image: cAiMlpen },
  { name: "CCSP AWS", image: ccspAws },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono text-primary">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const TrustSection = () => {
  const sectionRef = useScrollReveal({ staggerChildren: true, staggerDelay: 100 });

  return (
    <>
    <section className="section-padding border-y border-border">
      <div ref={sectionRef} className="container mx-auto space-y-16 reveal">
        <div className="text-center reveal-child">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by security-conscious organizations
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 reveal-child">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <stat.icon className="h-6 w-6 text-primary mx-auto mb-3" />
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="text-center space-y-6 reveal-child">
          <h2 className="text-2xl md:text-3xl font-bold">Our Certifications</h2>
        </div>

        <div className="relative w-full reveal-child overflow-hidden">
          <div className="flex w-max animate-scroll-x gap-12 py-2">
            {[...certifications, ...certifications, ...certifications].map((cert, i) => (
              <div
                key={`${cert.name}-${i}`}
                className="flex flex-col items-center gap-2 flex-shrink-0"
                title={cert.name}
              >
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="h-24 w-24 md:h-28 md:w-28 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Patented Technology — separate section */}
    <section className="py-1 md:py-2 px-4 border-b border-border">
      <div className="container mx-auto flex items-center justify-center gap-4 md:gap-6">
        <img
          src={patented}
          alt="Patented Technology"
          className="h-28 w-28 md:h-36 md:w-36 object-contain opacity-90 hover:opacity-100 transition-opacity"
        />
        <img
          src={certificateBadge}
          alt="Certificate Badge"
          className="h-32 w-32 md:h-[10.35rem] md:w-[10.35rem] object-contain opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>
    </section>
    </>
  );
};

export default TrustSection;
