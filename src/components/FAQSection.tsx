import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    q: "How long does the test take?",
    a: "SafeOps starts delivering insights within minutes of connecting your stack, with real-time, continuous security validation thereafter.",
  },
  {
    q: "How do AI agents perform penetration testing?",
    a: "SafeOps agents autonomously discover and exploit vulnerabilities, simulate real-world attacks, and adapt based on findings—validated by human experts for accuracy.",
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
    a: "SafeOps intelligently understands your application by discovering assets, endpoints, and workflows—automatically building relevant test cases.",
  },
  {
    q: "What is the difference between a vulnerability scan and a penetration test?",
    a: "A vulnerability scan identifies known issues automatically. SafeOps goes further—actively exploiting vulnerabilities, chaining them, and assessing real-world impact.",
  },
  {
    q: "What happens when a vulnerability is found during a software release?",
    a: "SafeOps integrates natively with CI/CD systems and can run during the build process, and can stop the release if it has security or compliance violations.",
  },
];
const FAQSection = () => {
  const sectionRef = useScrollReveal({ staggerChildren: true, staggerDelay: 60 });

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
