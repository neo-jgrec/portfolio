import React, { useState } from "react";

function Header() {
  const [headerClass, setHeaderClass] = useState('border-gray-800 py-5 border-transparent my-3');

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
            <img className="w-8 h-8" src="ProfilePic.png" alt="neo-jgrec-profile" />
            <p className="text-2xl font-bold text-gray-200 hidden sm:block">Jean-Yanis JEFFROY</p>
          </a>
        </div>
        <div className="md:block">
          <a className="px-3 py-2 font-medium text-gray-400 hover:text-primary transition-colors duration-100 ease-in-out" target="_blank" rel="noreferrer" href="https://github.com/neo-jgrec">Github</a>
          <a className="px-3 py-2 font-medium text-gray-400 hover:text-primary transition-colors duration-100 ease-in-out" target="_blank" rel="noreferrer" href="https://linkedin.com/in/jean-yanis-jeffroy/">LinkedIn</a>
          <a className="px-3 py-2 font-medium text-gray-400 hover:text-primary transition-colors duration-100 ease-in-out" href="mailto:jean-yanis.jeffroy@epitech.eu">Mail</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
