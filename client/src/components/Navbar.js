import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between item-center h-16 bg-white text-black relative shadow-sm font-mono" role="navation">
      <Link to="/" className="pl-8">
        clothes(ex)press
      </Link>
      <div className="px-4 cursor-pointer md:hidden">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </div>
      <div className="pr-8 md:block hidden">
        <Link className="p-4" to="/">Home</Link>
        <Link className="p-4" to="/">Create an Account</Link>
        <Link className="p-4" to="/">Sign In</Link>

      </div>
    </nav>
  );
};

export default Navbar;
