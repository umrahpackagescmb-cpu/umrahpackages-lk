"use client";

import * as React from "react";

/**
 * Small wrapper around the browser's built-in Web Speech API
 * (window.speechSynthesis) — genuinely free, no API key, no account, and
 * works entirely client-side. This is the "Audio Learning Mode" building
 * block: any tool page can import useTextToSpeech() and get a per-item
 * "Listen" toggle with almost no extra code.
 *
 * Deliberately does NOT attempt to read Arabic text aloud — most devices
 * don't have a reliable Arabic voice installed, and a browser trying to
 * pronounce Arabic with an English voice does more harm than good for
 * learning purposes. Callers should build their spoken text from the
 * English summary/translation content only.
 */
export function useTextToSpeech() {
  const [isSupported, setIsSupported] = React.useState(false);
  const [speakingId, setSpeakingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const detect = () => {
      setIsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    };
    detect();
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stop = React.useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
  }, []);

  const speak = React.useCallback((id: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    // Toggle off if this same item is already speaking.
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingId((cur) => (cur === id ? null : cur));
    utterance.onerror = () => setSpeakingId((cur) => (cur === id ? null : cur));
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  }, [speakingId]);

  return { isSupported, speakingId, speak, stop };
}
