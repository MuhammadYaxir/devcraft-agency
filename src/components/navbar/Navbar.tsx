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

  const isTransparent = transparent;

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-[100] w-full transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "border-b border-black/[0.04] bg-white/95 shadow-[0_10px_35px_rgba(15,23,42,0.04)] backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-[70px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center">
          <Image
            src={
              isTransparent
                ? "/craftodev-logo-white.webp"
                : "/craftodev-logo.webp"
            }
            alt="CraftoDev"
            width={170}
            height={48}
            priority
            className="h-auto w-auto max-w-[132px] object-contain"
          />
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative text-[9px] font-black uppercase tracking-[0.12em] transition-colors ${
                  isActive
                    ? "text-[#1463FF]"
                    : isTransparent
                      ? "text-white hover:text-[#1463FF]"
                      : "text-[#05070D] hover:text-[#1463FF]"
                }`}
              >
                {link.name}

                <span
                  className={`absolute -bottom-[9px] left-0 h-[2px] rounded-full bg-[#1463FF] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex">
          <Link
            href="/contact"
            className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[9px] font-black uppercase tracking-[0.12em] transition-all duration-300 ${
              isTransparent
                ? "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-[#05070D]"
                : "bg-gradient-to-r from-[#1463FF] to-[#05C8F7] text-white shadow-[0_14px_30px_rgba(20,99,255,0.25)] hover:-translate-y-0.5"
            }`}
          >
            Start a Project
            <ArrowUpRight size={13} strokeWidth={3} />
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
            isTransparent
              ? "border-white/25 text-white"
              : "border-[#05070D]/15 bg-white text-[#05070D]"
          }`}
          aria-label="Open menu"
        >
          <Menu size={19} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[101] bg-black/50 backdrop-blur-sm lg:hidden"
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
                  src="/craftodev-logo-white.webp"
                  alt="CraftoDev"
                  width={180}
                  height={50}
                  priority
                  className="h-auto w-auto max-w-[140px] object-contain"
                />

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15"
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
                        className={`flex items-center justify-between border-b pb-5 text-3xl font-black uppercase ${
                          isActive
                            ? "border-[#1463FF] text-[#1463FF]"
                            : "border-white/10 text-white"
                        }`}
                      >
                        {link.name}
                        <ArrowUpRight size={24} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1463FF] to-[#05C8F7] px-6 py-4 text-xs font-black uppercase tracking-[0.12em] text-white"
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