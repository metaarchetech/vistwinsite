"use client";

/**
 * ChatDock — fixed bottom-right floating chat surface.
 *
 * Replaces the previous FontSwitcher dev tool. Currently a placeholder UI for
 * a future AI assistant — the input doesn't post anywhere yet, but the surface
 * is already real (frosted glass pill, expand-to-panel on focus, live dot).
 *
 * Visual language: matches the Header pill — same backdrop-blur-sm, same
 * rounded-2xl, same detached-from-edge gap, same border + shadow stack.
 *
 * Future hookup: wire `onSubmit` to a streaming /api/chat endpoint, render
 * messages in the expanded panel.
 */
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export function ChatDock() {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const t = useTranslations("ChatDock");

  // Esc closes the expanded panel
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    // Placeholder: no backend yet. Just clear + visually acknowledge.
    setDraft("");
    // eslint-disable-next-line no-console
    console.log("[ChatDock] submit (no-op):", draft);
  };

  return (
    <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-50 pointer-events-none">
      <div
        className={`pointer-events-auto rounded-2xl border border-zinc-200/50 bg-white/35 backdrop-blur-sm backdrop-saturate-150 shadow-lg shadow-zinc-900/5 transition-all duration-300 ${
          expanded ? "w-[360px] sm:w-[420px]" : "w-[280px] sm:w-[320px]"
        }`}
      >
        {/* Expanded panel — message stream placeholder */}
        {expanded && (
          <div className="px-4 pt-4 pb-3 max-h-[280px] overflow-y-auto border-b border-zinc-200/60">
            <p className="hud-sm text-zinc-400 mb-3 normal-case tracking-normal">
              {t("label")}
            </p>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {t("body")}
            </p>
          </div>
        )}

        {/* Input row — always visible */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2.5 px-4 py-2.5"
        >
          <span
            className="live-dot shrink-0"
            aria-label="online"
            title="online"
          />
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onFocus={() => setExpanded(true)}
            placeholder={t("placeholder")}
            className="flex-1 bg-transparent outline-none text-sm text-zinc-900 placeholder:text-zinc-400"
            aria-label="Chat input"
          />
          {expanded ? (
            <button
              type="button"
              onClick={() => {
                setExpanded(false);
                inputRef.current?.blur();
              }}
              className="text-zinc-400 hover:text-zinc-700 text-xs leading-none px-1"
              aria-label="Close"
            >
              ✕
            </button>
          ) : (
            <span className="hud-sm text-zinc-400 normal-case tracking-normal hidden sm:inline shrink-0">
              AI · soon
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
