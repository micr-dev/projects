"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface Skiper10Props {
  children: React.ReactNode;
  onComplete?: () => void;
  preloadTiers?: readonly (readonly string[])[];
  text?: string;
}

interface Preloader004Props {
  text: string;
}

const SMALL_IMAGE_PRELOAD_CONCURRENCY = 16;
const LARGE_IMAGE_PRELOAD_CONCURRENCY = 1;
const LOADER_DURATION_MS = 1600;
const EMPTY_PRELOAD_TIERS: readonly (readonly string[])[] = [];

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
    image.decoding = "async";
    image.fetchPriority = "low";
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

async function preloadTier(
  urls: readonly string[],
  isCancelled: () => boolean,
  concurrency: number,
) {
  let nextIndex = 0;

  const worker = async () => {
    while (!isCancelled()) {
      const index = nextIndex;
      nextIndex += 1;

      if (index >= urls.length) {
        return;
      }

      await preloadImage(urls[index]);
    }
  };

  await Promise.all(
    Array.from(
      { length: Math.min(concurrency, urls.length) },
      worker,
    ),
  );
}

const Skiper10 = ({
  children,
  onComplete,
  preloadTiers = EMPTY_PRELOAD_TIERS,
  text = "Turning concepts into working systems.",
}: Skiper10Props) => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [canRenderChildren, setCanRenderChildren] = useState(
    preloadTiers.length === 0,
  );

  useEffect(() => {
    let cancelled = false;
    // The loader is visible before hydration, so count from navigation start
    // instead of adding 1600ms after this effect eventually runs.
    const remainingLoaderTime = Math.max(
      0,
      LOADER_DURATION_MS - window.performance.now(),
    );
    const loaderTimer = window.setTimeout(() => {
      setCanRenderChildren(true);
      setShowPreloader(false);
    }, remainingLoaderTime);

    const preloadAllTiers = async () => {
      for (const [tierIndex, tier] of preloadTiers.entries()) {
        await preloadTier(
          tier,
          () => cancelled,
          tierIndex === 0
            ? SMALL_IMAGE_PRELOAD_CONCURRENCY
            : LARGE_IMAGE_PRELOAD_CONCURRENCY,
        );

        if (cancelled) {
          return;
        }

        if (tierIndex === 0) {
          setCanRenderChildren(true);
        }
      }
    };

    // Keep warming the remaining tiers after the fixed loader window closes.
    void preloadAllTiers();

    return () => {
      cancelled = true;
      window.clearTimeout(loaderTimer);
    };
  }, [preloadTiers]);

  useEffect(() => {
    if (showPreloader) {
      return;
    }

    onComplete?.();
  }, [onComplete, showPreloader]);

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
      {showPreloader ? <Preloader004 text={text} /> : null}
      {canRenderChildren ? children : null}
    </main>
  );
};

const Preloader004 = ({ text }: Preloader004Props) => {
  const words = text.trim().split(/\s+/);

  return (
    <motion.div className="fixed inset-0 z-[100]">
      <div className="absolute z-10 flex h-full w-full items-center justify-center px-6 text-center text-white">
        <motion.h1
          className="font-cal-sans text-3xl font-medium tracking-normal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.75 } }}
        >
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.08 * index }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      <div className="pointer-events-none fixed left-0 top-0 z-[2] flex h-[50vh]">
        {[...Array(10)].map((_, index) => (
          <div
            key={`top-${index}`}
            className="h-full w-[10vw] bg-black"
          />
        ))}
      </div>

      <div className="pointer-events-none fixed bottom-0 left-0 z-[2] flex h-[50vh] items-end">
        {[...Array(10)].map((_, index) => (
          <div
            key={`bottom-${index}`}
            className="h-full w-[10vw] bg-black"
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Skiper10;
