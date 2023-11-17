import React, { useState } from "react";
import Drawer from "./Drawer";
import { Bars3Icon } from "@heroicons/react/24/outline";

function Header() {
  const [headerClass, setHeaderClass] = useState('border-gray-800 py-5 border-transparent my-3');
  const [isOpen, setIsOpen] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 5) {
      setHeaderClass("bg-[#151515] shadow-md border-b-[1px] border-gray-600 py-2 my-0");
    } else {
      setHeaderClass("py-5 border-transparent my-3");
    }
  });
  return (
    <header className={`fixed z-50 flex items-center justify-center w-full transition-all duration-500 ease-in-out ${headerClass}`}>
      <div className="flex items-center justify-between w-full max-w-6xl px-4 mx-auto md:px-8">
        <div className="flex items-center p-2">
          <a className="flex items-center gap-x-2 transition-colors" href="/" style={{ marginTop: "-3px" }}>
            <img className="w-8 h-8" src="/ProfilePic.png" alt="neo-jgrec-profile" />
            <p className="text-2xl font-bold text-gray-200 hidden sm:block">Jean-Yanis JEFFROY</p>
          </a>
        </div>
        <div className="md:block hidden md:visible">
          <a className="px-3 py-2 font-medium text-gray-400 hover:text-primary transition-colors duration-100 ease-in-out" target="_blank" rel="noreferrer" href="https://github.com/neo-jgrec">Github</a>
          <a className="px-3 py-2 font-medium text-gray-400 hover:text-primary transition-colors duration-100 ease-in-out" target="_blank" rel="noreferrer" href="https://linkedin.com/in/jean-yanis-jeffroy/">LinkedIn</a>
          <a className="px-3 py-2 font-medium text-gray-400 hover:text-primary transition-colors duration-100 ease-in-out" href="mailto:jean-yanis.jeffroy@epitech.eu">Mail</a>
          <a className="ml-5 font-medium text-lg text-primary hover:text-blue-400 transition duration-100 ease-in-out mt-10" href="/contact">Contact Me</a>
        </div>
      </div>
      <Bars3Icon className="md:hidden w-8 h-8 text-gray-200 m-5" onClick={() => setIsOpen(true)} />
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <a className="px-3 font-medium text-gray-400 hover:text-primary transition-colors duration-100 ease-in-out" target="_blank" rel="noreferrer" href="https://github.com/neo-jgrec">Github</a>
        <hr className="border-gray-600 my-2" />
        <a className="px-3 font-medium text-gray-400 hover:text-primary transition-colors duration-100 ease-in-out" target="_blank" rel="noreferrer" href="https://linkedin.com/in/jean-yanis-jeffroy/">LinkedIn</a>
        <hr className="border-gray-600 my-2" />
        <a className="px-3 font-medium text-gray-400 hover:text-primary transition-colors duration-100 ease-in-out" href="mailto:jean-yanis.jeffroy@epitech.eu">Mail</a>
        <hr className="border-gray-600 my-2" />
        <a className="px-3 font-medium text-lg text-primary hover:text-blue-400 transition duration-100 ease-in-out mt-10" href="/contact">Contact Me</a>
      </Drawer>
    </header>
  );
}

export default Header;
