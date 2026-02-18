"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FlickMindCTA() {
  return (
    <section className="px-4 py-16 w-full max-w-200 mx-auto">
      <div className="group block relative">

        {/* Animated Glow Background */}
        <div className="absolute -inset-1 bg-linear-to-r from-yellow-500/20 via-yellow-300/40 to-yellow-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-1000 animate-pulse-slow"></div>

        <div className="relative overflow-hidden bg-neutral-900 border-2 border-neutral-800 rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500">
          
          <div className="text-center md:text-left z-10">
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{delay: 0.3, duration: 0.6}}
              className="flex items-center justify-center md:justify-start gap-2 mb-4"
            >
              <span className="h-2 w-2 rounded-full bg-yellow-300 animate-pulse"></span>
              <span className="text-yellow-300 font-mono text-[8px] xs:text-[10px] uppercase tracking-wide">Get Your Next Watch Recommendation</span>
            </motion.div>
            
            <h2 className="text-xl xs:text-2xl font-black font-mono text-white pt-2 mb-8 uppercase italic leading-none tracking-tighter">
              TRY <span className="text-yellow-300 not-italic">FlickMind-AI</span>
            </h2>
            <p className="text-neutral-400 text-sm md:text-lg max-w-md font-light leading-relaxed">
               Use the AI feature get your next movie or show recommendation, super fast.
            </p>
          </div>

          <div className="relative z-10">
            <Link  href="/flickmind" className="bg-yellow-300 text-black font-bold px-8 py-2 rounded-2xl flex items-center gap-2 transition-transform duration-300 hover:scale-105 group-active:scale-95 text-sm">
              Try AI Scout
              <i className="bi bi-arrow-right text-lg"></i>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}