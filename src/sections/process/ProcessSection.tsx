import React from "react";

const steps = [
  {
    id: "01",
    title: "Discover",
    description: "We dive deep into your business, goals and audience.",
  },
  {
    id: "02",
    title: "Strategize",
    description: "We create a strategy and roadmap tailored to your needs.",
  },
  {
    id: "03",
    title: "Design & Build",
    description: "We design and build powerful digital solutions that perform.",
  },
  {
    id: "04",
    title: "Launch & Grow",
    description: "We launch, optimize and help you grow continuously.",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-20 text-[#05070D]">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
        {/* Left Heading */}
        <div>
          <p className="mb-8 text-[10px] font-black uppercase tracking-[0.18em] text-[#6B7280]">
            How We Work
          </p>

          <h2 className="max-w-md text-[36px] font-medium uppercase leading-[0.98] tracking-[-0.05em] text-[#05070D] sm:text-[44px] lg:text-[52px]">
            A Clear Process. <br />
            Proven Results.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative pr-8 ${
                index !== steps.length - 1
                  ? "lg:border-r lg:border-[#05070D]/10"
                  : ""
              }`}
            >
              <span className="mb-8 block text-[16px] font-black tracking-[-0.04em] text-[#05070D]">
                {step.id}
              </span>

              <h3 className="mb-5 text-[14px] font-black uppercase tracking-[-0.02em] text-[#05070D]">
                {step.title}
              </h3>

              <p className="max-w-[180px] text-[14px] font-medium leading-7 text-[#4B5563]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}