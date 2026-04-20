import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Landmark, Cloud, HeartPulse, ShoppingCart, Building2 } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useEffect, useCallback } from "react";

const industries = [
  {
    id: "fintech",
    label: "Fintech",
    icon: Landmark,
    risks: [
      "Payment processing vulnerabilities exposing cardholder data",
      "API flaws enabling unauthorized fund transfers",
      "Weak authentication allowing account takeover",
      "Non-compliance with PCI DSS and financial regulations",
    ],
    solutions: [
      "Transaction flow testing and payment gateway validation",
      "API security testing with business logic validation",
      "Multi-factor authentication and session management review",
      "PCI DSS-aligned testing with compliance evidence documentation",
    ],
  },
  {
    id: "saas",
    label: "SaaS",
    icon: Cloud,
    risks: [
      "Multi-tenant isolation failures leaking data between customers",
      "Insecure API endpoints exposing sensitive customer data",
      "Privilege escalation across user roles and organizations",
      "Supply chain vulnerabilities in third-party integrations",
    ],
    solutions: [
      "Tenant isolation testing and cross-account access validation",
      "Full API surface testing including GraphQL and webhooks",
      "Role-based access control testing across permission levels",
      "Integration security review and dependency analysis",
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: HeartPulse,
    risks: [
      "Patient data exposure violating HIPAA requirements",
      "Medical device integration vulnerabilities",
      "Legacy system weaknesses in clinical environments",
      "Insufficient access controls on sensitive health records",
    ],
    solutions: [
      "HIPAA-aligned testing with PHI handling protocols",
      "Medical device and IoT security validation",
      "Support for legacy systems to ensure current security standards",
      "Access control and audit trail validation",
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: ShoppingCart,
    risks: [
      "Shopping cart manipulation and price tampering",
      "Payment card data theft through web skimming",
      "Account takeover affecting customer trust",
      "Inventory and coupon system abuse",
    ],
    solutions: [
      "End-to-end transaction flow and business logic testing",
      "Web application testing with e-skimming detection",
      "Authentication and account security validation",
      "Business logic abuse testing for pricing and promotions",
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise IT",
    icon: Building2,
    risks: [
      "Active Directory compromise leading to full domain takeover",
      "Lateral movement across network segments",
      "Exposed internal services and management interfaces",
      "Weak segmentation between business-critical environments",
    ],
    solutions: [
      "Internal network penetration testing with AD attack simulation",
      "Network segmentation and lateral movement validation",
      "Service enumeration and management interface hardening review",
      "Red team exercises simulating advanced persistent threats",
    ],
  },
];

const AUTO_CYCLE_INTERVAL = 5000;

const IndustriesSection = () => {
  const sectionRef = useScrollReveal();
  const [activeTab, setActiveTab] = useState("fintech");
  const [paused, setPaused] = useState(false);

  const nextTab = useCallback(() => {
    setActiveTab((prev) => {
      const idx = industries.findIndex((ind) => ind.id === prev);
      return industries[(idx + 1) % industries.length].id;
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
    setTimeout(() => setPaused(false), 10000);
  };

  return (
    <section id="industries" className="section-padding scroll-mt-24">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            Industry <span className="text-gradient-primary">Use Cases</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Built for every industry and unique to your business.
          </p>
        </div>

        <div ref={sectionRef} className="reveal">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col items-center">
            <TabsList className="inline-flex w-auto bg-card border border-border h-auto p-1 rounded-lg mb-8 shadow-sm mx-auto flex-wrap justify-center gap-1">
              {industries.map((ind) => (
                <TabsTrigger
                  key={ind.id}
                  value={ind.id}
                  className="gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary text-muted-foreground"
                >
                  <ind.icon className="h-4 w-4 hidden sm:block" />
                  {ind.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {industries.map((ind) => (
              <TabsContent key={ind.id} value={ind.id} className="w-full">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-card border border-border rounded-lg p-6 space-y-4 shadow-sm">
                    <h3 className="font-semibold text-foreground text-lg">Common Risks</h3>
                    <ul className="space-y-3">
                      {ind.risks.map((risk) => (
                        <li key={risk} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-severity-high mt-2 shrink-0" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6 space-y-4 shadow-sm">
                    <h3 className="font-semibold text-foreground text-lg">SafeOps Solutions</h3>
                    <ul className="space-y-3">
                      {ind.solutions.map((sol) => (
                        <li key={sol} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {sol}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
