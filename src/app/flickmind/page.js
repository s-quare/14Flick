"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MediaLink from "@/components/MediaLink";
import SmartImage from "@/components/SmartImage";

const PLACEHOLDERS = [
  "A thriller set in space with a female lead...",
  "Movies like Interstellar but more emotional...",
  "Something cozy for a rainy Sunday afternoon...",
  "A mind-bending mystery with a plot twist...",
  "Epic historical dramas set in ancient Japan...",
  "Gritty crime thrillers based on true stories...",
  "Animated films with deep philosophical themes...",
  "A heist movie where they actually get away with it...",
  "Coming-of-age stories set in the 80s...",
  "A movie that feels like a fever dream...",
  "Cyberpunk worlds with stunning visuals...",
  "Psychological horrors with no jump scares...",
  "Romantic comedies that aren't too cheesy...",
  "Something to watch when I want to cry my eyes out...",
  "Fast-paced action movies with a synthwave soundtrack...",
  "A documentary about a secret subculture...",
  "Whodunit mysteries in an isolated location...",
  "Dystopian futures where nature has taken back over...",
  "Mockumentaries with dry, awkward humor...",
  "A film that explores the meaning of time...",
];

export default function FlickMindPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  const resultRef = useRef(null);

  // 1. Shuffle placeholders only once on page load
  const shuffledPlaceholders = useMemo(() => {
    return [...PLACEHOLDERS].sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % shuffledPlaceholders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [shuffledPlaceholders]);

  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [result]);

  const askFlickMind = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/flickmind", {
        method: "POST",
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setResult(data);
      setInput("");

      fetch("https://formspree.io/f/xqezoazw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: input,
          suggestion: data.title || data.name || "No name found",
          type: media_type,
          year: data?.release_date || data?.first_air_date || 'Date not found',
          aiReason: data.aiReason
        }),
      }).catch(() => null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 sm:px-10 py-20 flex flex-col items-center overflow-x-hidden">
      <div className="max-w-2xl w-full text-center">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4 flex w-fit mx-auto gap-2 items-center">
            <div className="bg-yellow-300/50 p-0.5 rounded-full  animate-[ping_3000ms_cubic-bezier(0.4,0,0.6,1)_infinite]">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse"></div>
            </div>

            <h1 className="text-lg md:text-2xl font-black font-serif text-yellow-300 uppercase tracking-wider italic">
              FlickMind
            </h1>
          </div>

          <p className="text-neutral-400 mb-10 text-sm max-w-md mx-auto leading-relaxed">
            Describe your mood or scenario. <br />
            <span className="text-neutral-600 font-mono text-[12px] uppercase tracking-[0.2em]">
              FLICKMIND AI
            </span>
          </p>
        </motion.header>

        {/* Improved Input Group: Side-by-Side Grid */}
        <motion.form
          onSubmit={askFlickMind}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid mb-16 transition-colors"
        >
          <div className="relative w-full bg-white/10 rounded-xl overflow-hidden border border-neutral-800 focus-within:border-neutral-700 transition-colors">
            <textarea
              aria-label="Ask FlickMind"
              rows="4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder=""
              className="w-full bg-transparent p-4 outline-none font-light text-base resize-none min-h-15 max-h-37.5 leading-relaxed block"
            />

            {/* Animated Placeholder Layer */}
            {!input && (
              <div className="absolute left-0 top-0 p-4 w-full h-full pointer-events-none pr-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={placeholderIdx}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-neutral-600 text-left font-light text-base italic truncate"
                  >
                    {shuffledPlaceholders[placeholderIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || input.trim() === ""}
            className="bg-yellow-400 text-black font-bold py-2 w-fit mx-auto my-8 px-10 rounded-full active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center min-w-20"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <span className="text-xs xs:text-sm tracking-wider">Find</span>
            )}
          </button>
        </motion.form>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-neutral-500 font-mono text-[10px] uppercase mb-10 tracking-widest"
          >
            {error}
          </motion.p>
        )}

        {/* Result Area */}
        <div ref={resultRef} className="min-h-50 scroll-mt-25">
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col items-center mx-auto "
              >
                <div className="py-10 px-3">
                  <div className="mb-8 text-left">
                    <span className="text-yellow-300 text-[10px] font-bold uppercase mb-3 block">
                      Flick MATCH
                    </span>
                    <p className="text-white font-light text-sm leading-relaxed">
                      {result.aiReason}
                    </p>
                  </div>

                  <MediaLink item={result} className="group">
                    <div className="relative aspect-2/3 rounded-3xl overflow-hidden border-2 border-gray-700 max-w-75 mx-auto">
                      <SmartImage
                        path={result.poster_path}
                        type="poster"
                        alt={result.title || result.name}
                        overlay="bg-transparent"
                      />
                    </div>
                    <div className="mt-6 text-center">
                      <h2 className="text-2xl font-black tracking-tight text-white group-hover:text-yellow-300 transition-colors uppercase italic">
                        {result.title || result.name}
                      </h2>
                      <p className="text-neutral-500 font-mono text-[10px] mt-2 tracking-widest uppercase">
                        {result.media_type} •{" "}
                        {result.release_date?.split("-")[0] ||
                          result.first_air_date?.split("-")[0]}
                      </p>
                    </div>
                  </MediaLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
