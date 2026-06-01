import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLearnPage, learnPages } from "@/data/learn-pages";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getBlogPost } from "@/data/blog-posts";

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

const LearnPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? getLearnPage(slug) : undefined;

  useEffect(() => {
    if (!page) return;

    const url = `https://safeops.io/learn/${page.slug}`;
    document.title = `${page.title} | SafeOps`;
    setMeta("description", page.metaDescription);
    setMeta("og:title", page.title, true);
    setMeta("og:description", page.metaDescription, true);
    setMeta("og:url", url, true);
    setMeta("og:type", "article", true);
    setMeta("twitter:title", page.title);
    setMeta("twitter:description", page.metaDescription);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    setJsonLd("ld-article", {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.title,
      description: page.metaDescription,
      datePublished: page.lastUpdated,
      dateModified: page.lastUpdated,
      author: { "@type": "Organization", name: "SafeOps" },
      publisher: {
        "@type": "Organization",
        name: "SafeOps",
        url: "https://safeops.io",
      },
      mainEntityOfPage: url,
    });

    if (page.faq.length > 0) {
      setJsonLd("ld-faq", {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      });
    }

    setJsonLd("ld-learn-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://safeops.io/" },
        { "@type": "ListItem", position: 2, name: "Learn", item: "https://safeops.io/learn" },
        { "@type": "ListItem", position: 3, name: page.title, item: url },
      ],
    });

    return () => {
      ["ld-article", "ld-faq", "ld-learn-breadcrumb"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, [page]);

  if (!page) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Page not found</h1>
          <Link to="/learn" className="text-primary hover:underline">
            ← Back to Learn
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedBlog = page.relatedBlogSlugs.map(getBlogPost).filter(Boolean);
  const relatedLearn = page.relatedLearnSlugs
    .map((s) => learnPages.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <article className="max-w-3xl mx-auto">
          <Link
            to="/learn"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Learn
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {page.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {page.status === "draft" && (
              <Badge variant="outline" className="text-xs border-amber-400 text-amber-600">
                In progress
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {page.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-10 border-b border-border">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              Last updated{" "}
              {new Date(page.lastUpdated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* TL;DR */}
          <div className="mb-10 p-6 rounded-xl border border-primary/20 bg-primary/[0.04]">
            <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              TL;DR
            </div>
            <ul className="space-y-2">
              {page.tldr.map((point, i) => (
                <li key={i} className="text-sm md:text-base text-foreground leading-relaxed pl-5 relative">
                  <span className="absolute left-0 top-[10px] w-2 h-2 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Short answer */}
          <div className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
              The Short Answer
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {page.shortAnswer}
            </p>
          </div>

          {/* Body */}
          <div className="blog-prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => {
                  const text = String(children).replace(/[*`]/g, "").trim();
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  return <h2 id={id}>{children}</h2>;
                },
                h3: ({ children }) => {
                  const text = String(children).replace(/[*`]/g, "").trim();
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                  return <h3 id={id}>{children}</h3>;
                },
              }}
            >
              {page.content}
            </ReactMarkdown>
          </div>

          {/* FAQ */}
          {page.faq.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {page.faq.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-base md:text-lg font-semibold">
                      {f.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                      {f.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* Related */}
          {(relatedBlog.length > 0 || relatedLearn.length > 0) && (
            <div className="mt-16 grid md:grid-cols-2 gap-6">
              {relatedLearn.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                    Related Guides
                  </h3>
                  <ul className="space-y-2">
                    {relatedLearn.map((r) => r && (
                      <li key={r.slug}>
                        <Link
                          to={`/learn/${r.slug}`}
                          className="text-sm md:text-base text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                        >
                          {r.title}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {relatedBlog.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                    Related Reading
                  </h3>
                  <ul className="space-y-2">
                    {relatedBlog.map((b) => b && (
                      <li key={b.slug}>
                        <Link
                          to={`/blog/${b.slug}`}
                          className="text-sm md:text-base text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                        >
                          {b.title}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 p-6 md:p-8 rounded-xl border border-primary/20 bg-primary/[0.03] text-center space-y-4">
            <h3 className="text-xl font-bold text-foreground">See SafeOps in action</h3>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Automated continuous penetration testing platform. Get a targeted assessment proposal within 24 hours.
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

export default LearnPage;
