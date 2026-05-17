import React from 'react';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    id: "01",
    title: "Discovery",
    description: "We understand your needs and goals for the project through deep research.",
    icon: <Search className="w-6 h-6 text-purple-400" />,
  },
  {
    id: "02",
    title: "Design",
    description: "We design modern UI/UX experiences that perfectly align with your brand identity.",
    icon: <PenTool className="w-6 h-6 text-purple-400" />,
  },
  {
    id: "03",
    title: "Development",
    description: "We build scalable, high-performance applications using cutting-edge tech stacks.",
    icon: <Code2 className="w-6 h-6 text-purple-400" />,
  },
  {
    id: "04",
    title: "Launch",
    description: "We rigorously test, optimize, and launch your project for a flawless debut.",
    icon: <Rocket className="w-6 h-6 text-purple-400" />,
  },
];

export default function ProcessSection() {
  return (
    <section className="relative w-full py-24 bg-[#050816] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-purple-500">
            OUR PROCESS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">
            Our Development Process
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
            A systematic approach to transforming complex ideas into 
            seamless digital realities with precision and creative flair.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent -translate-y-1/2 z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className="group relative flex flex-col items-center lg:items-start transition-all duration-500 hover:-translate-y-2"
              >
                {/* Step Card */}
                <div className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group-hover:border-purple-500/50 transition-colors duration-500">
                  
                  {/* Subtle Card Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

                  {/* Icon & Number Header */}
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-500">
                      {step.icon}
                    </div>
                    <span className="text-4xl font-black text-white/5 group-hover:text-purple-500/10 transition-colors duration-500">
                      {step.id}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-purple-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {step.description}
                    </p>
                  </div>

                  {/* Animated Border Line (Bottom) */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-purple-500 group-hover:w-full transition-all duration-700" />
                </div>

                {/* Desktop Connector Dot */}
                <div className="hidden lg:flex absolute top-1/2 -right-4 w-8 h-8 items-center justify-center -translate-y-1/2 translate-x-full z-20">
                    {index !== steps.length - 1 && (
                        <div className="w-2 h-2 rounded-full bg-purple-500/20 group-hover:bg-purple-500 group-hover:scale-150 transition-all duration-500" />
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}