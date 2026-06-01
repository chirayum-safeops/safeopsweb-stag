import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SlideOneDashboard from "@/components/hero/SlideOneDashboard";

const HeroSection = () => {
  const contentRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="relative min-h-screen flex items-center section-padding pt-24 sm:pt-32 md:pt-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
            opacity: 0.3,
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div ref={contentRef} className="space-y-8 reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Automated Continuous Penetration Testing Platform
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-foreground">
              Hackers Don't Wait, <span className="text-gradient-primary">Neither Should You.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              SafeOps is an automated continuous penetration testing platform. Our AI-driven offensive security agents continuously simulate real-world attacks across applications, APIs, and cloud infrastructure to identify exploitable weaknesses before attackers do.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="gradient-copper font-semibold text-base px-8 glow-copper hover:opacity-90 transition-opacity"
              >
                <a href="#contact">
                  Sign Up Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Dashboard */}
          <div className="hidden lg:block">
            <SlideOneDashboard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
