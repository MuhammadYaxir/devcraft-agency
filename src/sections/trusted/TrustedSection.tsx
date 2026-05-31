"use client";

import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    damping: 20,
    stiffness: 150,
  });

  const smoothY = useSpring(mouseY, {
    damping: 20,
    stiffness: 150,
  });

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      onMouseMove={onMouseMove}
      className="group/section relative overflow-hidden bg-white py-10"
    >
      {/* Soft blue ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1463FF]/5 blur-[120px]" />

      {/* Interactive cursor glow */}
      <motion.div
        className="pointer-events-none absolute z-0 h-80 w-80 rounded-full bg-[#1463FF]/10 opacity-0 blur-[100px] transition-opacity duration-500 group-hover/section:opacity-100"
        style={{
          left: smoothX,
          top: smoothY,
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Hover Spotlight */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background: useTransform(
                [smoothX, smoothY],
                ([x, y]) =>
                  `radial-gradient(
                    450px circle at ${x}px ${y}px,
                    rgba(20,99,255,0.06),
                    transparent 45%
                  )`
              ),
            }}
          />

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-20">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.25,
                  }}
                  whileHover={{
                    scale: 1.08,
                  }}
                  className="flex cursor-pointer items-center justify-center opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`${
                      partner.isVercel
                        ? "h-9 md:h-10"
                        : "h-11 md:h-12"
                    } w-auto object-contain opacity-90 transition-all duration-500 group-hover:opacity-100`}
                  />

                  <div className="absolute inset-0 rounded-full bg-[#1463FF]/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedSection;