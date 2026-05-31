"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaDribbble } from "react-icons/fa6";
import { Mail, Phone, MapPin, ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "AI Powered Websites", href: "/services" },
    { name: "Full Stack Development", href: "/services" },
    { name: "SaaS Development", href: "/services" },
    { name: "E-Commerce Stores", href: "/services" },
    { name: "Automation Systems", href: "/services" },
  ],
  socials: [
    { icon: FaGithub, href: "#" },
    { icon: FaLinkedinIn, href: "#" },
    { icon: FaXTwitter, href: "#" },
    { icon: FaDribbble, href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#F7FBFF] border-t border-blue-100">
      {/* Background Design */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-blue-100 shadow-[0_24px_80px_rgba(37,99,235,0.12)] p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-sm font-medium text-blue-700 mb-5">
              <Sparkles size={16} />
              Let’s build your online success
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-950 max-w-3xl">
              Ready to turn your idea into a powerful digital product?
            </h2>
          </div>

          <a
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-4 text-white font-semibold shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-all"
          >
            Start a Project
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-3">
  <Image
    src="/craftodev-logo.png"
    alt="CraftODev Logo"
    width={220}
    height={60}
    priority
    className="h-auto w-auto max-w-[220px]"
  />

  <p className="text-sm font-medium text-blue-600 ml-1">
    AI Powered Web Development Agency
  </p>
</div>

            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              We create modern websites, full-stack systems, automations, and
              conversion-focused digital experiences for growing brands.
            </p>

            <div className="flex gap-3">
              {footerLinks.socials.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ y: -4 }}
                  className="h-10 w-10 rounded-xl bg-white border border-blue-100 text-slate-600 flex items-center justify-center shadow-sm hover:text-blue-600 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <social.icon size={17} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="space-y-5"
          >
            <h3 className="text-slate-950 font-bold text-sm uppercase tracking-[0.2em]">
              Navigation
            </h3>

            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 text-sm hover:text-blue-600 transition-all duration-300 hover:pl-2"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="space-y-5"
          >
            <h3 className="text-slate-950 font-bold text-sm uppercase tracking-[0.2em]">
              Services
            </h3>

            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-600 text-sm hover:text-blue-600 transition-all duration-300 hover:pl-2"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            className="space-y-5"
          >
            <h3 className="text-slate-950 font-bold text-sm uppercase tracking-[0.2em]">
              Contact
            </h3>

            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-center gap-3">
                <Mail size={17} className="text-blue-600" />
                <span>craftodevtech@gmail.com</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={17} className="text-blue-600" />
                <span>+92 309 9997547</span>
              </li>

              <li className="flex items-start gap-3 leading-relaxed">
                <MapPin size={17} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Fateh Pur, Layyah, Pakistan</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="border-t border-blue-100 py-7 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2026 CraftODev. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}