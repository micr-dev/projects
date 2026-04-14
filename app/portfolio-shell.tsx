"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Skiper10 from "../components/skiper/skiper10";
import Skiper80 from "../components/skiper/skiper80";
import type { RepoSection } from "./repo-sections";

const SPANISH_REDIRECT_DISMISSED_KEY = "micr-projects-spanish-redirect-dismissed";
const SPANISH_PROMPT_DELAY_MS = 950;
const dialogSpring = { type: "spring" as const, stiffness: 150, damping: 25 };
const buttonSpring = { type: "spring" as const, stiffness: 260, damping: 18 };

interface PortfolioShellProps {
  initialSlug?: string | null;
  preloaderText?: string;
  sections: RepoSection[];
}

const PortfolioShell = ({
  initialSlug = null,
  preloaderText = "Turning concepts into working systems.",
  sections,
}: PortfolioShellProps) => {
  const [showSpanishPrompt, setShowSpanishPrompt] = useState(false);
  const spanishPromptTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (spanishPromptTimerRef.current != null) {
        window.clearTimeout(spanishPromptTimerRef.current);
      }
    };
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.location.hostname === "proyectos.micr.dev") {
      return;
    }

    if (window.localStorage.getItem(SPANISH_REDIRECT_DISMISSED_KEY) === "1") {
      return;
    }

    const browserLanguages = [
      window.navigator.language,
      ...(window.navigator.languages ?? []),
    ]
      .filter(Boolean)
      .map((language) => language.toLowerCase());

    const isSpanishBrowser = browserLanguages.some((language) =>
      language.startsWith("es"),
    );

    if (!isSpanishBrowser) {
      return;
    }

    spanishPromptTimerRef.current = window.setTimeout(() => {
      setShowSpanishPrompt(true);
      spanishPromptTimerRef.current = null;
    }, SPANISH_PROMPT_DELAY_MS);
  }, []);

  const handleStayHere = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SPANISH_REDIRECT_DISMISSED_KEY, "1");
    }

    setShowSpanishPrompt(false);
  }, []);

  const handleGoSpanish = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const nextUrl = new URL(window.location.href);
    nextUrl.hostname = "proyectos.micr.dev";
    nextUrl.protocol = "https:";
    window.location.assign(nextUrl.toString());
  }, []);

  return (
    <Skiper10 text={preloaderText} onComplete={handlePreloaderComplete}>
      <>
        <Skiper80 sections={sections} initialSlug={initialSlug} />
        <AnimatePresence>
          {showSpanishPrompt ? (
            <motion.div
              className="pointer-events-none fixed inset-0 z-[110] flex items-end justify-center px-4 pb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.985 }}
                transition={dialogSpring}
                className="pointer-events-auto w-full max-w-sm rounded-[22px] border border-white/10 bg-[#121212]/96 px-4 py-4 text-white shadow-[0_20px_80px_rgba(0,0,0,0.34)] backdrop-blur-md"
              >
                <p className="font-cal-sans text-[15px] font-medium tracking-[0.03em]">
                  Tu navegador parece estar en español.
                </p>
                <p className="mt-2 text-sm leading-[1.3] text-white/55">
                  ¿Quieres ir a la versión en español?
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <motion.button
                    type="button"
                    onClick={handleGoSpanish}
                    whileHover={{ scale: 1.045, y: -1 }}
                    whileTap={{ scale: 0.965 }}
                    transition={buttonSpring}
                    className="relative overflow-hidden rounded-xl bg-white px-3 py-2 text-sm text-black"
                  >
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/4"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                    />
                    <span className="relative">Sí</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleStayHere}
                    whileHover={{ scale: 1.035, y: -1, backgroundColor: "rgba(255,255,255,0.08)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={buttonSpring}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/72"
                  >
                    No
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </>
    </Skiper10>
  );
};

export default PortfolioShell;
