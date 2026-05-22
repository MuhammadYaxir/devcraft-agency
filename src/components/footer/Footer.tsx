"use client";

import React from 'react';
import { motion } from 'framer-motion';
// Use Font Awesome for Brands, Lucide for UI
import { FaGithub, FaLinkedinIn, FaXTwitter, FaDribbble } from 'react-icons/fa6';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  navigation: [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
    { name: "Projects", href: "#" },
    { name: "Contact", href: "#" },
  ],
  services: [
    { name: "Web Development", href: "#" },
    { name: "UI/UX Design", href: "#" },
    { name: "SaaS Development", href: "#" },
    { name: "E-Commerce", href: "#" },
    { name: "SEO Optimization", href: "#" },
  ],
  socials: [
    { icon: FaGithub, href: "#" },
    { icon: FaLinkedinIn, href: "#" },
    { icon: FaXTwitter, href: "#" },
    { icon: FaDribbble, href: "#" },
  ]
};

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#050816] pt-20 overflow-hidden">
      {/* Top Border Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent shadow-[0_-5px_20px_rgba(147,51,234,0.3)]" />
      
      {/* Subtle Background Lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Socials */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white tracking-tighter">
              YY<span className="text-purple-500">Devs</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Crafting high-performance digital experiences for forward-thinking brands. 
              We blend engineering excellence with futuristic design.
            </p>
            <div className="flex gap-4">
              {footerLinks.socials.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ scale: 1.2, color: "#a855f7" }}
                  className="text-gray-400 transition-colors p-2 bg-white/5 rounded-lg hover:bg-white/10 border border-white/10"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-white font-semibold uppercase tracking-widest text-xs">Navigation</h3>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 text-sm hover:text-purple-400 transition-all duration-300 hover:pl-2">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-white font-semibold uppercase tracking-widest text-xs">Services</h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 text-sm hover:text-purple-400 transition-all duration-300 hover:pl-2">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-white font-semibold uppercase tracking-widest text-xs">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-purple-500" />
                <span>hello@devcraft.agency</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-purple-500" />
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-center gap-3 leading-relaxed">
                <MapPin size={16} className="text-purple-500 flex-shrink-0" />
                <span>D:/Portfolio Project/devcraft-agency<br/>Creative Hub</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© 2026 DevCraft. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}