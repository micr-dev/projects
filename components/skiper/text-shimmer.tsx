"use client";

import { motion } from "framer-motion";
import React, { useMemo } from "react";

type TextShimmerProps = {
  children: string;
  className?: string;
  duration?: number;
  repeatDelay?: number;
  spread?: number;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function TextShimmer({
  children,
  className,
  duration = 2,
  repeatDelay = 0,
  spread = 2,
}: TextShimmerProps) {
  const dynamicSpread = useMemo(() => children.length * spread, [children, spread]);

  return (
    <motion.span
      className={joinClasses(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent",
        "[background-repeat:no-repeat,padding-box]",
        "[--base-color:#a1a1aa] [--base-gradient-color:#000]",
        "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]",
        "dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]",
        "dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]",
        className,
      )}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{
        repeat: Infinity,
        repeatDelay,
        duration,
        ease: "linear",
      }}
      style={
        {
          "--spread": `${dynamicSpread}px`,
          backgroundImage:
            "var(--bg), linear-gradient(var(--base-color), var(--base-color))",
        } as React.CSSProperties
      }
    >
      {children}
    </motion.span>
  );
}
