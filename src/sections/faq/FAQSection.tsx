"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How long does a project take?",
    answer:
      "Typically, a custom project takes between 4 to 8 weeks. This timeline includes strategy, design, development, and rigorous testing to ensure a premium futuristic experience.",
  },
  {
    question: "Do you create responsive websites?",
    answer:
      "Absolutely. Every project we build is mobile-first and fully responsive, ensuring your brand looks stunning on everything from high-end 5K monitors to mobile devices.",
  },
  {
    question: "Do you provide SEO optimization?",
    answer:
      "Yes, we integrate technical SEO into the core architecture of our sites. This includes semantic HTML, lightning-fast load times, and meta-data optimization to ensure high search visibility.",
  },
  {
    question: "Can you redesign existing websites?",
    answer:
      "We specialize in digital transformations. We can take your existing platform and overhaul it with modern technologies like Next.js 15, high-end animations, and a futuristic UI.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Our core stack includes Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. For backend and databases, we typically leverage Prisma, PostgreSQL, and AWS for maximum scalability.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "We offer dedicated maintenance and support packages to ensure your platform stays updated with the latest security patches and performance optimizations post-launch.",
  },
];

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const AccordionItem = ({
  question,
  answer,
  isOpen,
  onClick,
  index,
}: AccordionItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={`relative mb-4 overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-purple-500/50 bg-white/[0.06] shadow-[0_0_20px_rgba(147,51,234,0.1)]"
          : "border-white/10 bg-white/[0.03] hover:border-white/20"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
      >
        <span
          className={`text-lg font-medium transition-colors duration-300 ${
            isOpen ? "text-white" : "text-gray-300 hover:text-white"
          }`}
        >
          {question}
        </span>

        <motion.div
          animate={{
            rotate: isOpen ? 45 : 0,
            color: isOpen ? "#a855f7" : "#9ca3af",
          }}
          className="ml-4 flex-shrink-0"
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="border-t border-white/5 px-6 pb-6 pt-4 leading-relaxed text-gray-400">
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
    <section className="relative w-full overflow-hidden bg-[#050816] py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-500"
          >
            FAQ
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="mb-6 mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="text-lg text-gray-500"
          >
            Everything you need to know about our process and technology.
          </motion.p>
        </div>

        <div className="relative">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mt-12 text-center text-sm text-gray-600"
        >
          Still have questions?{" "}
          <Link
            href="/contact"
            className="cursor-pointer text-purple-400 hover:underline"
          >
            Contact our team
          </Link>
        </motion.p>
      </div>
    </section>
  );
}