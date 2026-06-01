import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { learnPages } from "@/data/learn-pages";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Learn = () => {
  useEffect(() => {
    document.title = "Learn | SafeOps — Continuous Penetration Testing Guides";
    const set = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    set(
      "description",
      "Guides to continuous penetration testing, automated pentesting, and offensive security automation — answers to the questions security leaders ask before adopting continuous validation."
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4">
              Learn
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-foreground">
              Guides to Continuous Security Validation
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Answers to the questions security leaders ask before adopting continuous penetration testing, automated pentesting, and offensive security automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {learnPages.map((p) => (
              <Link
                key={p.slug}
                to={`/learn/${p.slug}`}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.slice(0, 2).map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                  {p.status === "draft" && (
                    <Badge variant="outline" className="text-xs border-amber-400 text-amber-600">
                      In progress
                    </Badge>
                  )}
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {p.metaDescription}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read guide
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Learn;
