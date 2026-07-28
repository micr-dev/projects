"use client";

import { useEffect } from "react";

export default function SfxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cuelume = await import("cuelume");
      if (cancelled) return;
      cuelume.bind();
    })().catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return <>{children}</>;
}
