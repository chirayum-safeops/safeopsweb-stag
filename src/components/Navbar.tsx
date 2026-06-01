import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Search, Lock, Target, Globe, Server, Code, FileCode, Shield, BookOpen, GraduationCap } from "lucide-react";

import safeopsLogo from "@/assets/safeops-logo.svg";

const navLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Industries", href: "/#industries" },
  { label: "Results", href: "/#case-studies" },
  { label: "FAQ", href: "/#faq" },
];

const resourcesItems = [
  { label: "Blog", href: "/blog", icon: BookOpen, desc: "Latest insights on offensive security and continuous validation" },
  { label: "Learn", href: "/learn", icon: GraduationCap, desc: "Guides to continuous penetration testing and pentesting automation" },
];

const platformItems = [
  { label: "Continuous Penetration Testing", href: "/#services", icon: Target, desc: "Automated, AI-driven offensive security across your stack" },
  { label: "Security Assessment Reports", href: "/#deliverables", icon: Shield, desc: "Detailed findings with actionable remediation" },
  
  { label: "Platform Dashboard", href: "/#platform-in-action", icon: Search, desc: "Real-time visibility into your security posture" },
];

const useCasesGroups = [
  {
    heading: "By Role",
    items: [
      { label: "For CISOs & Security Leaders", href: "/#stakeholders", icon: Shield },
      { label: "For CTOs & Engineering", href: "/#stakeholders", icon: Code },
      { label: "For Compliance Teams", href: "/#stakeholders", icon: Lock },
      { label: "For CEOs & CFOs", href: "/#stakeholders", icon: Globe },
    ],
  },
  {
    heading: "By Challenge",
    items: [
      { label: "Expanding Attack Surfaces", href: "/#services", icon: Server },
      { label: "API Security Testing", href: "/#services", icon: Globe },
      { label: "Vulnerability Chaining", href: "/#services", icon: Target },
      { label: "Continuous Code Security", href: "/#services", icon: FileCode },
    ],
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHashLink = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const [path, hash] = href.split("#");
    const targetPath = path || "/";
    
    if (location.pathname === targetPath) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(targetPath);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img src={safeopsLogo} alt="SafeOps" className="h-8" />
        </Link>

        <div className="hidden lg:flex items-center justify-center gap-6 flex-1">
          {/* Platform Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("platform")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
              Platform <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === "platform" ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === "platform" && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-card p-2 shadow-lg border border-border rounded-lg animate-fade-in-up">
                {platformItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-muted transition-colors group"
                    onClick={(e) => { handleHashLink(e, item.href); setOpenDropdown(null); }}
                  >
                    <item.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Use Cases Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("usecases")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
              Use Cases <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === "usecases" ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === "usecases" && (
              <div className="absolute top-full -left-20 mt-2 bg-card p-4 shadow-lg border border-border rounded-lg animate-fade-in-up" style={{ width: "580px" }}>
                <div className="grid grid-cols-2 gap-4">
                  {useCasesGroups.map((group) => (
                    <div key={group.heading}>
                      <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 px-2">{group.heading}</div>
                      {group.items.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
                          onClick={(e) => { handleHashLink(e, item.href); setOpenDropdown(null); }}
                        >
                          <item.icon className="h-3.5 w-3.5 text-primary shrink-0" />
                          {item.label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) =>
            link.href.startsWith("/") && !link.href.includes("#") ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={(e) => link.href.includes("#") ? handleHashLink(e, link.href) : undefined}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            )
          )}

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("resources")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">
              Resources <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === "resources" ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === "resources" && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-card p-2 shadow-lg border border-border rounded-lg animate-fade-in-up">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-muted transition-colors group"
                    onClick={() => setOpenDropdown(null)}
                  >
                    <item.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild size="sm" className="gradient-copper font-semibold px-5 hover:opacity-90 transition-opacity">
            <a href="/#contact" onClick={(e) => handleHashLink(e, "/#contact")}>Sign Up Free</a>
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground p-2"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border px-4 py-6 space-y-3 max-h-[80vh] overflow-y-auto shadow-lg">
          {/* Mobile Platform */}
          <div>
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "platform" ? null : "platform")}
              className="flex items-center justify-between w-full text-base font-medium text-foreground py-2"
            >
              Platform <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === "platform" ? "rotate-180" : ""}`} />
            </button>
            {mobileExpanded === "platform" && (
              <div className="pl-4 space-y-2 pb-2">
                {platformItems.map((item) => (
                  <a key={item.label} href={item.href} onClick={(e) => { handleHashLink(e, item.href); setMobileOpen(false); }} className="block text-sm text-muted-foreground hover:text-foreground py-1">
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Use Cases */}
          <div>
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "usecases" ? null : "usecases")}
              className="flex items-center justify-between w-full text-base font-medium text-foreground py-2"
            >
              Use Cases <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === "usecases" ? "rotate-180" : ""}`} />
            </button>
            {mobileExpanded === "usecases" && (
              <div className="pl-4 space-y-3 pb-2">
                {useCasesGroups.map((group) => (
                  <div key={group.heading}>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{group.heading}</div>
                    {group.items.map((item) => (
                      <a key={item.label} href={item.href} onClick={(e) => { handleHashLink(e, item.href); setMobileOpen(false); }} className="block text-sm text-muted-foreground hover:text-foreground py-1">
                        {item.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) =>
            link.href.startsWith("/") && !link.href.includes("#") ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={(e) => { if (link.href.includes("#")) handleHashLink(e, link.href); setMobileOpen(false); }}
                className="block text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </a>
            )
          )}

          {/* Mobile Resources */}
          <div>
            <button
              onClick={() => setMobileExpanded(mobileExpanded === "resources" ? null : "resources")}
              className="flex items-center justify-between w-full text-base font-medium text-foreground py-2"
            >
              Resources <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === "resources" ? "rotate-180" : ""}`} />
            </button>
            {mobileExpanded === "resources" && (
              <div className="pl-4 space-y-2 pb-2">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm text-muted-foreground hover:text-foreground py-1"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 space-y-2">
            <Button asChild className="w-full gradient-copper font-semibold">
              <a href="/#contact" onClick={(e) => { handleHashLink(e, "/#contact"); setMobileOpen(false); }}>Sign Up Free</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
