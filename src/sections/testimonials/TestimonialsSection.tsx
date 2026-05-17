"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { id: 1, name: "James Carter", role: "CEO, Nevora", review: "DevCraft built our SaaS platform and the results were beyond our expectations. Great communication and top-notch development skills!", rating: 5 },
  { id: 2, name: "Sophia Bennett", role: "Founder, ShopKart", review: "The team delivered our e-commerce store on time with amazing UI/UX. Our sales increased by 40% after the launch!", rating: 5 },
  { id: 3, name: "Liam Anderson", role: "CTO, FinDash", review: "Highly professional and skilled developers. They understood our requirements perfectly and delivered a great product.", rating: 5 },
  { id: 4, name: "Marcus Thorne", role: "Product Lead, Vora", review: "Their attention to detail in the animation and performance optimization is industry-leading. A true game changer.", rating: 4 },
  { id: 5, name: "Elena Vance", role: "Design Director, Flux", review: "Working with them was a breeze. They took our complex brand guidelines and created a beautiful, functional masterpiece.", rating: 5 },
  { id: 6, name: "David Choi", role: "Founder, Zenith", review: "The most reliable agency we've ever partnered with. They deliver high-quality code that is scalable and easy to maintain.", rating: 5 },
  { id: 7, name: "Sarah Jenkins", role: "COO, CloudScale", review: "Incredible workflow. They integrated seamlessly with our internal team and pushed our product to the next level.", rating: 5 },
  { id: 8, name: "Robert Fox", role: "CEO, Nexa", review: "The UI/UX is breathtaking. Our users have consistently praised the new interface since the day we launched.", rating: 4 },
  { id: 9, name: "Amara Okafor", role: "Founder, Bloom", review: "They turned our vision into a reality faster than we thought possible. Professionalism at its finest.", rating: 5 },
  { id: 10, name: "Lucas Meyer", role: "CTO, DataSync", review: "Superior technical knowledge. They handled our complex data migrations without a single second of downtime.", rating: 5 },
];

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  // Update dots based on scroll position
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Calculate progress (0 to 1)
    const scrollPercent = scrollLeft / (scrollWidth - clientWidth);
    
    // Map progress to 3 dots
    if (scrollPercent < 0.33) setActiveDot(0);
    else if (scrollPercent < 0.66) setActiveDot(1);
    else setActiveDot(2);
  };

  // Scroll to section when dot is clicked
  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    const target = (scrollWidth - clientWidth) * (index / 2);
    scrollRef.current.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section className="relative w-full py-24 bg-[#050816] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-500/80">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 text-base">
            Our clients love working with us. See what they have to say.
          </p>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex-shrink-0 w-[85vw] md:w-[calc(33.333%-16px)] snap-center bg-[#0A0D1A] border border-white/5 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-500 group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-gray-400 text-[15px] leading-relaxed mb-10 min-h-[100px]">
                "{t.review}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-gray-800">
                  <img 
                    src={t.image || `https://i.pravatar.cc/150?u=${t.id}`} 
                    alt={t.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-wide">{t.name}</h4>
                  <p className="text-gray-500 text-[12px]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots (Fixed at 3) */}
        <div className="flex justify-center gap-3 mt-4">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`transition-all duration-500 rounded-full ${
                activeDot === i 
                ? "w-3 h-3 bg-purple-600 shadow-[0_0_12px_rgba(147,51,234,1)]" 
                : "w-2 h-2 bg-gray-700 hover:bg-gray-500"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[120px] pointer-events-none" />
    </section>
  );
}