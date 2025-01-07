import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Switch from '../components/Switch';
import { ThemeContext } from '../components/ThemeContext';

function Navbar() {

    const { theme } = useContext(ThemeContext);
    const location = useLocation();
    const pathname = location.pathname;

  return (
    <nav className="flex justify-between items-center text-black dark:text-gray-100 px-4 py-2 my-5 lg:mx-auto mx-6 max-w-6xl border-[1px] rounded-lg">
      <div className="flex space-x-2">
        {theme === "light" ? (
          <img src="/window.svg" alt="window" className="w-6" />
        ) : (
          <img src="/window-white.svg" alt="window" className="w-6" />
        )}
        {theme === "light" ? (
          <img src="/arrow.svg" alt="arrow" className="w-6" />
        ) : (
          <img src="/arrow-white.svg" alt="arrow" className="w-6" />
        )}
        <Link to="/">
          <img src={theme === 'light' ? '/home.svg' : '/home-white.svg'} alt="home" className="w-6" />
        </Link>
        <img src={theme === 'light' ? '/slash.svg' : '/slash-white.svg'} alt="slash" className="w-6" />
        {pathname && (
            <span className="font-medium font-mono" style={{ margin: 0 }}>
            {pathname.split("/")}
          </span>
        )}
      </div>
      <div className="flex space-x-4 font-medium lg:text-base">
        <Link
          className="hover:bg-slate-200 rounded p-1 lg:p-2 transition"
          to="/about"
        >
          About
        </Link>
        <Link
          className="hover:bg-slate-200 rounded p-1 lg:p-2 transition"
          to="/project"
        >
          Project
        </Link>
        <div className="flex items-center">
          <Switch />
        </div>
      </div>
    </nav>
  );
}

export default Navbar