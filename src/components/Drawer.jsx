import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function Drawer({ children, isOpen, setIsOpen }) {
  return (
    <main
      className={
        "fixed overflow-hidden z-10 inset-0 transform ease-in-out transition-all duration-500 " +
        (isOpen
          ? "transition-opacity opacity-100 duration-500 translate-x-0"
          : "transition-all delay-500 opacity-0 translate-x-full ")
      }
      style={isOpen ? {backdropFilter: "blur(5px)" } : {}}
    >
      <div className='pointer-events-none opacity-50 bg-blend-normal
        bg-noisy-texture fixed top-0 left-0 z-[1] h-screen w-screen'/>
      <section
        className={
          "w-full max-w-lg right-0 absolute bg-background bg h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
          (isOpen ? "translate-x-0 " : "translate-x-full ")
        }
      >
        <article className="relative w-full max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="p-5 mt-5 font-bold text-white text-lg">
            <div className="flex items-center justify-between">
              <a className="flex items-center gap-x-2 transition-colors" href="/" style={{ marginTop: "-3px" }}>
                <img className="w-8 h-8" src="/ProfilePic.png" alt="neo-jgrec-profile" />
              </a>
              <XMarkIcon
                className="w-6 h-6 text-gray-400 cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </div>
          </header>
          {children}
        </article>
      </section>
      <section
        className="w-full h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}

export default Drawer;
