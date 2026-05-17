"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  Code2,
  Layers,
  ShoppingCart,
  Palette,
  Zap,
  Globe,
  Cpu,
  Settings,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Web Development",
    description:
      "Crafting high-performance, responsive websites using the latest modern frameworks.",
    icon: <Globe size={24} />,
  },
  {
    title: "Full Stack Apps",
    description:
      "Scalable end-to-end applications with robust architectures and seamless integrations.",
    icon: <Layers size={24} />,
  },
  {
    title: "E-Commerce",
    description:
      "Custom online storefronts designed to maximize conversions and user engagement.",
    icon: <ShoppingCart size={24} />,
  },
  {
    title: "UI/UX Design",
    description:
      "User-centric interfaces that blend stunning aesthetics with intuitive functionality.",
    icon: <Palette size={24} />,
  },
  {
    title: "SaaS Development",
    description:
      "Building cloud-based software solutions with multi-tenancy and subscription models.",
    icon: <Cpu size={24} />,
  },
  {
    title: "API Development",
    description:
      "Secure, efficient, and well-documented APIs to power your digital ecosystem.",
    icon: <Code2 size={24} />,
  },
  {
    title: "Performance & SEO",
    description:
      "Optimizing speed and visibility to ensure your brand stands out in search results.",
    icon: <Zap size={24} />,
  },
  {
    title: "Maintenance",
    description:
      "Continuous support and updates to keep your platform secure and up-to-date.",
    icon: <Settings size={24} />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const ServicesSection = () => {
  return (
    <section className="relative w-full py-24 bg-[#050816] overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-400"
          >
            OUR SERVICES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 tracking-tight"
          >
            What We Can Do For You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-400 text-lg"
          >
            We combine luxury aesthetics with cutting-edge technology to help
            your brand lead the future.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative p-[1px] rounded-2xl overflow-hidden"
            >
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-purple-600/0 to-purple-600/0 group-hover:from-purple-600 group-hover:via-blue-500 group-hover:to-purple-600 transition-all duration-500 opacity-0 group-hover:opacity-100" />

              {/* Card */}
              <div className="relative h-full bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-start shadow-2xl group-hover:shadow-purple-500/10 transition-all duration-500">
                
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* CTA */}
                <button className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 group-hover:text-white transition-colors">
                  Learn More
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;