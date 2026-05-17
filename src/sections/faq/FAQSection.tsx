"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: "How long does a project take?",
    answer: "Typically, a custom project takes between 4 to 8 weeks. This timeline includes strategy, design, development, and rigorous testing to ensure a premium futuristic experience."
  },
  {
    question: "Do you create responsive websites?",
    answer: "Absolutely. Every project we build is 'Mobile-First' and fully responsive, ensuring your brand looks stunning on everything from high-end 5K monitors to mobile devices."
  },
  {
    question: "Do you provide SEO optimization?",
    answer: "Yes, we integrate technical SEO into the core architecture of our sites. This includes semantic HTML, lightning-fast load times, and meta-data optimization to ensure high search visibility."
  },
  {
    question: "Can you redesign existing websites?",
    answer: "We specialize in digital transformations. We can take your existing platform and overhaul it with modern technologies like Next.js 15, high-end animations, and a futuristic UI."
  },
  {
    question: "What technologies do you use?",
    answer: "Our core stack includes Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. For backend and databases, we typically leverage Prisma, PostgreSQL, and AWS for maximum scalability."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "We offer dedicated maintenance and support packages to ensure your platform stays updated with the latest security patches and performance optimizations post-launch."
  }
];

const AccordionItem = ({ question, answer, isOpen, onClick, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative mb-4 overflow-hidden rounded-2xl border transition-all duration-500 ${
        isOpen 
        ? "bg-white/[0.06] border-purple-500/50 shadow-[0_0_20px_rgba(147,51,234,0.1)]" 
        : "bg-white/[0.03] border-white/10 hover:border-white/20"
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-300 hover:text-white"}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? "#a855f7" : "#9ca3af" }}
          className="flex-shrink-0 ml-4"
        >
          <Plus size={24} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full py-24 bg-[#050816] overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-500"
          >
            FAQ
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg"
          >
            Everything you need to know about our process and technology.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="relative">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Bottom CTA or Label (Optional) */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-gray-600 text-sm"
        >
          Still have questions? <span className="text-purple-400 cursor-pointer hover:underline">Contact our team</span>
        </motion.p>
      </div>
    </section>
  );
}