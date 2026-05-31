"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isWorkPage =
    pathname === "/projects" || pathname.startsWith("/projects/");

  const isTransparent = transparent || isWorkPage;

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-[100] w-full transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "border-b border-black/[0.06] bg-white/90 backdrop-blur-2xl"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
        >
          <Image
            src={isTransparent ? "/craftodev-logo-white.png" : "/craftodev-logo.png"}
            alt="CraftoDev"
            width={220}
            height={60}
            priority
            className="h-auto w-[160px] object-contain lg:w-[180px]"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative text-[11px] font-black uppercase tracking-[0.08em] transition-colors ${
                  isActive
                    ? "text-[#1463FF]"
                    : isTransparent
                    ? "text-white hover:text-[#1463FF]"
                    : "text-[#05070D] hover:text-[#1463FF]"
                }`}
              >
                {link.name}

                <span
                  className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-[#1463FF] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center lg:flex">
          <Link
            href="/contact"
            className={`group flex items-center gap-2 rounded-full px-6 py-3 text-[11px] font-black uppercase tracking-[0.08em] transition-all duration-300 ${
              isTransparent
                ? "border border-white/25 bg-transparent text-white hover:border-white hover:bg-white hover:text-[#05070D]"
                : "bg-[#05070D] text-white hover:bg-[#1463FF]"
            }`}
          >
            Start a Project
            <ArrowUpRight
              size={15}
              strokeWidth={3}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(true)}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
            isTransparent
              ? "border-white/25 text-white hover:border-white"
              : "border-[#05070D]/15 text-[#05070D] hover:border-[#1463FF] hover:text-[#1463FF]"
          }`}
          aria-label="Open menu"
        >
          <Menu size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[101] bg-black/40 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              className="fixed right-0 top-0 z-[102] flex h-screen w-full max-w-md flex-col bg-[#05070D] px-8 py-7 text-white lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Image
                  src="/craftodev-logo-white.png"
                  alt="CraftoDev"
                  width={180}
                  height={50}
                  priority
                  className="h-auto w-[150px] object-contain"
                />

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white hover:text-black"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-16 flex flex-col gap-6">
                {navLinks.map((link, index) => {
                  const isActive = isActiveLink(link.href);

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center justify-between border-b pb-5 text-3xl font-black uppercase tracking-tight transition-colors ${
                          isActive
                            ? "border-[#1463FF] text-[#1463FF]"
                            : "border-white/10 text-white hover:text-[#1463FF]"
                        }`}
                      >
                        {link.name}
                        <ArrowUpRight
                          size={24}
                          className={`transition-all group-hover:translate-x-1 group-hover:-translate-y-1 ${
                            isActive ? "opacity-100" : "opacity-40"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-auto flex items-center justify-center gap-2 rounded-full bg-[#1463FF] px-6 py-4 text-xs font-black uppercase tracking-[0.12em] text-white"
              >
                Start a Project
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;