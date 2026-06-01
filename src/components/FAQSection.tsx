import { useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    q: "What is continuous penetration testing?",
    a: "Continuous penetration testing is offensive security testing that runs continuously against your applications, APIs, and cloud infrastructure rather than on a fixed annual or quarterly schedule. Every code change, infrastructure update, and new asset gets tested as it appears, so exploitable weaknesses surface within hours instead of at the next assessment window.",
  },
  {
    q: "How often should companies run penetration tests?",
    a: "For cloud-native organizations deploying weekly or more often, continuous validation is the right model. Annual or quarterly pentests describe an environment that has already changed by the time the report ships. For regulated scopes that mandate periodic third-party reports (some PCI DSS contexts, certain government contracts), continuous testing typically runs alongside the required periodic test rather than replacing it.",
  },
  {
    q: "What is automated pentesting?",
    a: "Automated pentesting runs the same workflow as a human pentester (reconnaissance, enumeration, exploitation, validation, reporting) using software agents instead of a human team. It is not the same as a vulnerability scanner. A scanner flags theoretical issues by signature match. A pentest platform actively attempts to exploit findings and only reports the ones it could confirm.",
  },
  {
    q: "How does continuous penetration testing help with SOC 2?",
    a: "SOC 2 requires evidence of regular vulnerability management and security testing. Continuous penetration testing satisfies those requirements with always-current evidence reflecting the live environment, rather than a single annual report that ages out within weeks. Many auditors now actively prefer continuous validation models because the evidence is materially better.",
  },
  {
    q: "How long does the test take?",
    a: "SafeOps starts delivering insights within minutes of connecting your stack, with real-time, continuous security validation thereafter.",
  },
  {
    q: "How do AI agents perform penetration testing?",
    a: "SafeOps agents autonomously discover and exploit vulnerabilities, simulate real-world attacks, and adapt based on findings. Results are validated by human experts for accuracy.",
  },
  {
    q: "How does it understand my application?",
    a: "SafeOps can intelligently crawl through an application and its source code, and build the necessary scenarios for exploitation.",
  },
  {
    q: "Do you support retesting after remediation?",
    a: "Yes. SafeOps continuously rescans your environment to confirm fixes and keep results up to date.",
  },
  {
    q: "How do you test for my business logic?",
    a: "SafeOps engineers perform manual testing regularly and add new test cases for clients. These test cases run continuously.",
  },
  {
    q: "Do you test production environments?",
    a: "Yes. SafeOps safely tests production environments using controlled methods to avoid disruption, with real-time monitoring throughout.",
  },
  {
    q: "How is the scope defined?",
    a: "SafeOps intelligently understands your application by discovering assets, endpoints, and workflows, then automatically builds relevant test cases.",
  },
  {
    q: "What is the difference between a vulnerability scan and a penetration test?",
    a: "A vulnerability scan identifies known issues automatically. SafeOps goes further by actively exploiting vulnerabilities, chaining them, and assessing real-world impact.",
  },
  {
    q: "What happens when a vulnerability is found during a software release?",
    a: "SafeOps integrates natively with CI/CD systems and can run during the build process, and can stop the release if it has security or compliance violations.",
  },
];
const FAQSection = () => {
  const sectionRef = useScrollReveal({ staggerChildren: true, staggerDelay: 60 });

  useEffect(() => {
    const id = "ld-homepage-faq";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    return () => {
      const node = document.getElementById(id);
      if (node) node.remove();
    };
  }, []);

  return (
    <section id="faq" className="section-padding scroll-mt-24">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Frequently Asked <span className="text-gradient-primary">Questions</span>
          </h2>
        </div>

        <div ref={sectionRef} className="reveal">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card px-6 border border-border rounded-lg data-[state=open]:border-primary/30 shadow-sm reveal-child"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5 text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
