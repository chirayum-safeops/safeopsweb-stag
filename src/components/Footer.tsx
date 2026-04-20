import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import safeopsLogo from "@/assets/safeops-logo.svg";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={safeopsLogo} alt="SafeOps" className="h-7" />
            </Link>
            <a
              href="https://www.linkedin.com/company/safeopssecurity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="SafeOps on LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="/#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="/#industries" className="hover:text-foreground transition-colors">Industries</a>
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <a href="/#faq" className="hover:text-foreground transition-colors">FAQ</a>
            <a href="/#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SafeOps. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
