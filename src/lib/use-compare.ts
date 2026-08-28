"use client";

import * as React from "react";

const STORAGE_KEY = "umrahpackages:compare";
const MAX_COMPARE = 4;
const EVENT = "umrahpackages:compare-changed";

// useSyncExternalStore requires getSnapshot to return a stable (===) value
// when nothing has changed, or it re-renders in an infinite loop. Parsing
// localStorage fresh on every call would always return a new array
// reference, so we cache the parsed result and only re-parse when the raw
// string actually changes.
let cachedRaw: string | null = null;
let cachedSlugs: string[] = [];

function readStore(): string[] {
  if (typeof window === "undefined") return cachedSlugs;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }
  if (raw === cachedRaw) return cachedSlugs;
  cachedRaw = raw;
  try {
    cachedSlugs = raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    cachedSlugs = [];
  }
  return cachedSlugs;
}

function writeStore(slugs: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    window.dispatchEvent(new CustomEvent(EVENT));
  } catch {
    // localStorage unavailable (private browsing, etc.) — compare tray just
    // won't persist across reloads, not a hard failure.
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const emptySnapshot: string[] = [];
function getServerSnapshot() {
  return emptySnapshot;
}

/**
 * Client-side "compare tray" — lets a visitor tick packages on any listing
 * page and jump to /compare?ids=... Persisted to localStorage per browser
 * (not synced anywhere), capped at MAX_COMPARE. Uses useSyncExternalStore
 * since localStorage is exactly the kind of external store it's for —
 * avoids the read-in-an-effect-then-setState dance (and the extra render
 * it causes).
 */
export function useCompare() {
  const slugs = React.useSyncExternalStore(subscribe, readStore, getServerSnapshot);

  const toggle = React.useCallback((slug: string) => {
    const current = readStore();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : current.length < MAX_COMPARE
        ? [...current, slug]
        : current;
    writeStore(next);
  }, []);

  const clear = React.useCallback(() => {
    writeStore([]);
  }, []);

  const isSelected = React.useCallback((slug: string) => slugs.includes(slug), [slugs]);

  return { slugs, toggle, clear, isSelected, max: MAX_COMPARE };
}
