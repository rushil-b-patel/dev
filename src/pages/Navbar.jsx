import { useContext, useState, useEffect } from "react";
import Switch from "../components/Switch";
import { ThemeContext } from "../components/ThemeContext";
import HamburgerMenu from "../components/HamburgerMenu";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Tech-Stack", href: "#tech-stack" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "PR's", href: "#github" },
];

function Navbar() {
  const { theme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const handleMenuToggle = (e) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          const activeLink = navLinks.find(link => link.href === `#${section.id}`);
          if (activeLink) {
            setActiveSection(activeLink.name);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 flex justify-between items-center text-black dark:text-gray-100 px-6 py-3 mx-auto max-w-5xl border border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl shadow-sm transition-all duration-300">
      <div className="flex items-center gap-4">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group-hover:scale-105 transition-transform border border-gray-200 dark:border-neutral-700">
             <span className="font-bold text-lg font-mono">R</span>
          </div>
        </a>
        <span className="hidden lowercase sm:block text-sm font-medium text-gray-500 dark:text-gray-400 border-l border-gray-300 dark:border-gray-600 pl-4">
          / {activeSection}
        </span>
      </div>
      <div className="lg:hidden">
        <HamburgerMenu
          isOpen={menuOpen}
          isDark={theme === "dark"}
          onClick={handleMenuToggle}
        />
      </div>
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } absolute top-full left-0 right-0 mt-4 flex-col gap-4 p-6 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-xl lg:hidden`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`text-center py-2 rounded-lg text-lg font-medium transition-colors ${
              activeSection === link.name
                ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800/50 hover:text-gray-900 dark:hover:text-white"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <a
          className="text-center py-2 rounded-lg text-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800/50 hover:text-gray-900 dark:hover:text-white transition-colors"
          href="https://drive.google.com/file/d/1O8PvoXuIFKahQ2JlpMlVsBRoDIVGpb5e/view?usp=drive_link"
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
        <div className="flex justify-center pt-2">
           <Switch />
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-6">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              activeSection === link.name
                ? "text-gray-900 dark:text-white font-semibold"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {link.name}
          </a>
        ))}
         <a
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800/50 hover:text-gray-900 dark:hover:text-white transition-colors border border-transparent hover:border-gray-200 dark:hover:border-neutral-700"
          href="https://drive.google.com/file/d/1O8PvoXuIFKahQ2JlpMlVsBRoDIVGpb5e/view?usp=drive_link"
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
        <Switch />
      </div>
    </nav>
  );
}

export default Navbar;