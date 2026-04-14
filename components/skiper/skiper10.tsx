"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface Skiper10Props {
  children: React.ReactNode;
  durationMs?: number;
  text?: string;
}

interface Preloader004Props {
  text: string;
}

const Skiper10 = ({
  children,
  durationMs = 2500,
  text = "Turning concepts into working systems.",
}: Skiper10Props) => {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowPreloader(false);
    }, durationMs);

    return () => window.clearTimeout(timer);
  }, [durationMs]);

  useEffect(() => {
    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousDocumentOverflow = documentElement.style.overflow;

    if (showPreloader) {
      body.style.overflow = "hidden";
      documentElement.style.overflow = "hidden";
    }

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [showPreloader]);

  return (
    <main className="relative min-h-screen bg-[#121212]">
      <AnimatePresence mode="wait">
        {showPreloader ? <Preloader004 key="preloader" text={text} /> : null}
      </AnimatePresence>
      {children}
    </main>
  );
};

const Preloader004 = ({ text }: Preloader004Props) => {
  const words = text.trim().split(/\s+/);

  return (
    <motion.div className="fixed inset-0 z-[100]">
      <div className="absolute z-10 flex h-full w-full items-center justify-center px-6 text-center text-white">
        <motion.h1
          className="text-3xl font-semibold tracking-tighter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 4 } }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 * index }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      <motion.div className="pointer-events-none fixed left-0 top-0 z-[2] flex h-[50vh]">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={`top-${index}`}
            initial={{ height: "100%" }}
            animate={{ height: "100%" }}
            exit={{ height: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4 + 0.05 * index,
              ease: [0.455, 0.03, 0.515, 0.955],
            }}
            className="h-full w-[10vw] bg-black"
          />
        ))}
      </motion.div>

      <motion.div className="pointer-events-none fixed bottom-0 left-0 z-[2] flex h-[50vh] items-end">
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={`bottom-${index}`}
            initial={{ height: "100%" }}
            animate={{ height: "100%" }}
            exit={{ height: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.4 + 0.05 * index,
              ease: [0.455, 0.03, 0.515, 0.955],
            }}
            className="h-full w-[10vw] bg-black"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Skiper10;
