"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  {
    name: "Vercel",
    logo: "https://www.vectorlogo.zone/logos/vercel/vercel-ar21.svg",
    isVercel: true,
  },
  {
    name: "Next.js",
    logo: "https://www.vectorlogo.zone/logos/nextjs/nextjs-ar21.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-ar21.svg",
  },
  {
    name: "Supabase",
    logo: "https://www.vectorlogo.zone/logos/supabase/supabase-ar21.svg",
  },
  {
    name: "MongoDB",
    logo: "https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg",
  },
  {
    name: "Stripe",
    logo: "https://www.vectorlogo.zone/logos/stripe/stripe-ar21.svg",
  },
];

const TrustedSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-10">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1463FF]/5 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-20">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                  ease: "easeOut",
                }}
                className="group relative flex items-center justify-center opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={64}
                  loading="lazy"
                  sizes="160px"
                  className={`w-auto object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100 ${
                    partner.isVercel ? "h-9 md:h-10" : "h-11 md:h-12"
                  }`}
                />

                <div className="pointer-events-none absolute inset-0 rounded-full bg-[#1463FF]/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedSection;