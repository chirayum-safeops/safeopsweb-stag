import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPost } from "@/data/blog-posts";
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        <article className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-10 border-b border-border">
            <span>{post.author}</span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          {post.coverImage && (
            <div className="rounded-xl overflow-hidden mb-10">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full aspect-[16/7] object-cover"
              />
            </div>
          )}

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
              {post.content}
            </ReactMarkdown>
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 md:p-8 rounded-xl border border-primary/20 bg-primary/[0.03] text-center space-y-4">
            <h3 className="text-xl font-bold text-foreground">Ready to secure your attack surface?</h3>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Get a targeted security assessment proposal within 24 hours — customized to your stack, no obligation.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 gradient-copper text-white font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity"
            >
              Get in Touch
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
