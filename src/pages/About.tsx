import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Target, ShieldCheck, Layers } from "lucide-react";

const setMeta = (name: string, content: string, isProperty = false) => {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setJsonLd = (id: string, json: object) => {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(json);
};

const focusAreas = [
  "Continuous penetration testing (always-on security validation)",
  "AI-driven offensive security agents",
  "Application security (web applications)",
  "API security testing",
  "Cloud security posture and misconfiguration detection",
  "Kubernetes and container security",
  "Infrastructure as Code (IaC) security scanning",
  "CI/CD-integrated security testing",
  "Exploitability validation (reducing false positives)",
  "DevSecOps security automation",
];

const About = () => {
  useEffect(() => {
    const url = "https://safeops.io/about";
    document.title = "About SafeOps | AI-Powered Continuous Penetration Testing";
    setMeta(
      "description",
      "SafeOps is a cybersecurity company providing an AI-powered continuous penetration testing platform for modern engineering teams. Continuous security validation across applications, APIs, cloud, and Kubernetes."
    );
    setMeta("og:title", "About SafeOps", true);
    setMeta(
      "og:description",
      "AI-powered continuous penetration testing platform. Continuous security validation across applications, APIs, cloud infrastructure, and Kubernetes environments.",
      true
    );
    setMeta("og:url", url, true);
    setMeta("og:type", "website", true);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    setJsonLd("ld-about-org", {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://safeops.io/#organization",
      name: "SafeOps",
      url: "https://safeops.io",
      description:
        "SafeOps is a cybersecurity company that provides an AI-powered continuous penetration testing platform for modern engineering teams. It combines autonomous AI-driven offensive security agents with expert human validation to continuously simulate real-world attacks across applications, APIs, cloud infrastructure, and Kubernetes environments. The platform is designed to integrate into DevSecOps workflows and CI/CD pipelines, enabling organizations to continuously detect, validate, and remediate exploitable vulnerabilities before attackers can take advantage of them. SafeOps functions as a centralized security layer for application, infrastructure, and network security, providing continuous visibility, risk prioritization, and compliance-aligned reporting.",
      slogan:
        "Shifting cybersecurity from periodic, point-in-time testing to continuous, autonomous security validation.",
      knowsAbout: focusAreas,
      areaServed: "Worldwide",
    });

    setJsonLd("ld-about-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://safeops.io/" },
        { "@type": "ListItem", position: 2, name: "About", item: url },
      ],
    });

    return () => {
      ["ld-about-org", "ld-about-breadcrumb"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <article className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
              Continuous Security Validation,{" "}
              <span className="text-gradient-primary">Powered by AI Agents</span>
            </h1>
          </div>

          {/* Company description */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Layers className="h-5 w-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Company
              </h2>
            </div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                SafeOps is a cybersecurity company that provides an AI-powered continuous penetration testing platform for modern engineering teams.
              </p>
              <p>
                It combines autonomous AI-driven offensive security agents with expert human validation to continuously simulate real-world attacks across applications, APIs, cloud infrastructure, and Kubernetes environments.
              </p>
              <p>
                The platform is designed to integrate into DevSecOps workflows and CI/CD pipelines, enabling organizations to continuously detect, validate, and remediate exploitable vulnerabilities before attackers can take advantage of them.
              </p>
              <p>
                SafeOps functions as a centralized security layer for application, infrastructure, and network security, providing continuous visibility, risk prioritization, and compliance-aligned reporting.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Mission
              </h2>
            </div>
            <div className="p-6 rounded-xl border border-primary/20 bg-primary/[0.04] space-y-4 text-base md:text-lg text-foreground leading-relaxed">
              <p>
                SafeOps' mission is to shift cybersecurity from periodic, point-in-time testing to continuous, autonomous security validation.
              </p>
              <p>
                The company aims to help organizations proactively identify and eliminate exploitable vulnerabilities through continuous penetration testing powered by AI agents and human expertise, improving security posture in fast-moving software environments.
              </p>
            </div>
          </section>

          {/* Security focus areas */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Security Focus
              </h2>
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5">
              SafeOps focuses on offensive security and continuous security validation across modern attack surfaces. Core areas include:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {focusAreas.map((a) => (
                <li
                  key={a}
                  className="text-sm md:text-base text-foreground pl-5 relative"
                >
                  <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-primary" />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              The platform emphasizes real-world attack simulation, continuous monitoring, and validation of security findings to ensure issues are exploitable and actionable.
            </p>
          </section>

          {/* CTA */}
          <div className="mt-12 p-6 md:p-8 rounded-xl border border-primary/20 bg-primary/[0.03] text-center space-y-4">
            <h3 className="text-xl font-bold text-foreground">
              See SafeOps in action
            </h3>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Get a targeted assessment proposal within 24 hours, customized to your stack. No obligation.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 gradient-copper text-white font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default About;
