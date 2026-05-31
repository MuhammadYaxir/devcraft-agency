"use client";

import React, { useRef, useState } from "react";
import { Star, Quote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Carter",
    role: "CEO, Nevora",
    review:
      "CraftODev built our SaaS platform and the results were beyond our expectations. Great communication and top-notch development skills!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sophia Bennett",
    role: "Founder, ShopKart",
    review:
      "The team delivered our e-commerce store on time with amazing UI/UX. Our sales increased by 40% after the launch!",
    rating: 5,
  },
  {
    id: 3,
    name: "Liam Anderson",
    role: "CTO, FinDash",
    review:
      "Highly professional and skilled developers. They understood our requirements perfectly and delivered a great product.",
    rating: 5,
  },
  {
    id: 4,
    name: "Marcus Thorne",
    role: "Product Lead, Vora",
    review:
      "Their attention to detail in animation, performance, and optimization is industry-leading. A true game changer.",
    rating: 4,
  },
  {
    id: 5,
    name: "Elena Vance",
    role: "Design Director, Flux",
    review:
      "Working with them was a breeze. They took our complex brand guidelines and created a beautiful, functional masterpiece.",
    rating: 5,
  },
  {
    id: 6,
    name: "David Choi",
    role: "Founder, Zenith",
    review:
      "The most reliable agency we've ever partnered with. They deliver high-quality code that is scalable and easy to maintain.",
    rating: 5,
  },
  {
    id: 7,
    name: "Sarah Jenkins",
    role: "COO, CloudScale",
    review:
      "Incredible workflow. They integrated seamlessly with our internal team and pushed our product to the next level.",
    rating: 5,
  },
  {
    id: 8,
    name: "Robert Fox",
    role: "CEO, Nexa",
    review:
      "The UI/UX is breathtaking. Our users have consistently praised the new interface since the day we launched.",
    rating: 4,
  },
  {
    id: 9,
    name: "Amara Okafor",
    role: "Founder, Bloom",
    review:
      "They turned our vision into a reality faster than we thought possible. Professionalism at its finest.",
    rating: 5,
  },
  {
    id: 10,
    name: "Lucas Meyer",
    role: "CTO, DataSync",
    review:
      "Superior technical knowledge. They handled our complex data migrations without a single second of downtime.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) return;

    const scrollPercent = scrollLeft / maxScroll;

    if (scrollPercent < 0.33) setActiveDot(0);
    else if (scrollPercent < 0.66) setActiveDot(1);
    else setActiveDot(2);
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;

    const { scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const target = maxScroll * (index / 2);

    scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#F8FBFF] py-24">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.06)_1px,transparent_1px)] bg-[size:52px_52px]" />

      {/* Soft Glows */}
      <div className="absolute left-[-120px] top-[-120px] h-[380px] w-[380px] rounded-full bg-blue-500/10 blur-[110px]" />
      <div className="absolute bottom-[-140px] right-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-blue-600 shadow-sm"
          >
            <Star size={14} className="fill-blue-500 text-blue-500" />
            Testimonials
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-5xl"
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600"
          >
            Trusted by founders, startups, and growing brands who need modern
            websites, SaaS platforms, automation systems, and scalable digital
            products.
          </motion.p>
        </div>

        {/* Testimonials Slider */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="scrollbar-hide flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto pb-12 active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="group relative flex-shrink-0 snap-center overflow-hidden rounded-[1.7rem] border border-blue-100 bg-white/85 p-7 shadow-[0_20px_60px_rgba(37,99,235,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_28px_80px_rgba(37,99,235,0.14)] w-[85vw] md:w-[calc(33.333%-16px)]"
            >
              {/* Card Gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.10),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < t.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-200"
                        }
                      />
                    ))}
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Quote size={18} />
                  </div>
                </div>

                <p className="mb-10 min-h-[120px] text-[15px] leading-relaxed text-slate-600">
                  &quot;{t.review}&quot;
                </p>

                <div className="mt-auto flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full border border-blue-100 bg-blue-50 shadow-sm">
                    <img
                      src={t.image ?? `https://i.pravatar.cc/150?u=${t.id}`}
                      alt={t.name}
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold tracking-wide text-slate-950">
                      {t.name}
                    </h4>
                    <p className="text-[12px] text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots + CTA */}
        <div className="flex flex-col items-center justify-center gap-7">
          <div className="flex justify-center gap-3">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`rounded-full transition-all duration-500 ${
                  activeDot === i
                    ? "h-3 w-8 bg-blue-600 shadow-[0_0_16px_rgba(37,99,235,0.45)]"
                    : "h-3 w-3 bg-blue-100 hover:bg-blue-200"
                }`}
                aria-label={`Go to testimonial group ${i + 1}`}
              />
            ))}
          </div>

          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Start Your Project
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}