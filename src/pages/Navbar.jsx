import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Switch from "../components/Switch";
import { ThemeContext } from "../components/ThemeContext";
import HamburgerMenu from "../components/HamburgerMenu";

function Navbar() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const pathname = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = (e) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="relative flex justify-between items-center text-black dark:text-gray-100 px-4 lg:py-2 py-4 my-5 lg:mx-auto mx-6 max-w-6xl border-[1px] rounded-lg">
      <div className="flex space-x-2">
        <img
          src={`/window${theme === "dark" ? "-white" : ""}.svg`}
          alt="window"
          className="w-6"
        />
        <img
          src={`/arrow${theme === "dark" ? "-white" : ""}.svg`}
          alt="arrow"
          className="w-6"
        />
        <Link to="/">
          <img
            src={`/home${theme === "dark" ? "-white" : ""}.svg`}
            alt="home"
            className="w-6"
          />
        </Link>
        <img
          src={`/slash${theme === "dark" ? "-white" : ""}.svg`}
          alt="slash"
          className="w-6"
        />
        <span className="font-medium font-mono">
          {pathname
            .split("/")
            .filter(Boolean)
            .map((segment, index, arr) => (
              <span key={index}>
                {segment}
                {index < arr.length - 1 && "/"}
              </span>
            ))}
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
        className={`${ menuOpen ? "flex" : "hidden"} lg:flex lg:space-x-4 space-y-4 font-medium lg:text-base absolute lg:relative 
        top-full lg:w-auto w-full flex-col lg:flex-row mt-2 lg:mt-0 p-4 lg:p-0 border lg:border-0 backdrop-blur-2xl
        rounded-lg lg:space-y-0 z-50 mx-[-1rem] lg:mx-0`}
      >
        <Link
          className="hover:bg-slate-200 dark:hover:bg-gray-700 rounded lg:p-2 transition w-full lg:w-auto text-center"
          to="/experience"
          onClick={() => setMenuOpen(false)}
        >
          Experience
        </Link>
        <Link
          className="hover:bg-slate-200 dark:hover:bg-gray-700 rounded lg:p-2 transition w-full lg:w-auto text-center"
          to="/projects"
          onClick={() => setMenuOpen(false)}
        >
          Projects
        </Link>
        <a
          className="hover:bg-slate-200 dark:hover:bg-gray-700 rounded lg:p-2 transition w-full lg:w-auto text-center"
          href="https://drive.google.com/file/d/1-1yuADnfEN_-HmDp1YpblfzNmIxVgGpR/view?usp=drive_link"
          target="_blank">
          Resume
        </a>
        <Link
          className="hover:bg-slate-200 dark:hover:bg-gray-700 rounded lg:p-2 transition w-full lg:w-auto text-center"
          to="/gallery"
          onClick={() => setMenuOpen(false)}
        >
          Gallery
        </Link>
        <div className="flex items-center justify-center lg:justify-start">
          <Switch />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;