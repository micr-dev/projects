"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import PortfolioShell from "../portfolio-shell";
import type { RepoSection } from "../repo-sections";
import { getRepoDisplayTitle } from "../repo-paths";

const DRAFT_KEY = "micr-archive-draft";
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(DRAFT_KEY, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(DRAFT_KEY, onChange);
  };
}
function readDraft() { return window.localStorage.getItem(DRAFT_KEY); }
function serverDraft() { return null; }

export default function ArchiveReview({ sections, view, spanish }: {
  sections: RepoSection[];
  view: "checklist" | "preview" | "example";
  spanish: boolean;
}) {
  const draft = useSyncExternalStore(subscribe, readDraft, serverDraft);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const selected = useMemo<Set<string>>(() => {
    if (view === "example") return new Set(["Microck/altman"]);
    return new Set(draft ? JSON.parse(draft) : sections.flatMap((section) =>
      section.items.filter((item) => item.metadata.archived).map((item) => item.metadata.repo)));
  }, [draft, sections, view]);
  const previewSections = useMemo(() => sections.map((section) => ({
    ...section,
    items: section.items.map((item) => ({ ...item,
      metadata: { ...item.metadata, archived: selected.has(item.metadata.repo) },
    })),
  })), [sections, selected]);
  const text = (english: string, es: string) => spanish ? es : english;
  function save(next: Set<string>) {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify([...next]));
      window.dispatchEvent(new Event(DRAFT_KEY));
      setMessage("");
    } catch {
      setMessage(text("Enable browser storage to save your draft.", "Activa el almacenamiento del navegador para guardar el borrador."));
    }
  }
  function download() {
    const blob = new Blob([JSON.stringify({ archived: [...selected].sort() }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "archive-selection.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }
  if (view !== "checklist") return (
    <>
      <nav className="sticky top-0 z-[120] flex min-h-12 flex-wrap items-center gap-5 bg-black px-4 py-3 text-sm text-white">
        <Link href="/archive-review" className="underline">{text("Back to checklist", "Volver a la lista")}</Link>
        <span>{view === "example" ? text("Example: Altman is archived", "Ejemplo: Altman archivado") : text(`${selected.size} selected`, `${selected.size} seleccionados`)}</span>
        <button type="button" className="underline" onClick={() =>
          document.querySelector<HTMLButtonElement>('button[aria-controls="archived-projects"]')?.scrollIntoView({ block: "center", behavior: "instant" })
        }>{text("Jump to archive", "Ir al archivo")}</button>
      </nav>
      <PortfolioShell sections={previewSections} initialSlug={null} />
    </>
  );
  return (
    <main className="min-h-screen bg-black px-5 py-8 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">{text("Choose projects to archive", "Elige los proyectos que archivar")}</h1>
        <p className="mt-2 text-sm text-white/60">{text("Tick to archive. Your draft stays in this browser. Nothing is published.", "Marca para archivar. El borrador se guarda en este navegador. No se publica nada.")}</p>
        <div className="sticky top-0 z-10 mt-6 flex flex-wrap items-center gap-4 border-b border-white/20 bg-black py-4 text-sm">
          <strong>{selected.size} {text("selected", "seleccionados")}</strong>
          <Link className="underline" href="/archive-review/preview">{text("Preview selections", "Ver selección")}</Link>
          <Link className="underline" href="/archive-review/example">{text("See archive example", "Ver ejemplo del archivo")}</Link>
          <button type="button" className="underline" onClick={download}>{text("Download choices", "Descargar selección")}</button>
        </div>
        <label className="mt-5 block text-sm">
          {text("Find a project", "Buscar proyecto")}
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} className="mt-2 block min-h-11 w-full border border-white/30 bg-black px-3 text-white" />
        </label>
        {message ? <p role="alert" className="mt-3 text-sm">{message}</p> : null}
        {sections.map((section) => {
          const matches = section.items.filter((item) => getRepoDisplayTitle(item.title).toLowerCase().includes(query.toLowerCase()));
          if (!matches.length) return null;
          return (
            <fieldset key={section.heading} className="mt-7">
              <legend className="text-sm font-semibold text-white/60">{section.heading}</legend>
              {matches.map((item) => (
                <label key={item.metadata.repo} className="flex min-h-11 cursor-pointer items-center gap-3 border-b border-white/10 py-2">
                  <input type="checkbox" checked={selected.has(item.metadata.repo)} className="size-5 shrink-0 accent-white" onChange={(event) => {
                    const next = new Set(selected);
                    if (event.target.checked) next.add(item.metadata.repo);
                    else next.delete(item.metadata.repo);
                    save(next);
                  }} />
                  <span className="break-all">{getRepoDisplayTitle(item.title)}</span>
                </label>
              ))}
            </fieldset>
          );
        })}
      </div>
    </main>
  );
}
