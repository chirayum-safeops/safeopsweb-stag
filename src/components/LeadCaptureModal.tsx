import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

/**
 * Lead-capture popup.
 * Reuses the same FormSubmit.co pipeline the contact form uses — no CRM, no server.
 * Leads arrive by email to the address below; swap this URL (or point it at a
 * webhook) when a CRM is added later — nothing else in this file needs to change.
 */
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/contact@safeops.io";
const STORAGE_KEY = "safeops_lead_capture_v1";
const SHOW_DELAY_MS = 15000; // appear after 15s on the page
const DISMISS_SUPPRESS_DAYS = 7; // don't re-nag someone who dismissed it

const SERVICES = [
  "Continuous Pentesting",
  "Web App Pentesting",
  "API Pentesting",
  "Cloud Security",
  "Red Teaming",
  "SOC 2 Readiness",
  "Not sure yet",
];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success";

const shouldSuppress = (): boolean => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data.submitted) return true;
    if (data.dismissedAt) {
      return Date.now() - data.dismissedAt < DISMISS_SUPPRESS_DAYS * 864e5;
    }
    return false;
  } catch {
    return false;
  }
};

const remember = (patch: Record<string, unknown>) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const prev = raw ? JSON.parse(raw) : {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, ...patch }));
  } catch {
    /* localStorage unavailable — fail open, just skip persistence */
  }
};

const LeadCaptureModal = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "" });
  const [consent, setConsent] = useState(false);
  const [honey, setHoney] = useState(""); // spam honeypot — humans never fill this
  const [error, setError] = useState<string | null>(null);

  // Decide whether / when to show. Runs once on load (component is mounted
  // globally, so it survives route changes). ?leadpopup=1 forces it for preview.
  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).get("leadpopup");
    const delay = forced ? 600 : SHOW_DELAY_MS;
    if (!forced && shouldSuppress()) return;
    const t = setTimeout(() => setOpen(true), delay);
    return () => clearTimeout(t);
  }, []);

  const update = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError(null);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setOpen(false);
      if (status !== "success") remember({ dismissedAt: Date.now() });
    }
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!emailRe.test(form.email)) return "Please enter a valid email address.";
    if (!form.phone.trim()) return "Please enter your phone number.";
    if (!form.service) return "Please select a service.";
    if (!consent) return "Please agree to be contacted so we can follow up.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) {
      // Bot filled the hidden field — pretend success, send nothing.
      setStatus("success");
      return;
    }
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          page: location.pathname,
          _subject: "New Lead — Website Popup",
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      remember({ submitted: true });
      setStatus("success");
      setTimeout(() => setOpen(false), 3200);
    } catch {
      setStatus("idle");
      setError("Something went wrong. Please try again, or email contact@safeops.io directly.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md border-border bg-card p-0 overflow-hidden">
        {/* copper accent bar */}
        <div className="h-1.5 w-full gradient-copper" />

        {status === "success" ? (
          <div className="px-6 py-10 text-center space-y-3">
            <CheckCircle2 className="h-14 w-14 text-primary mx-auto" />
            <h3 className="text-xl font-bold text-foreground">Thank you!</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Got it — our team will reach out within 24 hours to schedule your assessment.
            </p>
          </div>
        ) : (
          <div className="px-6 pb-6 pt-4">
            <DialogHeader className="space-y-3 mb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <DialogTitle className="text-xl font-bold leading-tight">
                Get a free security assessment
              </DialogTitle>
              <DialogDescription className="text-sm">
                Tell us where to reach you and we'll get back within 24 hours with a
                proposal tailored to your stack — no obligation.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
              {/* honeypot: visually hidden, off the tab order */}
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={honey}
                onChange={(e) => setHoney(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <Input
                placeholder="Full name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                aria-label="Full name"
              />
              <Input
                type="email"
                placeholder="Work email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-label="Work email"
              />
              <Input
                type="tel"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                aria-label="Phone number"
              />
              <Select value={form.service} onValueChange={(v) => update("service", v)}>
                <SelectTrigger aria-label="Service interested in">
                  <SelectValue placeholder="Service you're interested in" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <Checkbox
                  checked={consent}
                  onCheckedChange={(c) => {
                    setConsent(c === true);
                    setError(null);
                  }}
                  className="mt-0.5"
                />
                <span className="text-xs text-muted-foreground leading-snug">
                  I agree to be contacted by SafeOps about my enquiry.
                </span>
              </label>

              {error && <p className="text-xs text-destructive">{error}</p>}

              <Button
                type="submit"
                disabled={status === "submitting"}
                className="w-full gradient-copper text-white font-semibold py-5 glow-copper hover:opacity-90 transition-opacity"
              >
                {status === "submitting" ? "Sending..." : "Get my free assessment"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-[11px] text-center text-muted-foreground/70">
                We'll never share your details. No spam.
              </p>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
