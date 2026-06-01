import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Search, ListChecks, Bug, ShieldCheck, FileText, RefreshCw, Code, GitBranch, Brain } from "lucide-react";

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

    setJsonLd("ld-how-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://safeops.io/" },
        { "@type": "ListItem", position: 2, name: "How It Works", item: url },
      ],
    });

    return () => {
      ["ld-howto", "ld-how-breadcrumb"].forEach((id) => {
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
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                How SafeOps Works
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-foreground">
              Continuous Penetration Testing,{" "}
              <span className="text-gradient-primary">End to End</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The five-phase workflow that runs continuously against your applications, APIs, and cloud infrastructure. What the platform automates, what humans still own, and how it plugs into the tools your team already uses.
            </p>
          </div>

          {/* Five Phases */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              The Five Phases
            </h2>
            <p className="text-muted-foreground mb-10 max-w-2xl">
              Every pentest, manual or automated, runs roughly the same workflow. Here is what SafeOps handles at each step and where it stops to hand off.
            </p>

            <div className="space-y-6">
              {phases.map((p) => (
                <div
                  key={p.n}
                  className="flex gap-5 p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
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
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-border bg-card">
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
              <div className="p-6 rounded-xl border border-border bg-card">
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
            <div className="grid md:grid-cols-3 gap-5">
              {humans.map((h) => (
                <div
                  key={h.title}
                  className="p-5 rounded-xl border border-border bg-card"
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
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {integrations.map((g) => (
                <div
                  key={g.name}
                  className="p-5 rounded-xl border border-border bg-card"
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

          {/* What we don't do */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              What SafeOps Does Not Do
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Honest scope. These are not things SafeOps claims to cover.
            </p>
            <ul className="space-y-3 text-sm md:text-base text-muted-foreground">
              <li className="pl-5 relative">
                <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-muted-foreground/40" />
                Replace human red teamers for objective-driven engagements against high-value scopes.
              </li>
              <li className="pl-5 relative">
                <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-muted-foreground/40" />
                Satisfy regulatory mandates that explicitly require periodic third-party human-led pentest reports (some PCI DSS contexts, certain government contracting requirements). Continuous testing runs alongside, not in place of, those.
              </li>
              <li className="pl-5 relative">
                <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-muted-foreground/40" />
                Replace internal security expertise. SafeOps feeds a security team. It does not become one.
              </li>
              <li className="pl-5 relative">
                <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-muted-foreground/40" />
                Threat modeling during design. SafeOps tests what is implemented. Threat modeling catches what is being designed. Both matter.
              </li>
              <li className="pl-5 relative">
                <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-muted-foreground/40" />
                Social engineering and phishing campaigns. Human territory.
              </li>
            </ul>
          </section>

          {/* Related */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-5 text-foreground">
              Related Reading
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                to="/learn/how-automated-pentesting-works"
                className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors group"
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
                className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors group"
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
          <div className="p-6 md:p-8 rounded-xl border border-primary/20 bg-primary/[0.03] text-center space-y-4">
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
