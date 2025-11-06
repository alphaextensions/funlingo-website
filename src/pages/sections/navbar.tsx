import logo from "../../assets/logo.png";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface NavbarProps {
  currentPage?: string; // Optional prop to indicate current page
}

const Navbar = ({ currentPage = "/" }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items with active state based on currentPage prop
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/pricing" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Feedback", href: "/feedback" },
    { label: "About", href: "/about" },
  ].map(item => ({
    ...item,
    active: currentPage === item.href
  }));

  return (
    <header
      className={`relative self-stretch w-full h-16 bg-[rgba(0,0,0,0.8)] backdrop-blur-[15px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(15px)_brightness(100%)] border-b border-[#ffffff1a] sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-2xl shadow-purple-500/20" : ""
      }`}
    >
      <div className="flex items-center justify-between h-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="/"
          className="animate-fade-in-down hover:scale-105 transition-transform duration-300"
        >
          <h1 className="relative flex items-center justify-center w-fit bg-[linear-gradient(135deg,rgba(2120,2120,2120,0)_0%,#C642FC_40%,#7A1CAC_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-heading-h5 font-[number:var(--heading-h5-font-weight)] text-transparent text-[length:var(--heading-h5-font-size)] tracking-[var(--heading-h5-letter-spacing)] leading-[var(--heading-h5-line-height)] whitespace-nowrap [font-style:var(--heading-h5-font-style)]">
            <img
              src={logo}
              width={120}
              alt="Funlingo Logo"
              className="drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
            />
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`relative flex items-center justify-center w-fit font-inter font-medium ${
                item.active ? "text-textwhite" : "text-textbody"
              } text-base tracking-[0.16px] leading-[26px] whitespace-nowrap hover:text-textwhite transition-all duration-300 group animate-fade-in-down`}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] transition-all duration-300 group-hover:w-full ${
                  item.active ? "w-full" : ""
                }`}
              ></span>
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div
          className="hidden md:block animate-fade-in-down"
          style={{ animationDelay: "700ms" }}
        >
          <Button className="bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] h-10 px-5 py-2 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 group overflow-hidden relative">
            <span className="relative z-10 flex items-center justify-center w-fit font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textwhite text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] whitespace-nowrap [font-style:var(--body-normal-medium-font-style)]">
              Download Extension
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#7A1CAC] to-[#C642FC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-[rgba(2120,2120,2120,0.1)] hover:bg-[rgba(2120,2120,2120,0.2)] transition-all duration-300 group animate-fade-in-down"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-[2px] bg-textwhite shadow-sm shadow-white/50 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"
            }`}
          ></span>
          <span
            className={`w-5 h-[2px] bg-textwhite shadow-sm shadow-white/50 transition-all duration-300 my-1.5 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`w-5 h-[2px] bg-textwhite shadow-sm shadow-white/50 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-[rgba(0,0,0,0.95)] backdrop-blur-xl border-b border-[#ffffff1a] transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center py-6 space-y-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`relative flex items-center justify-center w-fit font-inter font-medium text-lg ${
                item.active ? "text-textwhite" : "text-textbody"
              } hover:text-textwhite transition-all duration-300 transform hover:scale-105`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
              {item.active && (
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-[#C642FC] to-[#7A1CAC] rounded-full"></span>
              )}
            </a>
          ))}
          <Button className="bg-[linear-gradient(135deg,#C642FC_0%,#7A1CAC_100%)] h-12 px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 mt-4">
            <span className="relative flex items-center justify-center w-fit font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-textwhite text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] whitespace-nowrap [font-style:var(--body-normal-medium-font-style)]">
              Download Extension
            </span>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;