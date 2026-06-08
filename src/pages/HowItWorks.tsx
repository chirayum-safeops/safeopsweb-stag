import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Search, ListChecks, Bug, ShieldCheck, FileText, RefreshCw, Code, GitBranch, Brain } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does SafeOps work?",
    a: "SafeOps runs the same five phases as a human pentester (reconnaissance, enumeration, exploitation, validation, reporting), continuously instead of on an engagement window. AI-driven offensive security agents discover assets, fingerprint technology, attempt exploitation, and validate findings before reporting them. Certified human security engineers handle business logic abuse and multi-step exploit chains the platform cannot reach.",
  },
  {
    q: "How are vulnerabilities prioritized?",
    a: "SafeOps prioritizes by confirmed exploitability and reachable business impact, not raw CVSS score. A medium-severity IDOR in a customer-facing API outranks a CVSS 9.8 RCE on an isolated dev host that the platform could not actually reach. Severity is informed by what the platform was able to do during exploitation, the data or systems it could reach, and the chain of steps required.",
  },
  {
    q: "How does SafeOps integrate into engineering workflows?",
    a: "Findings appear in the tools your team already uses. SafeOps integrates with CI/CD (GitHub Actions, GitLab CI, CircleCI, Jenkins), ticketing (Jira, Linear, GitHub Issues, Asana), chat and alerts (Slack, Microsoft Teams, PagerDuty, Opsgenie), cloud platforms (AWS, Azure, GCP, Kubernetes), identity (Okta, Azure AD, Google Workspace, Cognito), and SIEM/SOAR (Splunk, Datadog, Sumo Logic, Elastic). Triage happens where engineering already works, not in a separate security dashboard.",
  },
  {
    q: "What makes SafeOps different from vulnerability scanners?",
    a: "A vulnerability scanner matches signatures against known CVEs and produces a long list of suspected issues. SafeOps actively attempts to exploit findings and only reports the ones it could confirm. The output is smaller, validated, and prioritized by reachable impact. Scanners tell you something might be vulnerable. SafeOps tells you what an attacker could actually do.",
  },
  {
    q: "Is automated pentesting safe for production environments?",
    a: "Yes. SafeOps tests production environments using controlled, non-destructive techniques. Exploit attempts are bounded (no destructive payloads, no data deletion, throttled request rates) and the platform monitors target health during testing. For sensitive workloads, scope and aggressiveness are configurable.",
  },
  {
    q: "How does SafeOps validate vulnerabilities found by AI agents?",
    a: "Every finding goes through automated validation before reporting. The platform captures request/response evidence, screenshots of executed payloads, exfiltrated test data, and proof-of-access artifacts. Findings the platform cannot confirm are marked unconfirmed or dropped. Certified human security engineers review high-impact findings before they ship to your team.",
  },
  {
    q: "What types of assets can be tested?",
    a: "SafeOps tests web applications, APIs (REST, GraphQL, gRPC), cloud infrastructure across AWS, Azure, and GCP, Kubernetes and container environments, and Infrastructure as Code. Coverage scales with your environment, so newly deployed assets are discovered and tested without scope re-negotiation.",
  },
];

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

const phases = [
  {
    n: 1,
    icon: Search,
    title: "Reconnaissance",
    desc: "Continuous discovery of subdomains, exposed services, cloud assets, leaked credentials, and shadow IT.",
    detail: "Certificate transparency monitoring, DNS history, GitHub crawling, port scanning, and multi-cloud asset enumeration across AWS, Azure, and GCP. Runs continuously so new assets surface in hours, not at the next scheduled scan.",
  },
  {
    n: 2,
    icon: ListChecks,
    title: "Enumeration & Fingerprinting",
    desc: "Identify what each asset runs, what it exposes, and where it is likely vulnerable.",
    detail: "Detects frameworks (Laravel, Rails, Django, Next.js, Spring), CMS versions, API styles (REST, GraphQL, gRPC), auth mechanisms, and cloud configuration drift. Output is a prioritized target list, not a 4,000-row inventory.",
  },
  {
    n: 3,
    icon: Bug,
    title: "Exploitation",
    desc: "Active exploitation attempts on identified weaknesses.",
    detail: "Known CVE exploitation against confirmed-vulnerable versions, common cloud misconfigurations, injection classes (SQLi, command injection, SSRF, SSTI), and access control flaws (IDOR, BOLA, JWT validation bypass). Multi-step attack chains where the platform can reason about them.",
  },
  {
    n: 4,
    icon: ShieldCheck,
    title: "Validation",
    desc: "Confirm exploitability before reporting. No false positives.",
    detail: "Captures request/response evidence, screenshots of executed payloads, exfiltrated test data, and proof-of-access artifacts. Findings the platform could not confirm are marked unconfirmed or dropped.",
  },
  {
    n: 5,
    icon: FileText,
    title: "Reporting",
    desc: "Validated findings with exploit chain, business impact, and remediation guidance.",
    detail: "Severity informed by what the platform actually accomplished, not raw CVSS. Reports update continuously as new findings emerge. Integrates with Jira, Linear, GitHub Issues, Slack, and SOC 2 evidence collection.",
  },
];

const humans = [
  {
    icon: Brain,
    title: "Business logic exploitation",
    desc: "Race conditions, workflow bypasses, payment flow abuse. Anything that depends on understanding the intent of a workflow, not its surface behavior.",
  },
  {
    icon: GitBranch,
    title: "Multi-step exploit chains",
    desc: "Combining a low-severity info leak with a misconfigured IAM role with an exposed internal endpoint to demonstrate end-to-end impact.",
  },
  {
    icon: Code,
    title: "Objective-driven testing",
    desc: "\"Can you reach the customer database from the public marketing site.\" Goal-oriented adversary simulation that requires creativity.",
  },
];

const integrations = [
  { name: "CI/CD", items: ["GitHub Actions", "GitLab CI", "CircleCI", "Jenkins"] },
  { name: "Ticketing", items: ["Jira", "Linear", "GitHub Issues", "Asana"] },
  { name: "Chat & Alerts", items: ["Slack", "Microsoft Teams", "PagerDuty", "Opsgenie"] },
  { name: "Cloud", items: ["AWS", "Azure", "GCP", "Kubernetes"] },
  { name: "Identity", items: ["Okta", "Azure AD", "Google Workspace", "Cognito"] },
  { name: "SIEM/SOAR", items: ["Splunk", "Datadog", "Sumo Logic", "Elastic"] },
];

const HowItWorks = () => {
  const heroRef = useScrollReveal({ threshold: 0.1 });
  const keyPointsRef = useScrollReveal({ threshold: 0.1 });
  const phasesRef = useScrollReveal({ staggerChildren: true, staggerDelay: 100 });
  const triggerRef = useScrollReveal({ staggerChildren: true, staggerDelay: 100 });
  const humansRef = useScrollReveal({ staggerChildren: true, staggerDelay: 100 });
  const integrationsRef = useScrollReveal({ staggerChildren: true, staggerDelay: 80 });
  const faqRef = useScrollReveal({ threshold: 0.1 });
  const relatedRef = useScrollReveal({ staggerChildren: true, staggerDelay: 100 });
  const ctaRef = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    const url = "https://safeops.io/how-it-works";
    document.title = "How SafeOps Works | Continuous Penetration Testing Platform";
    setMeta(
      "description",
      "How SafeOps continuously runs reconnaissance, exploitation, and validation across applications, APIs, and cloud infrastructure. The five-phase workflow, integrations, and where humans plug in."
    );
    setMeta("og:title", "How SafeOps Works", true);
    setMeta(
      "og:description",
      "The five-phase continuous pentest workflow: recon, enumeration, exploitation, validation, reporting. How automation and human experts combine.",
      true
    );
    setMeta("og:url", url, true);
    setMeta("og:type", "article", true);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    setJsonLd("ld-howto", {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How SafeOps Continuous Penetration Testing Works",
      description:
        "The five-phase continuous pentest workflow used by SafeOps to identify and validate exploitable weaknesses across applications, APIs, and cloud infrastructure.",
      step: phases.map((p) => ({
        "@type": "HowToStep",
        position: p.n,
        name: p.title,
        text: p.detail,
      })),
    });

    setJsonLd("ld-how-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });

    setJsonLd("ld-how-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://safeops.io/" },
        { "@type": "ListItem", position: 2, name: "How It Works", item: url },
      ],
    });

    return () => {
      ["ld-howto", "ld-how-faq", "ld-how-breadcrumb"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <article className="max-w-4xl mx-auto">
          {/* Hero */}
          <div ref={heroRef} className="text-center mb-16 reveal">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-foreground">
              Continuous Penetration Testing,{" "}
              <span className="text-gradient-primary">End to End</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The five-phase workflow that runs continuously against your applications, APIs, and cloud infrastructure. What the platform automates, what humans still own, and how it plugs into the tools your team already uses.
            </p>
          </div>

          {/* Key points */}
          <div ref={keyPointsRef} className="mb-16 p-6 rounded-xl border border-primary/20 bg-primary/[0.04] reveal">
            <ul className="space-y-2 text-sm md:text-base text-foreground">
              <li className="pl-5 relative">
                <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-primary" />
                SafeOps runs the same five phases as a human pentester (recon, enumeration, exploitation, validation, reporting), continuously instead of on an engagement window.
              </li>
              <li className="pl-5 relative">
                <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-primary" />
                Every finding is validated before it ships. Scanner output and unconfirmed issues do not reach your team.
              </li>
              <li className="pl-5 relative">
                <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-primary" />
                Human security engineers focus on business logic flaws, multi-step exploit chains, and objective-driven testing the platform cannot reach.
              </li>
            </ul>
          </div>

          {/* Five Phases */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              The Five Phases
            </h2>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              Every pentest, manual or automated, runs roughly the same workflow. Here is what SafeOps handles at each step and where it stops to hand off.
            </p>

            <div ref={phasesRef} className="space-y-6 reveal">
              {phases.map((p) => (
                <div
                  key={p.n}
                  className="flex gap-5 p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors reveal-child"
                >
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <div className="text-center mt-2 text-xs font-bold text-primary">
                      0{p.n}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {p.title}
                    </h3>
                    <p className="text-sm text-foreground mb-3">{p.desc}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Continuous vs scheduled */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground flex items-center gap-3">
              <RefreshCw className="h-6 w-6 text-primary" />
              What Runs Continuously vs. on Triggers
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Not everything runs every minute. The platform balances continuous coverage with cost and noise control.
            </p>
            <div ref={triggerRef} className="grid md:grid-cols-2 gap-6 reveal">
              <div className="p-6 rounded-xl border border-border bg-card reveal-child">
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Continuous (always-on)
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• External attack surface discovery</li>
                  <li>• Certificate transparency monitoring</li>
                  <li>• Public Git history for leaked secrets</li>
                  <li>• Cloud configuration drift detection</li>
                  <li>• DNS and subdomain monitoring</li>
                </ul>
              </div>
              <div className="p-6 rounded-xl border border-border bg-card reveal-child">
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Trigger-based (on change)
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Application exploit attempts on new code</li>
                  <li>• API endpoint enumeration after deploys</li>
                  <li>• Infrastructure pentests on IaC changes</li>
                  <li>• Deep retest on remediation</li>
                  <li>• Compliance evidence collection on demand</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Where humans plug in */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Where Humans Plug In
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Some work the platform will not do well, and probably will not for years. Human security engineers focus on what only humans do.
            </p>
            <div ref={humansRef} className="grid md:grid-cols-3 gap-5 reveal">
              {humans.map((h) => (
                <div
                  key={h.title}
                  className="p-5 rounded-xl border border-border bg-card reveal-child"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <h.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {h.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Integrations */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              How It Plugs Into Your Stack
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Findings appear in the tools your team already uses. No new dashboard to babysit.
            </p>
            <div ref={integrationsRef} className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 reveal">
              {integrations.map((g) => (
                <div
                  key={g.name}
                  className="p-5 rounded-xl border border-border bg-card reveal-child"
                >
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                    {g.name}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-foreground">
                    {g.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section ref={faqRef} className="mb-16 reveal">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`how-faq-${i}`}>
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Related */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-foreground">
              Related Reading
            </h2>
            <div ref={relatedRef} className="grid md:grid-cols-2 gap-4 reveal">
              <Link
                to="/learn/how-automated-pentesting-works"
                className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors group reveal-child"
              >
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  Guide
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  How Automated Pentesting Works
                </h3>
                <p className="text-sm text-muted-foreground">
                  Deep dive on the five phases, scanner vs. pentest platform distinction, and where humans still belong.
                </p>
              </Link>
              <Link
                to="/learn/alternatives-to-annual-penetration-tests"
                className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors group reveal-child"
              >
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  Guide
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  Alternatives to Annual Penetration Tests
                </h3>
                <p className="text-sm text-muted-foreground">
                  The four credible alternatives, what each covers, and how mature programs combine them.
                </p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <div ref={ctaRef} className="p-6 md:p-8 rounded-xl border border-primary/20 bg-primary/[0.03] text-center space-y-4 reveal">
            <h3 className="text-xl font-bold text-foreground">
              See it run against your environment
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

export default HowItWorks;
