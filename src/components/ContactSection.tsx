import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Search, FileCheck, Wrench, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal<HTMLFormElement>({ threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/contact@safeops.io", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        toast({
          title: "Thank You!",
          description: "Our team will get in touch with you shortly.",
        });
        form.reset();
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at contact@safeops.io",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-muted/50 scroll-mt-24">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div ref={leftRef} className="space-y-8 reveal">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                Hackers Don't Wait for Your{" "}
                <span className="text-gradient-primary">Next Security Audit.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Try SafeOps for free and get an instant review:
              </p>
              <ul className="space-y-3 text-muted-foreground text-lg list-none">
                <li className="flex items-start gap-3"><Search className="h-5 w-5 text-primary mt-1 shrink-0" /> A comprehensive security analysis of your application</li>
                <li className="flex items-start gap-3"><FileCheck className="h-5 w-5 text-primary mt-1 shrink-0" /> Free penetration testing report valid for compliance reporting</li>
                <li className="flex items-start gap-3"><Wrench className="h-5 w-5 text-primary mt-1 shrink-0" /> Actionable recommendations on potential fixes</li>
                <li className="flex items-start gap-3"><ShieldCheck className="h-5 w-5 text-primary mt-1 shrink-0" /> Validation of your security program</li>
              </ul>
            </div>
          </div>

          <form ref={rightRef} onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-5 sm:p-8 space-y-5 shadow-sm reveal">
            <input type="hidden" name="_subject" value="New SafeOps Contact Form Submission" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">First Name</label>
                <Input
                  required
                  name="first_name"
                  placeholder="First name"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Last Name</label>
                <Input
                  required
                  name="last_name"
                  placeholder="Last name"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  required
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone (Optional)</label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Message</label>
              <Textarea
                required
                name="message"
                placeholder="Tell us a little about your project?"
                rows={4}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full gradient-copper font-semibold text-base py-6 glow-copper hover:opacity-90 transition-opacity"
            >
              {loading ? "Sending..." : "Submit"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
